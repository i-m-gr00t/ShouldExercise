const express = require('express');
let router = express.Router();

const User = require('../models/user');
const Coord = require('../models/coord');

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).send({ error: 'DB Failure' });
    });
});

router.get('/find/:_id', (req, res) => {
  User.findOne({ _id: req.params._id })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).send({ error: 'DB Failure' });
    });
});

router.post('/', (req, res) => {
  let coord = new Coord();
  coord.lat = req.body.lat;
  coord.lng = req.body.lng;
  coord.save(err => {
    if (err) return;
  });

  Coord.findOne({ lat: req.body.lat, lng: req.body.lng }, (err, coord) => {
    if (err) return res.status(500).json({ error: err });
    if (!coord) return res.status(404).json({ error: 'Not Found' });
    let user = new User();
    user.id = req.body.id;
    user.password = req.body.password;
    user.name = req.body.name;
    user.age = parseInt(req.body.age);
    user.favorite = req.body.favorite;
    user.introduce = req.body.introduce;
    user.live = req.body.live;
    user.coord = coord._id;
    user.save(err => {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  });
});

router.put('/update/:_id', (req, res) => {
  User.findById(req.params._id, (err, users) => {
    if (err) return res.status(500).json({ error: err });
    if (!URLSearchParams) return res.status(404).json({ error: 'Not Found' });

    if (req.body.id) user.id = req.body.id;
    if (req.body.password) user.password = req.body.password;
    if (req.body.name) user.name = req.body.name;
    if (req.body.age) user.age = parseInt(req.body.age);
    if (req.body.favorite) user.favorite = req.body.favorite;
    if (req.body.introduce) user.introduce = req.body.introduce;
    if (req.body.live) user.live = req.body.live;

    user.save(err => {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  });
});

router.delete('/delete/:_id', (req, res) => {
  User.remove({ _id: req.params._id }, err => {
    if (err) res.status(500).end();
    res.status(204).end();
  });
});

router.post('/login', (req, res) => {
  let id = req.body.id;
  let pw = req.body.password;

  User.findOne({ id: id, password: pw })
    .then(user => {
      res.status(200).json(user._id);
    })
    .catch(err => {
      res.status(500).json({ error: 'DB Failure' });
    });
});

router.post('/register', (req, res) => {
  let body = req.body;
  let user = { };

  User.findOne({id: req.body.id})
    .then(() => {
      res.status(200).json({message : "id was already taken"});
    })
    .catch(err => {
      res.status(500).json({ error: 'DB Failure' });
    });

  if (req.body.id) user.id = req.body.id;
  if (req.body.password) user.password = req.body.password;
  if (req.body.name) user.name = req.body.name;
  if (req.body.age) user.age = parseInt(req.body.age);
  if (req.body.favorite) user.favorite = req.body.favorite;
  if (req.body.introduce) user.introduce = req.body.introduce;
  if (req.body.live) user.live = req.body.live;

  if (req.body.id && req.body.password && req.body.name) {
    res.status(200).json({error : 'Invalid input!'});
  }

  let _user = new User({
    id : user.id,
    password : user.password,
    name : user.name,
    age : user.age,
    favorite : user.favorite,
    introduce : user.introduce,
    live : user.live
  });

  _user.save(err => {
    if (err) {
      console.error(err);
      res.status(500).json({ result: 0 });
      return;
    }
    res.json({ result: 1 });
  });
});

module.exports = router;