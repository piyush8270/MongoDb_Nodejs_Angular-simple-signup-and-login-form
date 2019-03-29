var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDetails = new Schema({
    firstname: {type: String, required: true},
    mobile: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true,unique: true}
});

module.exports = mongoose.model('User', userDetails);