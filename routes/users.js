const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');

/* import models */
const User = require('../models/user');

router.get('/admin', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).send({ error: 'DB Failure' });
    });
});

router.get('/', authMiddleware, (req, res) => {
  User.findOne({ id: req.decoded.id })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(500).send({ error: 'DB Failure' });
    });
});

router.put('/', authMiddleware, (req, res) => {
  const modify = (user) => {
    if (!user) {
      throw new Error('User Not found');
    }

    return user.modify(req.body);
  }

  const respond = () => {
    res.status(200).json({ result: 1 });
  }

  const onError = (error) => {
    res.status(500).json({ success: false, message: error.message });
  }

  User.findOneByUserID(req.decoded.id)
    .then(modify)
    .then(respond)
    .catch(onError);
});

/* Register */
router.post('/register', (req, res) => {
  const create = (user) => {
    if (user) {
      throw new Error('user id was already taken');
    } else {
      return User.create(req.body);
    }
  }

  const respond = () => {
    return res.status(200).json({ result: 1 });
  }

  const onError = (error) => {
    res.status(500).json({ success: false, message: error.message });
  }

  User.findOneByUserID(req.body.id)
    .then(create)
    .then(respond)
    .catch(onError);
});

router.delete('/', authMiddleware, (req, res) => {
  User.remove({ _id: req.decoded._id }, err => {
    if (err) res.status(500).end();
    res.status(204).end();
  });
});

/* Login */
router.post('/login', (req, res) => {
  const id = req.body.id;
  const pw = req.body.password;

  const secret = req.app.get('jwt-secret');

  User.findOneByUserID(id)
    .then(user => {
      if (user.verify(pw)) {
        jwt.sign(
          {
            _id: user._id,
            id: user.id,
            name: user.name
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'weshouldexercise.oa.to',
            subject: 'userInfo'
          },
          (err, token) => {
            if (err) return res.status(500).json(
              { success: false, message: 'DB Failed!' }
            );
            res.status(200).json({ result: token });
          }
        );
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'DB Failed!' });
    });
});

module.exports = router;