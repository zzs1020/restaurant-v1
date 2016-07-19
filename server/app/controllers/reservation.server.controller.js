/**
 * Created by ZZS on 7/4/16.
 */
var mongoose = require('mongoose');
var Reservation = mongoose.model('Reservation');

module.exports = {
    create: function (req, res, next) {
        var reservation = new Reservation(req.body);
        reservation.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.json(reservation);
        });
    },
    count: function (req, res, next) {
        var pageAmount = 0;
        Reservation.count(function (err, count) {
            pageAmount = count;
            // console.log(pageAmount)
            return res.json(count);
        });
    },
    list: function (req, res, next) {
        var pageSize = parseInt(req.query.pageSize, 10) || 1000; //default find all, now use 1000
        var pageCurrent = parseInt(req.query.pageCurrent, 10) || 1;
        
        Reservation.find().skip((pageCurrent - 1) * pageSize)
            .limit(pageSize)
            .exec(function (err, docs) {
                if(err){
                    return next(err);
                }
                return res.json(docs);
            });
    },
    getById: function (req, res, next, id) {
        if(!id) {
            return next(new Error('id not found'));
        }
        Reservation.findOne({_id: id})
            .exec(function (err, doc) {
                if (err) {
                    return next(err);
                }
                if(!doc) {
                    return next(new Error('no such a reservation'));
                }


                req.reservation = doc;
                console.log('server.controller-middleware-reqBody:', req.body);

                return next();
            })
    },
    get: function (req, res, next) {
        return res.json(req.reservation); 
    },
    update: function (req, res, next) {

        Reservation.findByIdAndUpdate(req.reservation._id, req.body, function (err, doc) {

            console.log('server.controller-update-exec-doc:', doc);//doc is old query
            return res.json(req.body);
        });
    },
    del: function (req, res, next) {
        Reservation.findByIdAndRemove(req.reservation._id, function (err, doc) {
            if (err) {
                return next(err);
            }
            return res.json(doc);
        })
    }
};