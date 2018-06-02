const express = require('express');
let router = express.Router();

const Coord = require('../models/coord');

router.get('/', (req, res) => {
  Coord.find()
  .then(coords => {
    res.status(200).json(coords);
  })
  .catch(err => {
    res.status(500).send({error: 'DB Failure'});
  });
});

router.get('/find/:_id', (req, res) => {
  Coord.findOne(req.body._id)
  .then(coords => {
    res.status(200).json(coords);
  })
  .catch(err => {
    res.status(500).send({error: 'DB Failure'});
  });
});

module.exports = mongoose.model('coord', coordSchema);