/**
 * This module exports a function `checkRole` that checks if the user has the allowed roles.
 * @module checkRole
 * @requires jsonwebtoken
 * @requires User
 * @requires node-color-log
 * @requires Role
 * @requires process
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('node-color-log');
const Role = require('../models/Role');
const jwt_secret = process.env.JWT_SECRET;

/**
 * Checks if the user has the allowed roles.
 * @function checkRole
 * @param {string} eventOrigin - The origin event from the client.
 * @param {object} socket - The socket object from the client.
 * @param {string} data - The data from the client in JSON format.
 * @param {Array<string>} allowedRoles - The list of allowed roles.
 * @returns {Promise<void>} Nothing
 * @throws Will throw an error if the user does not have the allowed roles.
 */
const checkRole = async (eventOrigin, socket, data, allowedRoles) => {
  try {
    logger.debug("Authorizing...");

    const { token } = JSON.parse(data);
    const decoded = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ username: decoded.username });

    const allowedRoleIDs = await getRoleIds(allowedRoles);
    const userRoleIds = user.roles.map(role => role._id.toString());

    if (userRoleIds.some(roleId => allowedRoleIDs.includes(roleId))) {
      logger.debug(`Authorized access of user: ${user.username}`);
    } else {
      logger.error(`Unauthorized access of user: ${user.username}`);
      socket.emit(eventOrigin, { status: 'error', error: 'Not authorized!' });
    }

  } catch (error) {
    socket.emit(eventOrigin, { status: 'error', error: error.message });
    logger.error(error);
  }
};

/**
 * Retrieves the IDs of the roles.
 * @function getRoleIds
 * @param {Array<string>} roles - The list of roles.
 * @returns {Promise<Array<string>>} The list of role IDs.
 */
async function getRoleIds(roles) {
  const roleIds = [];
  for (const role of roles) {
    const roleObject = await Role.findOne({ name: role });
    roleIds.push(roleObject._id.toString());
  }
  return roleIds;
}

exports.checkRole = checkRole;