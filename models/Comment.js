const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    commentId: Number,
    commentary: Number,
    score: Number,
    bookId: Number,
    nick: String,
    email: String
}, {versionKey: false});

module.exports = mongoose.model('Comment', commentSchema, 'comments')