/**
 * This module exports a function `verifyToken` that verifies the JWT token from the client.
 * @module checkAuth
 * @requires jsonwebtoken
 * @requires User
 * @requires node-color-log
 * @requires process
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('node-color-log');
const jwt_secret = process.env.JWT_SECRET;

/**
 * Verifies the JWT token from the client.
 * @function verifyToken
 * @param {string} eventOrigin - The origin event from the client.
 * @param {object} socket - The socket object from the client.
 * @param {string} data - The data from the client in JSON format.
 * @returns {Promise<void>} Nothing
 * @throws Will throw an error if the token is not verified.
 */
const verifyToken = async (eventOrigin, socket, data) => {
  try {
    const parsedData = JSON.parse(data);
    const token = parsedData.token;
    logger.info("Verifying token " + token)

    const decoded = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ username: decoded.username });

    if (!user) {
      throw new Error('Token not verified');
    }

    logger.info("Token verified")
  } catch (error) {
    logger.error(error)
    socket.emit(eventOrigin, { status: 'error', error: error.message });
  }
};

exports.verifyToken = verifyToken;