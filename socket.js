const socketIo = require('socket.io');
const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');
const productController = require('./controllers/productController');
const reservationController = require('./controllers/reservationController');
const roleController = require('./controllers/roleController');
const roomController = require('./controllers/roomController');
const tableController = require('./controllers/tableController');
const userController = require('./controllers/userController');
const logger = require('node-color-log');


module.exports = (server) => {
  const io = socketIo(server);
  io.on('connection', (socket) => {
    logger.info('New client connected => ' + socket.id);
    socket.on('disconnect', () => logger.info('Client disconnected => ' + socket.id));

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