const User = require('../models/User');
const { verifyToken } = require('../middlewares/checkAuth');
const { checkRole } = require('../middlewares/checkRole');

module.exports = (socket) => {

  
  const putUser = 'putUser';
  socket.on('putUser', async (data) => {
    
    if(await verifyToken(putUser, socket, data) == false) return;
    if(await checkRole(putUser, socket, data, ['admin']) == false) return;

    const user = new User(data);
    try {
      await user.save();
      socket.emit('createUser', { status: 'ok' });
    } catch (error) {
      socket.emit('createUser', { status: 'error', error: error.message });
    }
  });

  const getUsers = 'getUsers';
  socket.on('getUsers', async (data) => {

    if(await verifyToken(getUsers, socket, data) == false) return;
    if(await checkRole(getUsers, socket, data, ['admin']) == false) return;

    const users = await User.find();
    try {
      socket.emit('getUsers', { status: 'ok', data: users });
    }
    catch (error) {
      socket.emit('getUsers', { status: 'error', error: error.message });
    }
  });
};