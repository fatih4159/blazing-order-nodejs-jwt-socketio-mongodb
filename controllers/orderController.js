const { verifyToken } = require('../middlewares/checkAuth');
const { checkRole } = require('../middlewares/checkRole');
const Order = require('../models/Order');
const jwt_secret = process.env.JWT_SECRET;

module.exports = (socket) => {
  socket.on('putOrder', async (data) => {
    try {
      if (!await verifyToken('putOrder', socket, data)) throw new Error('Unauthorized');
      const order = new Order(data);
      await order.save();
      socket.emit('putOrder');
    } catch (error) {
      socket.emit('putOrder', { error: error.message });
    }
  });

  socket.on('getOwnOrders', async (data) => {
    try {
      if (!await verifyToken('getOwnOrders', socket, data)) throw new Error('Unauthorized');
      const parsedData = JSON.parse(data);
      const token = parsedData.token;
      const decoded = jwt.verify(token, jwt_secret);
      const orders = await Order.find({ ordered: {by:decoded.username} });
      socket.emit('getOwnOrders', { data: orders });
    } catch (error) {
      socket.emit('getOwnOrders', { error: error.message });
    }
  });

  socket.on('getAllOrders', async (data) => {
    try {
      if (!await verifyToken('getAllOrders', socket, data)) throw new Error('Unauthorized');
      if (!await checkRole('getAllOrders', socket, data, ['admin'])) throw new Error('Unauthorized');
      const orders = await Order.find();
      socket.emit('getAllOrders', { data: orders });
    } catch (error) {
      socket.emit('getAllOrders', { error: error.message });
    }
  });
};