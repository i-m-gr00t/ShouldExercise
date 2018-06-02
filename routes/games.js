const express = require('express');
let router = express.Router();

const User = require('../models/user');
const Game = require('../models/game');
const Coord = require('../models/coord');

router.get('/', (req, res) => {
  Match.find()
  .then(() => {
    res.status(200).json();
  })
  .catch(err => {
    res.status(500).send({error: 'DB Failure'});
  });
});

router.get('/', )

module.exports = router;