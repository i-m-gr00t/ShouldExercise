const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let coordSchema = new Schema({
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('coord', coordSchema);