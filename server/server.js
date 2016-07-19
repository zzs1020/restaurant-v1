/**
 * Created by ZZS on 7/3/16.
 */
var express = require('./config/express'),
    mongodb = require('./config/mongoose'),

    
    compress = require('compression'),
    methodOverride = require('method-override');

var db = mongodb();
var serverapp = express();

module.exports = serverapp;

// serverapp.use(morgan());
// serverapp.use(compress());
// serverapp.use(bodyParser());
// serverapp.use(cookieParser());
// serverapp.use(session({
//     secret : 'almvnirtgd#$DFsa25452*AYD*D*S!@!#adsda))Ddsadsax',
//     cookie: {httpOnly: true, secure: false, maxAge: 86400000},
//     store: new session.MemoryStore()
// }));
// serverapp.use('/', serverStatic(__dirname + '/public'));
//
// var isLoggedIn = function (req, res, next) {
//     if(req.isAuthenticated()) {//todo: don't understand
//         next();
//     }else{
//         res.send({
//             message: 'please log in'
//         }, 400);
//     }
// };
//
// serverapp.post('/api/login', function (req, res, next) {
//
// });
//
// serverapp.get('/api/session', isLoggedIn, function (req, res) {
//     res.send({
//         loginStatus: true,
//         user: req.user
//     });
// });
//
// serverapp.get('/api/logout', function (req, res) {
//     req.logout();
//     res.redirectTo('/login');
// });
//
// var port = process.env.PORT || 8000;
// serverapp.listen(port);
// console.log('server on port 8000');