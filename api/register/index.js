const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const User = require('../../models/user')
console.log("23");
router.post('/', (req,res) => {
    console.log('/router');
    const name = req.body.name;
    const age = req.body.age;
    const introduce = req.body.introduce;
    const favorite = req.body.favorite;
    const live = req.body.live;
    console.log(name);
    var user = new User({
        name,
        age,
        introduce,
        favorite,
        live,
    }); 
    user.save(function (err) {
        if(err) {
            console.log(err);
            return res.status(400);
        }
        return res.status(200).end();
    })
});
module.exports = router;