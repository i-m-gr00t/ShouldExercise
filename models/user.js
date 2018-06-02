const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  id: String,
  password: String,
  name: String,
  age: Number,
  introduce: String,
  favorite: String,
  coord: {type: Schema.Types.ObjectId, ref: 'coord'}
});

module.exports = mongoose.model('user', userSchema);