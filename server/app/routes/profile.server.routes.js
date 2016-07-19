/**
 * Created by ZZS on 7/8/16.
 */
var ProfileController = require('../controllers/profile.server.controller');

module.exports = function (app) {
    app.route('/api/profile')
        .get(isLoggedIn, ProfileController.find)
        .post(isLoggedIn, ProfileController.update);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/#/login');
}