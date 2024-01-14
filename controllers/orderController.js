const { verifyToken } = require('../middlewares/checkAuth');
const { checkRole } = require('../middlewares/checkRole');
const Order = require('../models/Order');

module.exports = (socket) => {

  const putOrder = 'putOrder';
  socket.on(putOrder, async (data) => {
    const order = new Order(data);
    try {
      await order.save();
      socket.emit(putOrder, { status: 'ok' });
    } catch (error) {
      socket.emit(putOrder, { status: 'error', error: error.message });
    }
  });

  const getAllOrders = 'getAllOrders';
  socket.on(getAllOrders, async (data) => {
    
    if(await verifyToken(getAllOrders, socket, data) == false) return;
    if(await checkRole(getAllOrders, socket, data, ['admin']) == false) return;

    const orders = await Order.find();
    try {
      socket.emit(getAllOrders, { status: 'ok', data: orders });
    }
    catch (error) {
      socket.emit(getAllOrders, { status: 'error', error: error.message });
    }
  });
};