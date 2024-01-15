const Table = require('../models/Table');
const { verifyToken } = require('../middlewares/checkAuth');
const { checkRole } = require('../middlewares/checkRole');


module.exports = (socket) => {

  const putTable = 'putTable';
  socket.on('putTable', async (data) => {

    if(await verifyToken(getUsers, socket, data) == false) return;
    if(await checkRole(getUsers, socket, data, ['admin']) == false) return;

    const table = new Table(data);
    try {
      await table.save();
      socket.emit(putTable, { status: 'ok' });
    } catch (error) {
      socket.emit(putTable, { status: 'error', messege: error.message });
    }
  });

  const getTables = 'getTables';
  socket.on('getTables', async (data) => {

    if(await verifyToken(getTables, socket, data) == false) return;
    if(await checkRole(getTables, socket, data, ['admin']) == false) return;

    const tables = await Table.find();
    try {

      socket.emit('getTables', { status: 'ok', data: tables });
    }
    catch (error) {
      socket.emit('getTables', { status: 'error', error: error.message });
    }
  });
};