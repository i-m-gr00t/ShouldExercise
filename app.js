const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const MONGO_URL = "18.188.37.173:27017";

let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("MongoDB Connected");
});
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_URL}/shouldexercise`);

let usersRouter = require('./routes/users');
let gamesRouter = require('./routes/games');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
