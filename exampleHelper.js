
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('node-color-log');
const jwt_secret = process.env.JWT_SECRET;

const Role = require('./models/Role');
const User = require('./models/User');
const Product = require('./models/Product');
const Room = require('./models/Room');
const Table = require('./models/Table');
const Order = require('./models/Order');
const Reservation = require('./models/Reservation');

module.exports.fillDatabase = async () => {
    Role({
        name: 'admin'
    }).save();
    Role({
        name: 'user'
    }).save();

    User({
        username: 'admin',
        password: bcrypt.hashSync('admin', 8),
        role: 'admin'
    }).save();

    User({
        username: 'user',
        password: bcrypt.hashSync('user', 8),
        role: 'user'
    }).save();

    Product({
        name: 'Coca Cola',
        price: 2.5,
        category: 'drink'
    }).save();

    Product({
        name: 'Fanta',
        price: 2.5,
        category: 'drink'
    }).save();

    Product({
        name: 'Sprite',
        price: 2.5,
        category: 'drink'
    }).save();

    Product({
        name: 'Pepsi',
        price: 2.5,
        category: 'drink'
    }).save();

    Product({
        name: '7up',
        price: 2.5,
        category: 'drink'
    }).save();

    Product({
        name: 'Water',
        price: 1.5,
        category: 'drink'
    }).save();

    Product({
        name: 'Burger',
        price: 5,
        category: 'food'
    }).save();

    Room({
        name: 'Room 1'
    }).save();

    Room({
        name: 'Room 2'
    }).save();

    Room({
        name: 'Room 3'
    }).save();

    Table({
        name: 'Table 1',
        room: 'Room 1'
    }).save();

    Table({
        name: 'Table 2',
        room: 'Room 1'
    }).save();

    Table({
        name: 'Table 3',
        room: 'Room 1'
    }).save();

    Table({
        name: 'Table 4',
        room: 'Room 1'
    }).save();

    Order({
        roomName: 'Room 1',
        table: 'Table 1',
        products: new Map(),
        totalUnpaidPrice: 0,
        totalPaidPrice: 0,
        isDone: false,
        orderOrigin: User.findOne({ username: 'user' })._id
    }).save();

    Order({
        orderId: 2,
        roomName: 'Room 1',
        table: 'Table 2',
        products: new Map(),
        totalUnpaidPrice: 0,
        totalPaidPrice: 0,
        isDone: false,
        orderOrigin: User.findOne({ username: 'user' })._id
    }).save();

    Order({
        roomName: 'Room 1',
        table: 'Table 3',
        products: new Map(),
        totalUnpaidPrice: 0,
        totalPaidPrice: 0,
        isDone: false,
        orderOrigin: User.findOne({ username: 'user' })._id
    }).save();

    Order({
        roomName: 'Room 1',
        table: 'Table 4',
        products: new Map(),
        totalUnpaidPrice: 0,
        totalPaidPrice: 0,
        isDone: false,
        orderOrigin: User.findOne({ username: 'admin' })._id
    }).save();

    Reservation({
        roomName: 'Room 1',
        table: 'Table 1',
        date: new Date(),
        duration: 2,
        isDone: false,
        reservationOrigin: User.findOne({ username: 'user' })._id
    }).save();

    Reservation({
        roomName: 'Room 1',
        table: 'Table 2',
        date: new Date(),
        duration: 2,
        isDone: false,
        reservationOrigin: User.findOne({ username: 'admin' })
    }).save();
}