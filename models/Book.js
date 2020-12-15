const moongoose = require('mongoose')

var bookSchema = new moongoose.Schema({
    bookId: Number,
    title: String,
    author: String,
    summary: String,
    publishHouse: String,
    publishYear: Number
}, {versionKey: false});

module.exports = moongoose.model('Book', bookSchema, 'books')