const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/User.js');
const server = express();
server.use(express.json());

const booksRouter = require('../routers/booksRouter.js');
server.use(booksRouter);

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
            initDatabase()
        });
    });
}

function initDatabase(){
    User.deleteMany({}, function(err) {
        if (err) {
            console.log(err)
        }
    });

    User.create({
        id: 1,
        nick: 'Jaime',
        email: 'jaime@google.com'
    });

    User.create({
        id: 2,
        nick: 'JohnDoe',
        email: 'johnDoe@unknown.com'
    });
}

main();

