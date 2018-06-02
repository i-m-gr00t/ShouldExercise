const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let gameSchema = new Schema({
  name: String,
  master: {type: Schema.Types.ObjectId, ref: 'user'},
  joiners: [
    {
      joiner_id: {type: Schema.Types.ObjectId, ref: 'user'},
      joiner_status: Number,
    }
  ],
  capacity: {
    max_referee: Number,
    max_player: Number
  },
  start_date: {type: Date, default: Date.now},
  end_date: Date,
  introduce: String,
  event: String,
  coord: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('game', gameSchema);
