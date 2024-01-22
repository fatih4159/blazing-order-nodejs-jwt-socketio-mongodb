const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('node-color-log');
const jwt_secret = process.env.JWT_SECRET;
const { verifyToken } = require('../middlewares/checkAuth');

module.exports = (socket) => {
  socket.on('register', async (data) => {
    try {
      const parsedData = JSON.parse(data);
      const { username, password, email, firstname, lastname, phone } = parsedData;

      const existingUser = await User.findOne({ username, email, firstname, lastname, phone });
      if (existingUser) {
        logger.error("User with this data already exists");
        socket.emit('register', { status: 'error', error: 'User already exists' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email, firstname, lastname });
        await user.save();
        logger.info("User with username " + username + " has been registered")
        socket.emit('register', { status: 'ok' });
      }
    } catch (error) {
      logger.error("Error: " + error.message)
      socket.emit('register', { status: 'error', error: error.message });
    }
  });

  socket.on('login', async (data) => {
    try {
      const parsedData = JSON.parse(data);
      const { username, password } = parsedData;

      const user = await User.findOne({ username });
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, jwt_secret);
        logger.info("User with username " + username + " has logged in")
        socket.user = user;
        socket.token = token;
        socket.emit('login', { status: 'ok', token });
      } else {
        logger.error("Invalid credentials")
        socket.emit('login', { status: 'error', error: 'Invalid credentials' });
      }
    } catch (error) {
      logger.error("Error: " + error.message)
      socket.emit('login', { status: 'error', error: error.message });
    }
  });

  socket.on('verifyToken', async (data) => {
    try {
      await verifyToken(socket, data);
    } catch (error) {
      logger.error("Error: " + error.message)
      socket.emit('verifyToken', { status: 'error', error: error.message });
    }
  });
};