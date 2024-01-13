const Room = require('../models/Room');

module.exports = (socket) => {
  socket.on('putRoom', async (data) => {
    const room = new Room(data);
    try {
      await room.save();
      socket.emit('createRoom', { status: 'ok' });
    } catch (error) {
      socket.emit('createRoom', { status: 'error', error: error.message });
    }
  });

  socket.on('getRooms', async (data) => {
    const rooms = await Room.find();
    try {
      socket.emit('getRooms', { status: 'ok', data: rooms });
    }
    catch (error) {
      socket.emit('getRooms', { status: 'error', error: error.message });
    }
  });
};