const User = require('../models/User'); // adjust the path according to your project structure
const bcrypt = require('bcryptjs');

module.exports = (socket) => {
  socket.on('register', async (data) => {
    const { username, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    try {
      await user.save();
      socket.emit('register', { status: 'ok' });
    } catch (error) {
      socket.emit('register', { status: 'error', error: error.message });
    }
  });

  socket.on('login', async (data) => {
    const { username, password } = data;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      socket.emit('login', { status: 'ok' });
    } else {
      socket.emit('login', { status: 'error', error: 'Invalid credentials' });
    }
  });
};