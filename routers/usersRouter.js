const express = require('express');
const User = require('../models/User.js');
const router = express.Router();


async function findUsers(){
    const users = await User.find().exec();
    let usersResult = users.map( user => {
       return user.toObject();
    });
    console.log(usersResult);
    return usersResult;
}

async function findUserByNick(nickRequested){
    const user = await User.findOne({nick:nickRequested}).exec();
    return user.toObject();
}

async function deleteUserByNick(nickRequested){
    await User.deleteOne({nick:nickRequested}).exec();
}

async function saveUser(user){
    await user.save();
}

function isUndefined(element){
    return typeof element === "undefined";
}

function isUserValid(user){
    return typeof user.nick === "string"
           && typeof user.email === "string";
}
router.route('/users')
    .get(async (req, res) => {
        res.status(200).jsonp(await findUsers());
    })
    .post(async (req, res) => {
        if (!isUserValid(req.body)){
            res.sendStatus(400);
        } else {
            const user = new User({
                nick: req.body.nick,
                email: req.body.email
            });
            await saveUser(user);
            res.status(201).jsonp(user);
        }
    })
;

router.route('/users/:nick')
    .get(  async (req, res) =>{
       res.status(200).jsonp(await findUserByNick(req.params.nick));
    })
    .delete(async (req, res)=>{
        let user = await findUserByNick(req.params.nick);
        if (isUndefined(user)){
            res.status(404).send('User not found');
        } else {
            res.status(200).send('User deleted');
        }
    })
;



// router.route('/users')
//
//     //POST new users
//     .post(function (req, res) {
//         User.findOne({nick: req.body.nick}, function (err, user) {
//             if (err) {
//                 res.status(500).send("This book doesn't exist.");
//             }
//
//             if (!user) {
//                 User.countDocuments(function (err, count) {
//                     if (err) {
//                         console.log("Cannot count docs");
//                     }
//                     var userId = count + 1;
//                     const user = new User({
//                         userId: userId,
//                         nick: req.body.nick,
//                         email: req.body.email,
//                     });
//                     user.save(function (err, user) {
//                         if (err) {
//                             res.status(500).send(err.message);
//                         }
//                         res.status(200).jsonp(user);
//                     })
//                 })
//             } else {
//                 res.status(500).send("This user already exists.");
//             }
//         });
//     });


// router.route('/users/:nick')
//     .get((req, res) => {
//         User.findOne({nick: req.params.nick}, function (error, user){
//             if (error){
//                 res.status(500).send("Bad request");
//             }
//             if (user){
//                 res.status(201).jsonp(user);
//             } else {
//                 res.status(404).send("User not found");
//             }
//         })
//     })
//     .delete((req, res) => {
//         User.findOne({nick: req.params.nick}, function (error, user){
//             if (error){
//                 res.status(500).send("Bad request");
//             }
//             if (user){
//                 User.deleteOne({nick: req.params.nick}, function (error, user){
//                     if (error) {
//                         res.status(500).send("Bad request");
//                     }
//                 })
//                 res.status(200).jsonp(user);
//             } else {
//                 res.status(404).send("User not found");
//             }
//         })
//         }
//     );



module.exports = router;