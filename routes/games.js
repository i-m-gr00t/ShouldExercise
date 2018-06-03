const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const User = require('../models/user');
const Game = require('../models/game');

router.get('/admin', (req, res) => {
  Game.find()
    .then(games => {
      res.status(200).json(games);
    })
    .catch(err => {
      res.status(500).json({ error: 'DB Failure' });
    });
});

router.get('/', authMiddleware, (req, res) => {
  User.findOneByUserID(req.decoded._id)
  .then(user => {
    return Game.find({master: req.decoded._id});
  })
  .then(games => {
    return res.status(200).json(games);
  })
  //.catch(err => {
  //  res.status(500).json({ error: 'DB Failure' });
  //});
});

router.get('/:_id', (req, res) => {
  Game.findOne({ _id: req.params._id })
    .then(game => {
      res.status(200).json(game);
    })
    .catch(err => {
      res.status(500).json({ error: 'DB Failure' });
    });
});

// 게임 등록
router.post('/', authMiddleware, (req, res) => {
  const create = (user) => {
    if (!user)
      throw new Error('DB Not Found');

    return Game.create(req.body, user);
  }

  const respond = () => {
    return res.status(200).json({ result: 1 });
  }

  const onError = (error) => {
    res.status(500).json({ success: false, message: error.message });
  }

  User.findOneByUserID(req.decoded.id)
    .then(create)
    .then(respond)
    .catch(onError);
});

// 게임 수정
router.put('/:_id', authMiddleware, (req, res) => {
  const modify = (game) => {
    if (!game)
      throw new Error('DB Not Found!');

    if (!game.verify(req.decoded._id))
      throw new Error('Access denied');

    return game.modify(req.body);
  }

  const respond = () => {
    return res.status(200).json({ result: 1 });
  }

  const onError = (error) => {
    res.status(500).json({ success: false, message: error.message });
  }

  Game.findById(req.params._id)
    .then(modify)
    .then(respond)
    .catch(onError);
});

// 게임 삭제
router.delete('/:_id', authMiddleware, (req, res) => {
  if (!game.verify(req.decoded._id))
    return res.status(500).json({ success: false, message: error.message });
  
  else
    Game.remove({ _id: req.params._id }, err => {
      if (err) res.status(500).end();
      res.status(204).end();
    });
});

module.exports = router;