const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
  name: String,
  master: { type: Schema.Types.ObjectId, ref: 'user' },
  joiners: [
    {
      joiner_id: { type: Schema.Types.ObjectId, ref: 'user' },
      joiner_status: Number,
    }
  ],
  capacity: {
    max_referee: Number,
    max_player: Number
  },
  start_date: { type: Date, default: Date.now },
  end_date: Date,
  introduce: String,
  event: String,
  coord: {
    lat: Number,
    lng: Number
  }
});

gameSchema.statics.create = function (body, user) {

  let game = new this();
  game.name = body.name;
  game.master = user._id;
  game.joiners = [];
  game.capacity.max_referee = body.max_referee;
  game.capacity.max_player = body.max_player;
  game.start_date = body.start_date;
  game.end_date = body.end_date;
  game.introduce = body.introduce;
  game.event = body.event;
  game.coord = user.coord;

  // return the Promise
  return game.save();
}

gameSchema.methods.verify = function (userid) {
  if (this.master === userid) return true;
  else return false;
}

gameSchema.methods.modify = function (body) {
  if (body.name) this.name = body.name;
  if (body.master) this.master = body.master;
  if (body.joiners) this.joiners = body.joiners;
  if (body.max_referee) this.capacity.max_referee = body.max_referee;
  if (body.max_player) this.capacity.max_player = body.max_player;
  if (body.start_date) this.start_date = body.start_date;
  if (body.end_date) this.end_date = body.end_date;
  if (body.introduce) this.introduce = body.introduce;
  if (body.event) this.event = body.event;
  if (body.coord) this.coord = body.coord;

  // return the Promise
  return this.save();
}

module.exports = mongoose.model('game', gameSchema);
