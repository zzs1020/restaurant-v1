/**
 * Created by ZZS on 7/8/16.
 */
var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
    restaurantName: String,
    ownerName: String,
    address: String,
    phone: String,
    email: String,
    employees: Number,
    services: String
});

var Profile = mongoose.model('Profile', ProfileSchema);