/**
 * Created by ZZS on 6/25/16.
 */
var app = angular.module('restaurantApp', ['ui.router']);

// app.config(function ($routeProvider) {
//     $routeProvider.when('/reservation', {
//         redirectTo: '/'
//     }).when('/success', {
//         templateUrl: 'partial/guest/_editReservation.html',
//         controller: 'ReservationController',
//         controllerAs: 'resvCtrl'
//     }).when('/login', {
        
//     }).when('/reservationList', {

//     }).when('/seating', {

//     }).when('/profile', {

//     }).when('/setting', {

//     }).when('/contacts', {

//     });
// });

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home/reservation');

    $stateProvider
        .state('home', {
            abstract: true,
            url: '/home',
            templateUrl: 'partial/guest/_guest.html'
        })
            .state('home.reservation', {
                url: '/reservation',
                templateUrl: 'partial/guest/_reservation.html',
                controller: 'ReservationController',
                controllerAs: 'resvCtrl'
            })
            .state('home.login', {
                url: '/login',
                templateUrl: 'partial/guest/_login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
        .state('editReservation', {
            url: '/editReservation',
            templateUrl: 'partial/guest/_editReservation.html',
            controller: 'ReservationController',
            controllerAs: 'resvCtrl'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'partial/_about.html'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'partial/admin/_admin.html'
        })
            .state('admin.reservationList', {
                url: '/reservationList',
                templateUrl: 'partial/admin/_reservationList.html',
                // resolve: {
                //     auth: ['$q', '$location', 'loginService', function ($q, $location, loginService) {
                //         return loginService.session().then(function (success) {
                //
                //         }, function (error) {
                //             $location.path('/login');
                //             $location.replace();    //prevent access from browser history
                //             return $q.reject(error); //indicate the promise still fails, if dont reject then means error has been handled here
                //         });
                //     }]
                // }
                controller: 'ReservationController',
                controllerAs: 'resvCtrl'
            })
            .state('admin.profile', {
                url: '/profile',
                templateUrl: 'partial/admin/_profile.html',
                controller: 'ProfileController',
                controllerAs: 'profileCtrl'
            })
            .state('admin.seating', {
                url: '/seating',
                templateUrl: 'partial/admin/_seating.html',
                controller: 'TableController',
                controllerAs: 'tableCtrl'
            })
            .state('admin.contacts', {
                url: '/contacts',
                templateUrl: 'partial/admin/_contacts.html',
                controller: 'ContactController',
                controllerAs: 'contactCtrl'
            })
            .state('admin.setting', {
                url: '/setting',
                templateUrl: 'partial/admin/_setting.html',
                controller: 'ProfileController',
                controllerAs: 'profileCtrl'
            })
        .state('error', {
            url: '/error',
            templateUrl: 'error.html'
        })
    ;
}]);