/**
 * Created by ZZS on 7/4/16.
 */
var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');


module.exports = {
    login: function (req, res, next) {
        var admin = new Admin(req.body);
        Admin.findOne({username: admin.username}).exec(function (err, doc) {
            if (err) {
                return next(err);
            }
            if(!doc) {
                return next(new Error('no such a admin'));
            }
            if(admin.password === doc.password){
                res.send({loginStatus: true, user: doc}); 
            }else{
                return next(new Error('fail login'));
            }
        })
    },
    isLoggedIn: function (req, res, next) {
        if(req.isAuthenticated()){
            next();
        }else{
            res.send({
                msg: 'please login'
            }, 400);
        }
    },
    session: function (req, res) {
        res.send({
            loginStatus: true,
            user: req.user //todo here may have problem
        });
    },
    logout: function (req, res) {
        req.logout();
        res.redirectTo('/#/login');
    }
};