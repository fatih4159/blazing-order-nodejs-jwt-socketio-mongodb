require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('node-color-log');



const http = require('http');
const socketSetup = require('./socket');
const { fillDatabase } = require('./exampleHelper');

const uri = process.env.MONGODB_URI;
const port = process.env.SOCKET_PORT;
const host = process.env.SOCKET_HOST;

const app = express();
app.use(express.json());

logger.info('Welcome to the Blazing Orders Backend!')
logger.info('Starting...')
logger.info(`Connecting to ${uri}...`);


(async () => {
    try {
        await mongoose.connect(uri,{dbName: 'blazing-orders'});
        logger.success('Connected to MongoDB! 🎉 ');
        logger.info('Database name: ' + mongoose.connection.name);

        const server = http.createServer(app);
        socketSetup(server);
        fillDatabase();

        server.listen(port, host, () => logger.info(`Server listening on ${host}:${port}!`));
    } catch (err) {
        logger.error('Error connecting to MongoDB:');
        logger.error(err);
    }
})();
