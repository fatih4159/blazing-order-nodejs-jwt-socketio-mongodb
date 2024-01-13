const Table = require('../models/Table');

module.exports = (socket) => {
  socket.on('putTable', async (data) => {
    const table = new Table(data);
    try {
      await table.save();
      socket.emit('createTable', { status: 'ok' });
    } catch (error) {
      socket.emit('createTable', { status: 'error', error: error.message });
    }
  });

  socket.on('getTables', async (data) => {
    const tables = await Table.find();
    try {
      socket.emit('getTables', { status: 'ok', data: tables });
    }
    catch (error) {
      socket.emit('getTables', { status: 'error', error: error.message });
    }
  });
};