/**
 * Created by ZZS on 7/12/16.
 */
var LocalStrategy = require('passport-local').Strategy;
var Admin = require('../app/models/admin.server.model');

// expose this function to our app using module.exports
module.exports = function (passport) {

    //passport session setup, required for persistent sessions,
    // passport needs ability to serialize and deserialize
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, user) {
            done(err, user)
        });
    });

    //local sign up part-------------------------------------------
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) { //so here we get req because passReqCallback: true
        
        //asynchronous, User.findOne wont fire unless data is sent back
        process.nextTick(function () {
            Admin.findOne({'local.username': username}, function (err, user) {
                if(err) return done(err);
                if(user){
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
                } else{
                    var newUser = new Admin();
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if(err) throw err;
                        return done(null, newUser);
                    })
                }
            })
        })
    }
    ));

    passport.use('local-login', new LocalStrategy({
        username: 'username',
        password: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        Admin.findOne({'local.username': username}, function (err, user) {
            if(err) return done(err);
            if(!user) {
                return done(null, false, req.flash('loginMessage', 'No user found'))
            }
            if(!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
            }

            return done(null, user)
        })
    }))
};