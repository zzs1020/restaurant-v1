/**
 * Created by ZZS on 7/2/16.
 */
app.controller('LoginController', ['loginService', '$location', function (loginService, $location) {
    var self = this;
    self.user = {};
    self.dataLoading = false;

    self.login = function(){
        self.dataLoading = true;
        loginService.login(self.user).then(function (res) {
            //here can't get res because already used res in loginService
            self.dataLoading = false;
            $location.path('/reservationList');
        });

        
    }

}]);