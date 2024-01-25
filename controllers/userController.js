const User = require('../models/User');
/**
 * Requires the 'checkAuth' middleware module and assigns the 'verifyToken' and 'checkRole' functions to variables.
 * @module userController
 * @requires ../middlewares/checkAuth
 * @type {Object}
 * @property {Function} verifyToken - Function for verifying authentication token.
 * @property {Function} checkRole - Function for checking user role.
 */
const { verifyToken, checkRole } = require('../middlewares/checkAuth');

module.exports = (socket) => {
  socket.on('createUser', async (data) => {
    if(!(await verifyToken('createUser', socket, data) && await checkRole('putUser', socket, data, ['admin']))) return;

    const user = new User(data);
    try {
      await user.save();
      socket.emit('createUser', { status: 'ok' });
    } catch (error) {
      socket.emit('createUser', { status: 'error', error: error.message });
    }
  });

  socket.on('getUsers', async (data) => {
    if(!(await verifyToken('getUsers', socket, data) && await checkRole('getUsers', socket, data, ['admin']))) return;

    try {
      /**
       * Retrieves all users from the database.
       * @returns {Promise<Array<User>>} A promise that resolves to an array of User objects.
       */
      const users = await User.find();
      socket.emit('getUsers', { status: 'ok', data: users });
    } catch (error) {
      socket.emit('getUsers', { status: 'error', error: error.message });
    }
  });
};