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

router.post('/', (req, res) => {
  let coord = new Coord();
  coord.lat = req.body.lat;
  coord.lng = req.body.lng;
  coord.save(err => {
    if (err) {
      console.error(err);
      res.json({result: 0});
      return;
    }
    res.json({result: 1});
  });
});

module.exports = router;