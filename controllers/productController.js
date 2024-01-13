const Product = require('../models/Product');

module.exports = (socket) => {
  socket.on('putProduct', async (data) => {
    const product = new Product(data);
    try {
      await product.save();
      socket.emit('createProduct', { status: 'ok' });
    } catch (error) {
      socket.emit('createProduct', { status: 'error', error: error.message });
    }
  });

  socket.on('getProducts', async (data) => {
    const products = await Product.find();
    try {
      socket.emit('getProducts', { status: 'ok', data: products });
    }
    catch (error) {
      socket.emit('getProducts', { status: 'error', error: error.message });
    }
  });
};