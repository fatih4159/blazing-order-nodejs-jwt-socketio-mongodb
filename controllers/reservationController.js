const Reservation = require('../models/Reservation');

module.exports = (socket) => {
  socket.on('putReservation', async (data) => {
    const reservation = new Reservation(data);
    try {
      await reservation.save();
      socket.emit('createReservation', { status: 'ok' });
    } catch (error) {
      socket.emit('createReservation', { status: 'error', error: error.message });
    }
  });

  socket.on('getReservations', async (data) => {
    const reservations = await Reservation.find();
    try {
      socket.emit('getReservations', { status: 'ok', data: reservations });
    }
    catch (error) {
      socket.emit('getReservations', { status: 'error', error: error.message });
    }
  });
};