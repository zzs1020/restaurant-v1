/**
 * Created by ZZS on 7/2/16.
 */
app.factory('reserveService', ['$http', '$q', function ($http, $q) {
    function handleRequest(method, url, data) {
        var deferred = $q.defer();
        var config = {
            method: method,
            url: url
        };

        if ('POST' === method){
            config.data = data;
        }else if('GET' === method){
            config.params = data;
        }

        $http(config).success(function (data) {
            deferred.resolve(data);
        }).error(function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    var searchId = '0';

    return {
        reserve: function (data) {
            return handleRequest('POST', '/api/reservation', data);
        },
        update:function (data) {
            console.log('enter service update:', data.valueOf());
            return handleRequest('POST', '/api/reservation/' + data._id, data)
        },
        list: function (params) {
            return handleRequest('GET', '/api/reservation', params);//params are pageSize, pageCurrent
        },
        count: function () {
            return handleRequest('GET', '/api/reservation/count');
        },
        detail: function (id) {
            return handleRequest('GET', '/api/reservation/' + id);
        },
        del: function (id) {
            return handleRequest('DELETE', '/api/reservation/'+ id);
        }
    }
}]);