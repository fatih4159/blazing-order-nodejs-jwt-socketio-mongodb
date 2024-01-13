const User = require('../models/User'); // adjust the path according to your project structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('node-color-log');
const jwt_secret = process.env.JWT_SECRET;



module.exports = (socket) => {
  socket.on('register', async (data) => {
    const parsedData = JSON.parse(data);

    logger.info("Registering user with username " + parsedData.username + " and password " + parsedData.password)
    username = parsedData.username;
    password = parsedData.password;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    try {
      await user.save();
      logger.info("User with username " + username + " has been registered")
      socket.emit('register', { status: 'ok' });
    } catch (error) {
      logger.error("Error: " + error.message)
      socket.emit('register', { status: 'error', error: error.message });
    }
  });

  socket.on('login', async (data) => {
    const parsedData = JSON.parse(data);
    const { username, password } = parsedData;


    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username }, jwt_secret);
      logger.info("User with username " + username + " has logged in")
      socket.emit('login', { status: 'ok', token });
    } else {
      logger.error("Invalid credentials")
      socket.emit('login', { status: 'error', error: 'Invalid credentials' });
    }
  });

  socket.on('verifyToken', async (data) => {
    const { token } = data;
    try {
      const decoded = jwt.verify(token, 'secretKey');
      const user = await User.findOne({ username: decoded.username });
      if (user) {
        logger.info("Token verified for user with username " + decoded.username)
        socket.emit('verifyToken', { status: 'ok', user });
      } else {
        logger.error("User not found")
        socket.emit('verifyToken', { status: 'error', error: 'User not found' });
      }
    } catch (error) {
      logger.error("Invalid token")
      socket.emit('verifyToken', { status: 'error', error: 'Invalid token' });
    }
  });
};