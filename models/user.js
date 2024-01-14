const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        password: String,
        salutation: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
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


module.exports = User;
