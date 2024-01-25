/**
 * This module exports a function that takes a socket object and sets up event listeners for 'putRoom' and 'getRooms' events.
 * @module roomController
 * @param {object} socket - The socket object from the client.
 */

const Room = require('../models/Room');

module.exports = (socket) => {
  /**
   * Event listener for 'putRoom' event. It handles room creation.
   * @listens socket:putRoom
   * @param {string} data - The room data in JSON format.
   */
  socket.on('putRoom', async (data) => {
    try {
      const room = new Room(data);
      await room.save();
      socket.emit('createRoom', { status: 'ok' });
    } catch (error) {
      socket.emit('createRoom', { status: 'error', error: error.message });
    }
  });

  /**
   * Event listener for 'getRooms' event. It retrieves all rooms.
   * @listens socket:getRooms
   */
  socket.on('getRooms', async () => {
    try {
      const rooms = await Room.find();
      socket.emit('getRooms', { status: 'ok', data: rooms });
    } catch (error) {
      socket.emit('getRooms', { status: 'error', error: error.message });
    }
  });
};