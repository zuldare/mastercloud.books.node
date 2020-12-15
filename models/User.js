const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: Number,
    nick: String,
    email: String,
}, {versionKey: false});


module.exports = mongoose.model('User', userSchema, 'users');