const socketIo = require('socket.io');
const logger = require('node-color-log');

const controllers = [
  './controllers/authController',
  './controllers/orderController',
  './controllers/productController',
  './controllers/reservationController',
  './controllers/roleController',
  './controllers/roomController',
  './controllers/tableController',
  './controllers/userController'
];

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connection', (socket) => {
    logger.info('New client connected => ' + socket.id);
    socket.on('disconnect', () => logger.info('Client disconnected => ' + socket.id));

    // Initialize controllers
    controllers.forEach(controller => require(controller)(socket));
  });
};