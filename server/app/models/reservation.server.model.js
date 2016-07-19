/**
 * Created by ZZS on 7/4/16.
 */
var mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({
    date: Date,
    time: String,
    guestName: String,
    guestEmail: String,
    guestPhone: String,
    partySize: Number,
    special: String,
    createdTime: {type: Date, default: Date.now}
});

var Reservation = mongoose.model('Reservation', ReservationSchema);