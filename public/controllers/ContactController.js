/**
 * Created by ZZS on 7/13/16.
 */
app.controller('ContactController', ['$resource', function ($resource) {
    var self = this;
    // self.contacts = [];
    //
    // self.loadContacts = function () {
    //     contactService.find().then(function (data) {
    //         console.log(data.data);
    //         self.contacts = data.data;
    //     })
    // };
    //
    // self.loadContacts();
    //
    // self.create = function (newContact) {
    //     contactService.create(newContact).then(function (data) {
    //         self.newContact = {};
    //         self.loadContacts();
    //     })
    // };

    // $resource is higher level of $http, encapsulate all, don't need to inject service
    //resource object url should work for all method (get post delete)
    var resourceObj = $resource('/api/contact/:id');
    
    function loadContacts() {
        self.contacts = resourceObj.query();
    }
    loadContacts();
    
    self.create = function () {
        resourceObj.save(self.newContact, function () {
            self.newContact = {};
            loadContacts();
        })
    };

    self.delete = function (id) {
        resourceObj.remove({id: id}, function () {
            loadContacts();
        })
    }
    


}]);