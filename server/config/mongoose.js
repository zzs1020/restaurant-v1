/**
 * Created by ZZS on 7/4/16.
 */
var mongoose = require('mongoose');
var config = require('./config');

module.exports = function () {
    var db = mongoose.connect(config.mongodb);

    require('../app/models/admin.server.model.js');
    require('../app/models/reservation.server.model.js');
    require('../app/models/profile.server.model.js');
    require('../app/models/table.server.model');
    require('../app/models/contact.server.model');
    
    return db;
};