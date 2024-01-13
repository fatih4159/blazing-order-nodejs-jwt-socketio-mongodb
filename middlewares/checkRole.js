const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Get the token from the Authorization header
      const token = req.headers.authorization.split(' ')[1];
      // Decode the token
      const decoded = jwt.verify(token, 'my_secret_key');
      // Find the user by the decoded userId
      const user = await User.findById(decoded.userId);
      // Check if the user's role is in the list of allowed roles
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({message: 'Forbidden'});
      }
      // If the user's role is allowed, continue to the next middleware
      next();
    } catch (error) {
      res.status(401).json({message: 'Unauthorized'});
    }
  };
};