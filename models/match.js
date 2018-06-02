var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var match = new Schema({
    master: { type: Schema.Types.ObjectId, ref: 'user' },
    join: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    startdate: Date,
    enddate: Date,
    introduce: String,
    event: String,
});

module.exports = mongoose.model('match', match);