/**
 * Created by ZZS on 7/13/16.
 */
app.factory('profileService', ['$http', '$q', function ($http, $q) {
    return {
        find: function () {
            return $http.get('/api/profile');
        },
        update: function (data) {
            return $http.post('/api/profile', data);
        }
    }
}])