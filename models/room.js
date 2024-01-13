const mongoose = require("mongoose");


const Room = mongoose.model(
    "Room",
    new mongoose.Schema({
        roomId: Number,
        name: String,
        type: String,
        level: String,
    })
);


module.exports = Room;
