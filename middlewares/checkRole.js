const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('node-color-log');
const jwt_secret = process.env.JWT_SECRET;

const checkRole = async (eventOrigin, socket, data, allowedRoles) => {
  try {
    logger.info("Authorizing...")
    // Get the token from the Authorization header
    const token = JSON.parse(data).token;
    // Decode the token
    const decoded = jwt.verify(token, jwt_secret);
    // Find the user by the decoded userId
    const user = await User.findById(decoded.userId);
    // Check if the user exists and their role is in the list of allowed roles
    if (!user || !allowedRoles.includes(user.role)) {
      logger.error("Not authorized")
      socket.emit(eventOrigin, { status: 'error', error: 'mNot authorized' });
      return false; // Return false to indicate that the user is not authorized
    }
    // If the user's role is allowed, continue to the next middleware
    logger.info("Authorized")
    return true;  // Return true to indicate that the user is authorized
  } catch (error) {
    // Handle any errors that occur during the process
    socket.emit(eventOrigin, { status: 'error', error: error.message });
    logger.error(error)
    return false; // Return false to indicate that the user is not authorized
  }
};

exports.checkRole = checkRole;