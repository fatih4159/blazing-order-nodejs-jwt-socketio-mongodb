/**
 * This module exports a function that takes a socket object and sets up event listeners for 'putTable', 'getTablesWithoutReservations', and 'getTables' events.
 * @module tableController
 * @param {object} socket - The socket object from the client.
 */

const Table = require('../models/Table');
const {verifyToken} = require('../middlewares/checkAuth');
const {checkRole} = require('../middlewares/checkRole');

module.exports = (socket) => {
  /**
   * Event listener for 'putTable' event. It handles table creation.
   * @listens socket:putTable
   * @param {string} data - The table data in JSON format.
   */
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

  /**
   * Event listener for 'getTablesWithoutReservations' event. It retrieves all tables without reservations.
   * @listens socket:getTablesWithoutReservations
   * @param {string} data - The user data in JSON format.
   */
  socket.on('getTablesWithoutReservations', async (data) => {
    if (!(await verifyToken(getTablesWithoutReservations, socket, data))) return;
    try {
      const tables = await Table.find().select('-reservations');
      socket.emit('getTablesWithoutReservations', { status: 'ok', data: tables });
    } catch (error) {
      socket.emit('getTablesWithoutReservations', { status: 'error', error: error.message });
    }
  });

  /**
   * Event listener for 'getTables' event. It retrieves all tables if the authenticated user is an admin.
   * @listens socket:getTables
   * @param {string} data - The user data in JSON format.
   */
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