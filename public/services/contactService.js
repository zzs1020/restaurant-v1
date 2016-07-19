/**
 * Created by ZZS on 7/13/16.
 */
app.factory('contactService', ['$http', function ($http) {
    return {
        find: function () {
            return $http.get('/api/contact');
        },
        create: function (data) {
            return $http.post('/api/contact', data);
        }
    }
}]);