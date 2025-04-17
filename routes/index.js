const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const booksRouter = require('./books');
const reviewsRouter = require('./reviews');
const borrowsRouter = require('./borrows');

router.get('/', (req, res) => {
    res.send('Welcome To The Library Management System');
  }); 

router.use('/users', usersRouter);
router.use('/books', booksRouter);
router.use('/reviews', reviewsRouter);
router.use('/borrows', borrowsRouter);

module.exports = router;
