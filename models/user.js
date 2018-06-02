var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    name: {type: String, min:1, max: 15},
    age: Number,
    introduce: { type: String, max: 100},
    favorite: String,
    live: String,
});

module.exports = mongoose.model('user', user);