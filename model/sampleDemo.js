var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sampledemo = new Schema({
    name: {type: String, required: true},
    company: {type: String, required: true},
    address: {type: String, required: true}
    
});

module.exports = mongoose.model('sampledemo', sampledemo);