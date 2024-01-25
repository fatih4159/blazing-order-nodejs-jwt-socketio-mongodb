/**
 * This module exports a function that takes a socket object and sets up event listeners for 'addRole', 'getOwnRoles', and 'getRoles' events.
 * @module roleController
 * @param {object} socket - The socket object from the client.
 */

const Role = require('../models/Role');
const {verifyToken} = require("../middlewares/checkAuth");
const {checkRole} = require("../middlewares/checkRole");

module.exports = (socket) => {
  /**
   * Event listener for 'addRole' event. It handles role creation.
   * @listens socket:addRole
   * @param {string} data - The role data in JSON format.
   */
  socket.on('addRole', async (data) => {
    try {
      if(await verifyToken(putUser, socket, data) && await checkRole(putUser, socket, data, ['admin'])) {
        const role = new Role(data);
        await role.save();
        socket.emit('createRole', { status: 'ok' });
      }
    } catch (error) {
      socket.emit('createRole', { status: 'error', error: error.message });
    }
  });

  /**
   * Event listener for 'getOwnRoles' event. It retrieves the roles of the authenticated user.
   * @listens socket:getOwnRoles
   * @param {string} data - The user data in JSON format.
   */
  socket.on('getOwnRoles', async (data) => {
    try {
      if(await verifyToken(putUser, socket, data)) {
        const parsedData = JSON.parse(data);
        const token = parsedData.token;
        const decoded = jwt.verify(token, jwt_secret);
        const user = await User.find({ username: decoded.username });
        socket.emit('getOwnRoles', { status: 'ok', data: user.roles });
      }
    } catch (error) {
      socket.emit('getOwnRoles', { status: 'error', error: error.message });
    }
  });

  /**
   * Event listener for 'getRoles' event. It retrieves all roles if the authenticated user is an admin.
   * @listens socket:getRoles
   * @param {string} data - The user data in JSON format.
   */
  socket.on('getRoles', async (data) => {
    try {
      if(await verifyToken(putUser, socket, data) && await checkRole(putUser, socket, data, ['admin'])) {
        const roles = await Role.find();
        socket.emit('getRoles', { status: 'ok', data: roles });
      }
    } catch (error) {
      socket.emit('getRoles', { status: 'error', error: error.message });
    }
  });
};