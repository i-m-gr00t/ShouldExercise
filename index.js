const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const api = require('./api');

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/shouldexercise');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(api.route());

// [CONFIGURE SERVER PORT]
var port = 3000;


// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});
module.exports = app; 