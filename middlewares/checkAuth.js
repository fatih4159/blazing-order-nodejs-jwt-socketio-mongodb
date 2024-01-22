const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('node-color-log');
const jwt_secret = process.env.JWT_SECRET;

const verifyToken = async (eventOrigin, socket, data) => {
  try {
    const parsedData = JSON.parse(data);
    const token = parsedData.token;
    logger.info("Verifying token " + token)

    const decoded = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ username: decoded.username });

    if (!user) {
      throw new Error('Token not verified');
    }

    logger.info("Token verified")
  } catch (error) {
    logger.error(error)
    socket.emit(eventOrigin, { status: 'error', error: error.message });
  }
};

exports.verifyToken = verifyToken;