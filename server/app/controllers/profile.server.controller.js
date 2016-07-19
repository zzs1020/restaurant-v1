/**
 * Created by ZZS on 7/8/16.
 */
var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');

module.exports = {
    find: function (req, res, next) {
        Profile.find(function (err, doc) {
            return res.json(doc);
        });
    },
    update: function (req, res, next) {
        Profile.findByIdAndUpdate(req.body._id, req.body, function (err, doc) {
            console.log('server.controller-update-profile-doc:', doc);//doc is old query
            return res.json(doc);
        })
    }
};