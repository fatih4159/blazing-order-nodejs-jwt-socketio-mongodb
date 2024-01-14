const mongoose = require("mongoose");


const Room = mongoose.model(
    "Room",
    new mongoose.Schema({
        name: String,
        type: String,
        level: String,
        form: [
            {
                x: Number,
                y: Number
            }
        ],
        created:{
            at: Date,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        },
    })
);


module.exports = Room;
