/**
 * Created by ZZS on 7/8/16.
 */
var mongoose = require('mongoose');
var Table = mongoose.model('Table');

module.exports = {
    list: function (req, res, next) {
        Table.find(function (err, doc) {
            return res.json(doc);
        });
    },
    update: function (req, res, next) {
        console.log(req.body)
        Table.findByIdAndUpdate(req.body._id, req.body, function (err, doc) {
            return res.json(doc);
        })
    }
};