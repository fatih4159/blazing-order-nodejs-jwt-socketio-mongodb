const mongoose = require("mongoose");

const Table = mongoose.model(
    "Table",
    new mongoose.Schema({
        number: Number,
        type: String,
        seats: Number,
        form: [
            {
                x: Number,
                y: Number
            }
        ],
        pos:{
            x: Number,
            y: Number
        },
        reservations:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reservation"
            }
        ],
        room: String,
        created:{
            at: Date,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        },
    })
);


module.exports = Table;
