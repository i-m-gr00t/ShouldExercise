const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  id: String,
  password: String,
  name: String,
  age: Number,
  introduce: String,
  favorite: String,
  coord: { type: Schema.Types.ObjectId, ref: 'coord' }
});

userSchema.statics.create = function (body) {
  let coord = new Coord();
  coord.lat = req.body.lat;
  coord.lng = req.body.lng;

  coord.save(err => {
    if (err) throw new Error('DB Error');
  });

  let user = new User();
  user.id = body.id;
  user.password = body.password;
  user.name = body.name;
  user.age = parseInt(body.age);
  user.favorite = body.favorite;
  user.introduce = body.introduce;
  user.live = body.live;

  Coord.findOne({ lat: req.body.lat, lng: req.body.lng }, (err, coord) => {
    if (err) throw new Error('DB Error');
    if (!coord) throw new Error('DB Not Found');
    user.coord = coord._id;
  });

  // return the Promise
  return user.save();
}

userSchema.statics.findOneByUserID = function (userid) {
  return this.findOne({ id: userid }).exec();
}

userSchema.methods.verify = function (password) {
  return this.password === password;
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