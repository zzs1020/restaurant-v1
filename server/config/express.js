/**
 * Created by ZZS on 7/4/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');//if use passport session, should use expresssession first
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

// var mongoose = require('mongoose');
// var Admin = mongoose.model('Admin');

module.exports = function () {
    console.log('init process');

    var app = express();

    app.use(morgan('dev'));// log every request to the console
    app.use(bodyParser.json()); //inculde request form to req.data
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('./dist'));
    app.use(cookieParser());// read cookies (needed for auth)

    app.set('view engine', 'ejs');
    
    //required for passport
    require('./passport')(passport); //pass passport for config
    app.use(session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // load our routes and pass in our app and fully configured passport
    require('../app/routes/admin.server.routes')(app, passport);
    require('../app/routes/reservation.server.routes')(app);
    require('../app/routes/table.server.routes')(app);
    require('../app/routes/profile.server.routes')(app);
    require('../app/routes/contact.server.routes')(app);

    // app.post('/api/passportlogin', passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/err'
    // }));

    // passport.use(new localStrategy(function (username, password, done) {
    //     Admin.findOne({username: username}, function (err, user) {
    //         if(err) {return done(err);}
    //         if(!user) {
    //             return done(null, false, {message: 'incorrect username'})
    //         }
    //         if (user.password !== password){
    //             return done(null, false, {message: 'incorrect password'})
    //         }
    //         // console.log(user);
    //         return done(null, user);
    //     });
    // }));

    app.use(function (err, req, res, next) {
        if(!err) {
            return next();
        }
        res.status(500);
        try{
            return res.json(err.message || 'server error 500')
        }catch (e) {
            console.error('sent 500 error message failed');
        }
    });

    return app;
};