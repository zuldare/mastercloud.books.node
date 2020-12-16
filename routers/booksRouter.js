const express = require('express');
const Book = require('../models/Book.js');
const Comment = require('../models/Comment.js');
// const User = require('../models/User.js');

let bookRouter = express.Router();


async function findBooks(){
    const books = await Book.find().exec();
    let booksResult = books.map( book => book.toObject());
    console.log(booksResult);
    return booksResult;
}

async function getMaxBookId(){
    const bookMax = await Book.find().sort({bookId:-1}).limit(1);
    if (bookMax[0]){
        return bookMax[0].bookId + 1;
    }
    return 1;
}

async function getMaxCommentId(){
    const commentMax = await Book.find().sort({commentId:-1}).limit(1);
    if (commentMax[0]){
        return commentMax[0].commentId +1;
    }
    return 1;
}

async function findComments(){
    const comments = await Comment.find().exec();
    return comments.map(comment => comment.toObject());
}


bookRouter.route('/books')
    //GET ALL BOOKS
    .get( async (req, res) => {
        res.status(200).jsonp(await findBooks());
    })
    // CREATE NEW BOOK
    .post( async(req, res) =>{
         let maxBookId = await getMaxBookId();
         let newBook = new Book({
             bookId: maxBookId,
             title: req.body.title,
             author: req.body.author,
             summary: req.body.summary,
             publishHouse: req.body.publishHouse,
             publishYear: req.body.publishYear
         })
         newBook = await newBook.save();
         res.status(201).jsonp(newBook);
    });


bookRouter.route('/books/:bookId')
    //GET A BOOKS BY bookId
    .get( async (req, res) => {
       let book = await Book.findOne({bookId: req.params.nick}).exec();
        if (!book){
            res.status(404).send('Book not found');
        } else {
            let comments = await Comment.find({bookId: req.params.bookId}).exec();
            if (comments != null){
                book.comments = comments;
                let bookResponse = {
                    bookId: book.bookId,
                    title: book.title,
                    summary: book.summary,
                    author: book.author,
                    publishHouse: book.publishHouse,
                    publishYear: book.publishYear,
                    comments: book.comments.map(comment => {
                        return {
                            commentary: comment.commentary,
                            nick: comment.nick,
                            email: comment.email
                        }
                    })
                }
                return res.status(200).jsonp(bookResponse);
            } else {
                res.status(200).jsonp(book);
            }
        }
    });


bookRouter.route('/comments')
    .get( async (req, res)=>{
        res.status(200).jsonp(await findComments());
    });

bookRouter.route("/books/:bookId/comments")
    //POST NEW COMMENT
    .post(async (req, res) => {
        let book = await Book.findOne({bookId: req.params.bookId}).exec();
        if(!book){
            res.status(404).send('Book not found');
        } else {
            let maxCommentId = await getMaxCommentId();
            let newComment = new Comment({
                commentId: maxCommentId,
                commentary: req.body.commentary,
                score: req.body.score,
                bookId: req.params.bookId,
                nick: req.body.nick,
                email: req.body.email
            })
            newComment = await newComment.save();
            res.status(201).jsonp(newComment);
        }
    })

bookRouter.route("/books/:bookId/comments/:commentId")
    //DELETE COMMENT OF A BOOK
    .delete(async (req, res) => {
        let book = await Book.findOne({bookId: req.params.bookId}).exec();
        if(!book){
            res.status(404).send('Book not found');
        } else {
            let comment = await Comment.findOne({commentId: req.params.commentId}).exec();
            if (comment != null){
                await comment.delete();
                res.status(200).jsonp(comment);
            } else {
                res.status(404).send("Comment not found");
            }
        }
    });

module.exports = bookRouter;