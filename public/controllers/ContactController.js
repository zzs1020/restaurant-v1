/**
 * Created by ZZS on 7/13/16.
 */
app.controller('ContactController', ['contactService', function (contactService) {
    var self = this;
    self.contacts = [];

    self.loadContacts = function () {
        contactService.find().then(function (data) {
            console.log(data.data);
            self.contacts = data.data;
        })
    };

    self.loadContacts();
    
    self.create = function (newContact) {
        contactService.create(newContact).then(function (data) {
            self.newContact = {};
            self.loadContacts();
        })
    }
}]);