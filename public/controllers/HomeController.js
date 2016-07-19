/**
 * Created by ZZS on 6/25/16.
 */

app.controller('HomeController', ['loginService', '$rootScope', function (loginService, $rootScope) {
    var self = this;
    self.formatTime = function (time) {
        return moment(time).format('LTS');
    };
    
    (self.checkIfLoginWhenRefresh = function(){
        loginService.session().then(function (res) {
            console.log(res.data);
            $rootScope.isLoggedIn = res.data;
        });
    })();
    
}]);
