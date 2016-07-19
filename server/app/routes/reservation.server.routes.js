/**
 * Created by ZZS on 7/4/16.
 */
var ReservationController = require('../controllers/reservation.server.controller');

module.exports = function (app) {
    app.route('/api/reservation')
        .get(isLoggedIn, ReservationController.list)
        .post(ReservationController.create);

    app.get('/api/reservation/count', isLoggedIn, ReservationController.count);//shorthand for combining route+get
    
    app.route('/api/reservation/:rid')
        .get(ReservationController.get)
        .post(ReservationController.update)
        .delete(ReservationController.del);

    //middleware that will be carry first to check exist
    app.param('rid', ReservationController.getById);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/#/login');
}