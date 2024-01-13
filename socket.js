const socketIo = require('socket.io');
const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');
const productController = require('./controllers/productController');
const reservationController = require('./controllers/reservationController');
const roleController = require('./controllers/roleController');
const roomController = require('./controllers/roomController');
const tableController = require('./controllers/tableController');
const userController = require('./controllers/userController');


module.exports = (server) => {
  const io = socketIo(server);
  io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));

    // Add your controllers here
    authController(socket);
    orderController(socket);
    productController(socket);
    reservationController(socket);
    roleController(socket);
    roomController(socket);
    tableController(socket);
    userController(socket);

  });
};