/**
 * This module exports a function that takes a socket object and sets up event listeners for 'putOrder', 'getOwnOrders', and 'getAllOrders' events.
 * @module orderController
 * @param {object} socket - The socket object from the client.
 */

const { verifyToken } = require('../middlewares/checkAuth');
const { checkRole } = require('../middlewares/checkRole');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

module.exports = (socket) => {
  /**
   * Event listener for 'putOrder' event. It handles order creation.
   * @listens socket:putOrder
   * @param {string} data - The order data in JSON format.
   */
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

  /**
   * Event listener for 'getOwnOrders' event. It retrieves the orders of the authenticated user.
   * @listens socket:getOwnOrders
   * @param {string} data - The user data in JSON format.
   */
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

  /**
   * Event listener for 'getAllOrders' event. It retrieves all orders if the authenticated user is an admin.
   * @listens socket:getAllOrders
   * @param {string} data - The user data in JSON format.
   */
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