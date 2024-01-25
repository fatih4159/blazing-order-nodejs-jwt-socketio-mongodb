/**
 * This module exports a function that takes a socket object and sets up event listeners for 'putProduct' and 'getProducts' events.
 * @module productController
 * @param {object} socket - The socket object from the client.
 */

const Product = require('../models/Product');
const {verifyToken} = require("../middlewares/checkAuth");
const {checkRole} = require("../middlewares/checkRole");

module.exports = (socket) => {
  /**
   * Event listener for 'putProduct' event. It handles product creation.
   * @listens socket:putProduct
   * @param {string} data - The product data in JSON format.
   */
  socket.on('putProduct', async (data) => {
    try {
      if(await verifyToken(getUsers, socket, data) && await checkRole(getUsers, socket, data, ['admin'])) {
        const product = new Product(data);
        await product.save();
        socket.emit('createProduct', { status: 'ok' });
      }
    } catch (error) {
      socket.emit('createProduct', { status: 'error', error: error.message });
    }
  });

  /**
   * Event listener for 'getProducts' event. It retrieves all products.
   * @listens socket:getProducts
   * @param {string} data - The user data in JSON format.
   */
  socket.on('getProducts', async (data) => {
    try {
      const products = await Product.find();
      socket.emit('getProducts', { status: 'ok', data: products });
    } catch (error) {
      socket.emit('getProducts', { status: 'error', error: error.message });
    }
  });
};