const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const booksRouter = require('./books');

router.get('/', (req, res) => {
    res.send('Welcome To The Library Management System');
  }); 

router.use('/users', usersRouter);
router.use('/books', booksRouter);

module.exports = router;
