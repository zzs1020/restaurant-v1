/**
 * Created by ZZS on 7/13/16.
 */
app.controller('ProfileController', ['profileService', '$timeout', function (profileService, $timeout) {
    var self = this;
    self.profile = {};
    
    self.loadProfile = function () {
        profileService.find().then(function (data) {
            console.log(data.data[0]);
            self.profile = data.data[0];
        });
    };
    
    self.loadProfile();
    
    self.updateProfile = function (data) {
        profileService.update(data).then(function () {
            console.log('hello');
            self.successUpdate = 'update success!';
            $timeout(function () {
                self.successUpdate = '';
            }, 2000);

        });
    }
}]);