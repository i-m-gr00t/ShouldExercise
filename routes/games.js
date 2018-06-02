const express = require('express');
let router = express.Router();

const User = require('../models/user');
const Game = require('../models/game');

router.get('/', (req, res) => {
  Game.find()
  .then(games => {
    res.status(200).json(games);
  })
  .catch(err => {
    res.status(500).send({error: 'DB Failure'});
  });
});

router.get('/find/:_id', (req, res) => {
  Game.findOne({_id: req.params._id})
  .then(game => {
    res.status(200).json(game);
  })
  .catch(err => {
    res.status(500).send({error: 'DB Failure'});
  });
});

router.post('/', (req, res) => {
  User.findOne({id: req.body.id}, async (err, user) => {
    let game = new Game();
    game.name = req.body.name;
    game.master = user._id;
    game.joiners = null;
    game.capacity.max_referee = req.body.max_referee;
    game.capacity.max_player = req.body.max_player;
    game.start_date = req.body.start_date;
    game.end_date = req.body.end_date;
    game.introduce = req.body.introduce;
    game.event = req.body.event;
    try {
      game.coord = await Coord.findOne({_id: user.coord});
    }
    catch (err) {
      console.log(err);
    }
    game.save(err => {
      if (err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });
});

router.put('/update/:_id', (req, res) => {
  Game.findById(req.params._id, (err, games) => {
    if (req.body.name) game.name = req.body.name;
    if (req.body.master) game.master = req.body.master;
    if (req.body.joiners) game.joiners = req.body.joiners;
    if (req.body.max_referee) game.capacity.max_referee = req.body.max_referee;
    if (req.body.max_player) game.capacity.max_player = req.body.max_player;
    if (req.body.start_date) game.start_date = req.body.start_date;
    if (req.body.end_date) game.end_date = req.body.end_date;
    if (req.body.introduce) game.introduce = req.body.introduce;
    if (req.body.event) game.event = req.body.event;
    if (req.body.coord) game.coord = req.body.coord;

    games.save(err => {
      if (err) {
        console.error(err);
        res.json({result: 0});
        return;
      }
      res.json({result: 1});
    });
  });
});

router.delete('/delete/:_id', (req, res) => {
  Game.remove({_id: req.params._id}, err => {
    if (err) res.status(500).end();
    res.status(204).end();
  });
});

module.exports = router;