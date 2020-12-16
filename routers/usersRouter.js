const express = require('express');
const User = require('../models/User.js');
const userRouter = express.Router();


async function findUsers(){
    const users = await User.find().exec();
    let usersResult = users.map( user => {
       return user.toObject();
    });
    console.log(usersResult);
    return usersResult;
}


userRouter.route('/users')
    .get(async (req, res) => {
        res.status(200).json(await findUsers());
    })
    .post(async(req, res) => {
        let user = await User.findOne({nick: req.body.nick}).exec();
        if (!user){
            user = new User({
                nick: req.body.nick,
                email: req.body.email
            });
            await user.save();
            res.status(201).json(user);
        } else {
            res.status(500).send('User already exists');
        }
    });

userRouter.route('/users/:nick')
    .get(  async (req, res) =>{
        let user = await User.findOne({nick: req.params.nick}).exec();
        if (!user){
            res.status(404).send('User not found');
        } else {
            res.status(200).json(user.toObject());
        }
    });

userRouter.route('/users/:userId')
    .patch(async (req, res) =>{
        let user = await User.findOneAndUpdate({_id: req.params.userId}, {$set: {email: req.body.email}})
        if (!user){
            res.status(404).send('User not found')
        } else {
            res.status(200).json(user);
        }

    })

    .delete(async (req, res) => {
        let user = await User.findOne({_id: req.params.userId}).exec();
        if (!user){
            res.status(404).send('User not found');
        } else {
            // TODO check if user have comments
            User.deleteOne({_id: req.params.userId}, function (error) {
                if(error){
                    res.status(500).send();
                }
                res.status(200).send('User deleted');
            })
        }
    });

module.exports = userRouter;