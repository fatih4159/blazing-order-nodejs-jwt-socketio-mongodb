const Reservation = require('../models/Reservation');
const {verifyToken} = require("../middlewares/checkAuth");
const {checkRole} = require("../middlewares/checkRole");

module.exports = (socket) => {
  socket.on('addReservation', async (data) => {
    try {
      if(await verifyToken(getUsers, socket, data) && await checkRole(getUsers, socket, data, ['admin'])) {
        const reservation = new Reservation(data);
        await reservation.save();
        socket.emit('createReservation', { status: 'ok' });
      }
    } catch (error) {
      socket.emit('createReservation', { status: 'error', error: error.message });
    }
  });

  socket.on('getAllReservations', async (data) => {
    try {
      if(await verifyToken(getUsers, socket, data) && await checkRole(getUsers, socket, data, ['admin'])) {
        const reservations = await Reservation.find();
        socket.emit('getReservations', { status: 'ok', data: reservations });
      }
    } catch (error) {
      socket.emit('getReservations', { status: 'error', error: error.message });
    }
  });
};