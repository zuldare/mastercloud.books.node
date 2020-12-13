const express = require('express');
const url = require('url');

const router = express.Router();

const STATUS_404 = 404;
const books = new Map();
const users = new Map();
const comments = new Map();

function fullUrl(req) {
    const fullUrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });

    return fullUrl + (fullUrl.endsWith('/')?'':'/');
}


function validUser(user) {
    return typeof user.nick == 'string'
        && typeof user.email == 'string';
}

// function validComment(comment){
//     return typeof comment.score == 'number'
//            && typeof comment.commentary == 'string'
//            && typeof comment.nick == 'string'
//            && typeof comment.bookId == 'number';
// }
//
// function validBook(book){
//     return typeof book.title == 'string'
//            && typeof book.author == 'string'
//            && typeof book.summary == 'string'
//            && typeof book.publishingHouse == 'string'
//            && typeof publishYear == 'number';
// }


/* ======== USERS  API RELATED ENDPOINTS ========== */
router.route('/users')
    .get((req, res) => {
        res.json([...users.values()]);
    })
    .post((req, res) => {
        if (!validUser(req.body)){
            res.sendStatus(STATUS_404);
        } else {
            let user = {
                id,
                nick: req.body.nick,
                email: req.body.email
            };

            //TODO saveUser(user)
            res.location(fullUrl(req) + user.id);
            res.json(user);
        }
    });

// router.patch('/users/:id', (req, res) => {
//         const userId = req.params.id;
//         const user = users.get(userId);
//         if (!user){
//             res.sendStatus(STATUS_404);
//         } else {
//             if (!validUser(req.body)){
//                 res.sendStatus(STATUS_404);
//             } else {
//                 let newUser = {
//                     id,
//                     nick: req.body.nick,
//                     email: req.body.email
//                 };
//             }
//         }
//     });
//
// router.delete('/users/:id', (req, res) => {
//         const userId = req.params.id;
//         const user = users.get(userId);
//         if (!user) {
//             res.sendStatus(STATUS_404);
//         } else {
//             users.delete(userId);
//             res.json(user);
//         }
//     });
//
// router.get('/users/:id', ((req, res) => {
//     const userId = req.params.id;
//     const user = users.get(userId);
//     if (!user){
//         res.sendStatus(STATUS_404);
//     } else {
//         res.json(user);
//     }
// }))
//
//
// /* ======== Books  API RELATED ENDPOINTS ========== */
// router.route('/books')
//     .get((req, res) => {
//         res.json([...books.values()]);
//     })
//     .post((req, res) => {
//         //TODO
//     });
//
// router.get('/books/:id', (req, res) => {
//     const bookId = req.params.id;
//     const book = books.get(bookId);
//     if (!book) {
//         res.sendStatus(STATUS_404);
//     } else {
//        res.json(book);
//     }
// })
//
// /* ======== Comments API RELATED ENDPOINTS ========== */
// router.get('/books/:id/comments', (req, res) => {
//     // const bookId = req.params.id;
//     // const book = books.get(bookId);
//     // if (!book) {
//     //     res.sendStatus(STATUS_404);
//     // } else {
//     //     res.json(book);
//     // }
//     // TODO
// })
//
// router.delete('/comments/:id', (req, res) => {
//     const commentId = req.params.id;
//     const comment = comments.get(commentId);
//     if (!comment) {
//         res.sendStatus(STATUS_404);
//     } else {
//         comments.delete(commentId);
//         res.json(comment);
//     }
// })
//
// router.get('/comments', (req, res) => {
//     res.json([...comments.values()]);
// });


module.exports = router;