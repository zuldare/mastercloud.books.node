const express = require('express');
const mongoose = require('mongoose');

const booksRouter = require('../routers/usersRouter.js');
const userRouter = require('../routers/booksRouter.js')

const User = require('../models/User.js');
const Comment = require('../models/Comment.js');
const Book = require('../models/Book.js');


const server = express();
server.use(express.json());
server.use(booksRouter);
server.use(userRouter);

const mongodbURL = "mongodb://localhost:27017/booksDB";

async function main(){

    await mongoose.connect(mongodbURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }, function (err) {
        if (err) {
            console.log("Error: connecting to Database!" + err);
        }
        server.listen(3000, () => {
            console.log('============== App listening on port 3000! ==============');
             initUsersCollection();
             initBooksCollection();
        });
    });
}

function initBooksCollection(){
    Book.deleteMany({});

    Book.create({
        "bookId": 1,
        "title": "Refactor",
        "author": "Martin Fowler",
        "summary": "Learn to refactor",
        "publishHouse": "Addison",
        "publishYear": 2003,
        comments: []
    });
}

function initUsersCollection(){
    User.deleteMany({});

    User.create({
        nick: 'Jaime',
        email: 'jaime@google.com'
    });

    User.create({
        nick: 'JohnDoe',
        email: 'johnDoe@unknown.com'
    });
}

main();

