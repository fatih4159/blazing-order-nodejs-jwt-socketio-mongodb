const User = require('../models/User');

module.exports = (socket) => {
  socket.on('putUser', async (data) => {
    const user = new User(data);
    try {
      await user.save();
      socket.emit('createUser', { status: 'ok' });
    } catch (error) {
      socket.emit('createUser', { status: 'error', error: error.message });
    }
  });

  socket.on('getUsers', async (data) => {
    const users = await User.find();
    try {
      socket.emit('getUsers', { status: 'ok', data: users });
    }
    catch (error) {
      socket.emit('getUsers', { status: 'error', error: error.message });
    }
  });
};