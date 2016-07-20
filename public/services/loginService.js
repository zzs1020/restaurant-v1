/**
 * Created by ZZS on 7/2/16.
 */
app.factory('loginService', ['$http', '$rootScope', function ($http, $rootScope) {

    var service = {
        // isLoggedIn: false,
        session: function () {
            return $http.get('/api/session');
        },
        // logout: function () {
        //     $http.get('/logout').then(function (res) {
        //         console.log('logout----->------>',res.data);
        //         $rootScope.isLoggedIn = false;
        //     })
        // },
        login: function (user) {
            return $http.post('/api/passportlogin', user).then(function (res) {
                console.log(res.data);
                $rootScope.isLoggedIn = true;
            });
        }
    };

    return service;
}]);