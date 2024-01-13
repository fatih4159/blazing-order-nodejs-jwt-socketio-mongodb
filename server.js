require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const http = require('http');
const socketSetup = require('./socket');

const uri = process.env.MONGODB_URI
const port = process.env.SOCKET_PORT;
const host = process.env.SOCKET_HOST;


const app = express();
app.use(express.json());

console.log(`Connecting to ${uri}...`);

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.log('Error connecting to MongoDB:');
    console.log(err);
});


const server = http.createServer(app);
socketSetup(server);

server.listen(port,host, () => console.log(`Server listening on ${host}:${port}!`));