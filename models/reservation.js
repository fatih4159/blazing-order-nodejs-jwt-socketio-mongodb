const mongoose = require("mongoose");

const Reservation = mongoose.model(
    "Reservation",
    new mongoose.Schema({
        reservationId: Number,
        reservationName: String,
        reservationPhone: String,
        reservationEmail: String,
        reservationComment: String,
        reservationDate: String,
        reservationTime: String,
        reservationTableOIDS: [String],
        reservationPersons: Number,
        reservationOrigin: String,
    })
);

module.exports = Reservation;
