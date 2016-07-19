/**
 * Created by ZZS on 7/8/16.
 */
var TableController = require('../controllers/table.server.controller');

module.exports = function (app) {
    app.route('/api/table')
        .get(isLoggedIn, TableController.list)
        .post(isLoggedIn, TableController.update);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/#/login');
}
