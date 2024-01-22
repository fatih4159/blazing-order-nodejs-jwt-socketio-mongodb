const Role = require('../models/Role');
const {verifyToken} = require("../middlewares/checkAuth");
const {checkRole} = require("../middlewares/checkRole");

module.exports = (socket) => {
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