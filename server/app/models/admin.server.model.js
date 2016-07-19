/**
 * Created by ZZS on 7/4/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var AdminSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    }

});

// methods ======================
// generating a hash
AdminSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
AdminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Admin', AdminSchema);