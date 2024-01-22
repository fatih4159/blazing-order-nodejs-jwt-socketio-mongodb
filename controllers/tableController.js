const Table = require('../models/Table');
const {verifyToken} = require('../middlewares/checkAuth');
const {checkRole} = require('../middlewares/checkRole');

module.exports = (socket) => {
    socket.on('putTable', async (data) => {
        if (!(await verifyToken(getUsers, socket, data)) || !(await checkRole(getUsers, socket, data, ['admin']))) return;
        const table = new Table(data);
        try {
            await table.save();
            socket.emit('putTable', {status: 'ok'});
        } catch (error) {
            socket.emit('putTable', {status: 'error', messege: error.message});
        }
    });

    socket.on('getTablesWithoutReservations', async (data) => {
        if (!(await verifyToken(getTablesWithoutReservations, socket, data))) return;
        try {
            const tables = await Table.find().select('-reservations');
            socket.emit('getTablesWithoutReservations', { status: 'ok', data: tables });
        } catch (error) {
            socket.emit('getTablesWithoutReservations', { status: 'error', error: error.message });
        }
    });

    socket.on('getTables', async (data) => {
        if (!(await verifyToken(getTables, socket, data)) || !(await checkRole(getTables, socket, data, ['admin']))) return;
        try {
            const tables = await Table.find();
            socket.emit('getTables', {status: 'ok', data: tables});
        } catch (error) {
            socket.emit('getTables', {status: 'error', error: error.message});
        }
    });
};