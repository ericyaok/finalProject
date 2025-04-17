const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const booksRouter = require('./books');
const reviewsRouter = require('./reviews');
const borrowsRouter = require('./borrows');

/* router.get('/', (req, res) => {
  res.send('Welcome To The Library Management System');
});
 */

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    // User is logged in
    res.send(`Logged in as ${req.user.username} Welcome To The Library Management System`);  // Or use req.user.displayName or any other GitHub profile field
  } else {
    // User is not logged in
    res.send('Logged Out');
  }
});

router.use('/users', usersRouter);
router.use('/books', booksRouter);
router.use('/reviews', reviewsRouter);
router.use('/borrows', borrowsRouter);

module.exports = router;
