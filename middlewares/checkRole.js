const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('node-color-log');
const Role = require('../models/Role');
const jwt_secret = process.env.JWT_SECRET;

const checkRole = async (eventOrigin, socket, data, allowedRoles) => {
  try {
    logger.debug("Authorizing...");

    // Get the token from the Authorization header
    const { token } = JSON.parse(data);

    // Decode the token
    const decoded = jwt.verify(token, jwt_secret);
    logger.debug("DecodedString:" + decoded.username);

    // Get the allowed role IDs
    const allowedRoleIDs = await getRoleIds(allowedRoles);
    logger.debug("AllowedRoles:" + allowedRoleIDs);

    // Find the user by the decoded username
    const user = await User.findOne({ username: decoded.username });

    // Get the user's role IDs
    const userRoleIds = user.roles.map(role => role._id);
    logger.debug("UserRoles:" + userRoleIds);

    // use for loop and compare each role id and return true if one of the roles is allowed
    for (const userRoleId of userRoleIds) {
      for (const allowedRoleId of allowedRoleIDs) {
        if (userRoleId.equals(allowedRoleId)) {
          logger.debug("Authorized access of user:" + user.username + " with roleId:" + userRoleId);
          return true;
        }
      }
    }

    // Return true to indicate that the user is authorized
    logger.error("Unauthorized access of user:" + user.username+ " with roles:" + userRoleIds.toString() );
    socket.emit(eventOrigin, { status: 'error', error: 'Not authorized!' });
    return false;

  } catch (error) {
    // Handle any errors that occur during the process
    socket.emit(eventOrigin, { status: 'error', error: error.message });
    logger.error(error);
    return false; // Return false to indicate that the user is not authorized
  }
};

async function getRoleIds(roles) {
  const roleIds = [];
  for (const role of roles) {
      logger.debug(role);
      const roleObject = await Role.findOne({ name: role }).then((role) => { return role });
      logger.debug(roleObject);
      roleIds.push(roleObject._id);
  }
  return roleIds;
}

exports.checkRole = checkRole;