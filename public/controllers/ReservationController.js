/**
* Created by ZZS on 6/25/16.
*/
app.controller('ReservationController', ['$rootScope', 'reserveService', '$location', '$timeout', function ($rootScope, reserveService, $location, $timeout) {
    var self = this;
    self.guest = {};
    self.list = [];
    
    //set search id and jump to edit page
    self.setSearchId = function (id) {
        $rootScope.searchId = id;
        $location.path('/editReservation');

    };
    
    //update form
    self.update = function () {
        reserveService.update(self.current).then(function (data) {
            console.log('update success:' , data.valueOf());
            self.updateSuccessInfo = 'success';
            $timeout(function () {
                self.updateSuccessInfo = '';
            }, 3000);
        })
    };

    //remove item
    self.del = function (id) {
        if(confirm('are you sure?')){
            reserveService.del(id).then(function (data) {
                console.log('delete success:' , data.valueOf());
                self.loadReservations();
            });
        }
    };

    //post form ------ do reservation
    self.reserve = function () {
        self.guest.partySize = self.guest.partySize || 1;
        self.guest.guestPhone = self.guest.guestPhone || '0000000000';
        self.guest.special = self.guest.special || 'normal';

        reserveService.reserve(self.guest).then(function (data) {
            console.log(data);

            self.current = data;
            $('#modal-success-info').modal('show');
            $location.path('/');//todo:can't redirect, even put before alert
        });
    };

    self.pageAmount_scope = 0;
    self.pageSize_scope = 7;
    self.pageCurrent_scope = 1;
    
    self.countPage = function () {
        reserveService.count().then(function (count) {
            self.pageAmount_scope = Math.ceil(count/self.pageSize_scope);
            // console.log('reservationcontroller countpage():'+ self.pageAmount_scope)
        });
    };
    self.countPage();

    //so i can use number as a collection in ng-repeat
    self.range = function (num) {
        return new Array(num);
    };
    
    self.setCurrentPage = function (num) {
        self.pageCurrent_scope = num;
        self.loadReservations();
    };

    //load all reservations list
    self.loadReservations = function () {
        var pageParams = {
            pageSize: self.pageSize_scope,
            pageCurrent: self.pageCurrent_scope
        };

        reserveService.list(pageParams).then(function (data) {
            // console.log(data);
            self.list = data;
        },function (err) {
            
        })
    };
    self.loadReservations();
    // self.list = reserveService.list();

    self.openDetail = function (id) {
        self.loadDetail(id);
        $('#modal-detail').modal('show');
    };

    self.loadDetail = function(id) {
        console.log('start going in db');
        reserveService.detail(id).then(function (data) {
            self.current = data;
            console.log(self.current)
        }, function (err) {
            console.log(err)
        });
    };

    self.formatTime = function (time) {
        return moment(time).format('LTS');
    };
}]);
