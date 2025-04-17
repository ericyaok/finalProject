const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books')
const validator = require('../middleware/validation')
const { ensureAuthenticated } = require('../middleware/authenticate');


// POST /books
router.post('/', validator.createBookRules, validator.validate, booksController.createBook);

// GET /books
router.get('/', booksController.getAllBooks);

// GET /books/:id
router.get('/:id', booksController.getBookById);

// PUT /books/:id
router.put('/:id', ensureAuthenticated, validator.updateBookRules, validator.validate, booksController.updateBook);

// DELETE /books/:id
router.delete('/:id', ensureAuthenticated,  validator.idParamRule, validator.validate, booksController.deleteBook);


module.exports = router;
