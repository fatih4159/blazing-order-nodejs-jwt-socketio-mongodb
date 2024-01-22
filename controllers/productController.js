const Product = require('../models/Product');
const {verifyToken} = require("../middlewares/checkAuth");
const {checkRole} = require("../middlewares/checkRole");

module.exports = (socket) => {
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

  socket.on('getProducts', async (data) => {
    try {
      const products = await Product.find();
      socket.emit('getProducts', { status: 'ok', data: products });
    } catch (error) {
      socket.emit('getProducts', { status: 'error', error: error.message });
    }
  });
};