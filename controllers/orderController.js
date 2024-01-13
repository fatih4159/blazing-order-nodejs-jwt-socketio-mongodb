const Order = require('../models/Order');

module.exports = (socket) => {
  socket.on('putOrder', async (data) => {
    const order = new Order(data);
    try {
      await order.save();
      socket.emit('createOrder', { status: 'ok' });
    } catch (error) {
      socket.emit('createOrder', { status: 'error', error: error.message });
    }
  });

  socket.on('getOrders', async (data) => {
    const orders = await Order.find();
    try {
      socket.emit('getOrders', { status: 'ok', data: orders });
    }
    catch (error) {
      socket.emit('getOrders', { status: 'error', error: error.message });
    }
  });
};