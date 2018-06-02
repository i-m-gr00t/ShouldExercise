const express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const User = require('../models/user');
const Coord = require('../models/coord');

router.use('/', authMiddleware);

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).send({ error: 'DB Failure' });
    });
});

router.get('/find', (req, res) => {
  User.findOne({ id: req.decoded.id })
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(500).send({ error: 'DB Failure' });
    });
});

/*
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
*/

router.put('/update', (req, res) => {
  const modify = (user) => {
    if (!user) {
      throw new Error('User Not found');
    }

    return User.modify(req.body);
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
router.post('/', (req, res) => {
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

router.delete('/delete', (req, res) => {
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
      if (user.verify(password)) {
        jwt.sign(
          {
            _id: user._id,
            id: user.id,
            name: user.name
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'velopert.com',
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