/**
 * Created by ZZS on 7/8/16.
 */
var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');

module.exports = {
    list: function (req, res, next) {
        Contact.find(function (err, docs) {
            return res.json(docs);
        });
    },
    create: function (req, res, next) {
        var contact = new Contact(req.body);
        contact.save(function (err) {
            if(err){return next(err)}
            return res.json(contact);
        })
    }
};