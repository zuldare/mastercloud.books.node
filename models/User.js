// const mongoose = require('mongoose')
// let Schema = mongoose.Schema;
//
// let userSchema = new Schema({
//     id: Number,
//     nick: {
//         type: String,
//         required: [true, 'Nick required']
//     },
//
//     email: {
//         type: String,
//         required: [true, 'Email required']
//     }
// }, {versionKey: false});
//
// module.exports = mongoose.model('User', userSchema, );


const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    id: Number,
    nick: String,
    email: String,
}, {versionKey: false});

//Definimos el modelo y el esquema
module.exports = mongoose.model('User', userSchema, 'users');