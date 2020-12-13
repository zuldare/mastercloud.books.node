const express = require('express');
const booksRouter = require('./booksRouter.js');
const app = express();

// Converts json bodies to JavaScript object
app.use(express.json());

app.use(booksRouter);

app.listen(3000, ()=>{
    console.log('============== App listening on port 3000! ==============');
})