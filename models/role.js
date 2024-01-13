const mongoose = require("mongoose");

const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        roleId: Number,
        name: String
    })
);

module.exports = Role;
