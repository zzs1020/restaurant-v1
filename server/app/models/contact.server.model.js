/**
 * Created by ZZS on 7/8/16.
 */
var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});

var Contact = mongoose.model('Contact', ContactSchema);