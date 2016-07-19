/**
 * Created by ZZS on 7/8/16.
 */
var ContactController = require('../controllers/contact.server.controller');

module.exports = function (app) {
    app.route('/api/contact')
        .get(isLoggedIn, ContactController.list)
        .post(isLoggedIn, ContactController.create)
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/#/login');
}