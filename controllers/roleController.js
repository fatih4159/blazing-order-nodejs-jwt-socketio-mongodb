const Role = require('../models/Role');

module.exports = (socket) => {
  socket.on('putRole', async (data) => {
    const role = new Role(data);
    try {
      await role.save();
      socket.emit('createRole', { status: 'ok' });
    } catch (error) {
      socket.emit('createRole', { status: 'error', error: error.message });
    }
  });

  socket.on('getRoles', async (data) => {
    const roles = await Role.find();
    try {
      socket.emit('getRoles', { status: 'ok', data: roles });
    }
    catch (error) {
      socket.emit('getRoles', { status: 'error', error: error.message });
    }
  });
};