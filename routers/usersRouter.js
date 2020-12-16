const express = require('express');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js')

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

userRouter.route('/users/:userId/comments')
    //GET comments of an user
    .get(async (req, res) =>{
        let user = await User.findOne({_id: req.params.userId}).exec();
        if (user != null){
            let comment = await Comment.find({nick: user.nick}).exec();
            if (comment != null){
                res.status(200).jsonp({comments: comments.map(comment => {
                        return {
                            _id: comment._id,
                            commentId: comment.commentId,
                            commentary: comment.commentary,
                            score: comment.score,
                            nick: comment.nick,
                            bookId: comment.bookId
                        }
                    })});
            } else {
                res.status(404).send("Comments not found");
            }
        } else {
            res.status(404).send("User not found");
        }
        User.findOne({id: req.params.userId}, function (err, user) {

            if (user) {
                Comment.find({nick: user.nick}, function (err, comments) {
                    if (err) {
                    } else {
                        res.status(200).jsonp({comments: comments.map(comment => {
                                return {
                                    id: comment.commentId,
                                    text: comment.text,
                                    score: comment.score,
                                    bookId: comment.bookId
                                }
                            })});
                    }
                });
                res.status(200).jsonp(comment);
            } else {
                res.status(404).send("User not found");
            }
        })
    });


module.exports = userRouter;