const mongoose = require("mongoose");

const Table = mongoose.model(
    "Table",
    new mongoose.Schema({
        tableId: Number,
        name: String,
        type: String,
        form: String,
        seats: Number,
        hasReservation: {
            type: Boolean,
            default: false
        },
        reservationIds: [String],
        room: String,
    })
);


module.exports = Table;
