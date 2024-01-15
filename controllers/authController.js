const User = require('../models/User'); // adjust the path according to your project structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('node-color-log');
const jwt_secret = process.env.JWT_SECRET;
const { verifyToken } = require('../middlewares/checkAuth');

module.exports = (socket) => {
  socket.on('register', async (data) => {
    const parsedData = JSON.parse(data);
    logger.info("Registering user with username " + parsedData.username + " and password " + parsedData.password)
    const { username, password, email, firstname, lastname, phone} = parsedData;

    // Check if user with username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      logger.error("User with username already exists");
      socket.emit('register', { status: 'error', error: 'Username already exists' });
      return;
    }

    // Check if user with email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      logger.error("User with email already exists");
      socket.emit('register', { status: 'error', error: 'EMail already exists' });
      return;
    }

    // Check if an identical first and last name combination in a User already exists
    const existingUser = await User.findOne({ firstname, lastname });
    if (existingUser) {
      logger.error("User with identical first and last name combination already exists");
      socket.emit('register', { status: 'error', error: 'name combination already exists' });
      return;
    }

    // check if user with phone already exists
    // Check if user with phone already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      logger.error("User with phone already exists");
      socket.emit('register', { status: 'error', error: 'phone already exists' });
      return;
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword, email, firstname, lastname });

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
      socket.user = user;
      socket.token = token;
      socket.emit('login', { status: 'ok', token });

    } else {
      logger.error("Invalid credentials")
      socket.emit('login', { status: 'error', error: 'Invalid credentials' });
    }
  });

  socket.on('verifyToken', async (data) => {
    await verifyToken(socket, data);
  });
};