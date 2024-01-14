const mongoose = require("mongoose");

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String,
        created:{
            at: Date,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        },
    })
);

module.exports = Role;
