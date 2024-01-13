require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('node-color-log');

const http = require('http');
const socketSetup = require('./socket');

const uri = process.env.MONGODB_URI;
const port = process.env.SOCKET_PORT;
const host = process.env.SOCKET_HOST;

const app = express();
app.use(express.json());

logger.info(`Connecting to ${uri}...`);

(async () => {
    try {
        await mongoose.connect(uri);
        logger.success('Connected to MongoDB!');

        const server = http.createServer(app);
        socketSetup(server);

        server.listen(port, host, () => logger.info(`Server listening on ${host}:${port}!`));
    } catch (err) {
        logger.error('Error connecting to MongoDB:');
        logger.error(err);
    }
})();
