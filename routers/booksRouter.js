const express = require('express');
const User = require('../models/User.js');
const router = express.Router();

router.route('/users')
    .get((req, res) => {
        User.find((error, users) => {
            if (error){
                console.log("==== ERROR ====> GET /users");
                res.status(404).send(error.message);
            }
            console.log("====> GET /users");
            res.status(200).jsonp(users);
        })
    });

router.route('/users/:nick')
    .get((req, res) => {
        User.findOne({nick: req.params.nick}, function (error, user){
            if (error){
                res.status(500).send("Bad request");
            }
            if (user){
                res.status(201).jsonp(user);
            } else {
                res.status(404).send("User not found");
            }
        })
    })
    .delete((req, res) => {
        User.findOne({nick: req.params.nick}, function (error, user){
            if (error){
                res.status(500).send("Bad request");
            }
            if (user){
                User.deleteOne({nick: req.params.nick}, function (error, user){
                    if (error) {
                        res.status(500).send("Bad request");
                    }
                })
                res.status(200).jsonp(user);
            } else {
                res.status(404).send("User not found");
            }
        })
        }
    );



module.exports = router;