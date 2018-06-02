const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  id: String,
  password: String,
  name: String,
  age: Number,
  introduce: String,
  favorite: String,
  coord: {
    lat: Number,
    lng: Number
  }
});

userSchema.statics.create = function (body) {
  let coord = { };
  coord.lat = body.lat;
  coord.lng = body.lng;

  let user = new this();
  user.id = body.id;
  user.password = body.password;
  user.name = body.name;
  user.age = parseInt(body.age);
  user.favorite = body.favorite;
  user.introduce = body.introduce;
  user.live = body.live;
  user.coord = coord;

  // return the Promise
  return user.save();
}

userSchema.statics.findOneByUserID = function (userid) {
  return this.findOne({ id: userid }).exec();
}

userSchema.methods.verify = function (password) {
  if (this.password === password) return true;
  else return false;
}

userSchema.methods.modify = function (body) {
  if (body.password) this.password = body.password;
  if (body.name) this.name = body.name;
  if (body.age) this.age = parseInt(body.age);
  if (body.introduce) this.introduce = body.introduce;
  if (body.favorite) this.favorite = body.favorite;
  if (body.coord) this.coord = body.coord;

  return this.save();
}

module.exports = mongoose.model('user', userSchema);