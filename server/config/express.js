/**
 * Created by ZZS on 7/4/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');//if use passport session, should use expresssession first
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var path = require('path');

var passport = require('passport');
var flash = require('connect-flash');


module.exports = function () {
    console.log('init process');

    var app = express();

    app.use(morgan('dev'));// log every request to the console
    app.use(bodyParser.json()); //inculde request form to req.data
    app.use(bodyParser.urlencoded({ extended: true }));
    //path.join used to solve forward/ or back\ on different OS
    //把这个路径下的文件host为静态文件, 所以可以通过localhost:8000/访问该目录下的任意文件
    app.use(express.static(path.join(__dirname, '..', '..', 'public')));
    app.use(cookieParser());// read cookies (needed for auth)

    // app.set('view engine', 'ejs');
    
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
    //if nothing matchs, send index file to client side, so angular will deal that route
    //if we call url w/o # will go there
    app.use('*', function (req, res, next) {
        var indexFile = path.resolve(__dirname, '../../public/index.html');
        console.log('----pathlog:', indexFile);
        res.sendFile(indexFile);
    });

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