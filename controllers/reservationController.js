/**
 * This module exports a function that takes a socket object and sets up event listeners for 'addReservation' and 'getAllReservations' events.
 * @module reservationController
 * @param {object} socket - The socket object from the client.
 */

const Reservation = require('../models/Reservation');
const {verifyToken} = require("../middlewares/checkAuth");
const {checkRole} = require("../middlewares/checkRole");

module.exports = (socket) => {
  /**
   * Event listener for 'addReservation' event. It handles reservation creation.
   * @listens socket:addReservation
   * @param {string} data - The reservation data in JSON format.
   */
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

  /**
   * Event listener for 'getAllReservations' event. It retrieves all reservations if the authenticated user is an admin.
   * @listens socket:getAllReservations
   * @param {string} data - The user data in JSON format.
   */
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