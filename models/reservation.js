const mongoose = require("mongoose");

const Reservation = mongoose.model(
    "Reservation",
    new mongoose.Schema({
        created:{
            at: Date,
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        },
        forUser: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        comment: String,
        dateFrom: Date,
        dateTo: Date,
        tables: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Table"
            }
        ],
        persons: Number,
        isConfirmed: Boolean,
        isCancelled: Boolean,
        confirmedBy: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        confirmedAt: Date,
        cancelledBy: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        cancelledAt: Date,
        changedBy: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        changedAt: Date,
    })
);

module.exports = Reservation;
