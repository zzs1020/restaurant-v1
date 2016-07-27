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
    },
    findById: function (req, res, next) {
        Contact.findOne({_id: req.body._id})
            .exec(function (err, doc) {
                if (err) {
                    return next(err);
                }
                if(!doc) {
                    return next(new Error('no such a contact'));
                }

                return res.json(doc);
            })
    },
    update: function (req, res, next) {
        Contact.findByIdAndUpdate(req.body._id, req.body, function(err, doc){
            return res.json(req.body);
        })
    },
    delete: function (req, res, next) {
        //req.params get :key, req.query get ?key
        Contact.findByIdAndRemove({_id: req.params.id}, function (err, doc) {
            return res.json(doc);
        })
    } 
};