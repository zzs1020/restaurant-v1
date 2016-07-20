/**
 * Created by ZZS on 7/5/16.
 */
// var AdminController = require('../controllers/admin.server.controller');

module.exports = function (app, passport) {
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    app.get('/logout', function(req, res) {
        
        req.logout();
        res.redirect('/#/home/login');
        
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.route('/api/passportlogin').post(passport.authenticate('local-login'), function (req, res) {
        console.log(req);//if success, then req.user contains authenticated user
        res.json(req.user);
    });
    
    app.get('/api/session', function (req, res) {
        res.json(req.isAuthenticated());
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) 
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/#/login');
}