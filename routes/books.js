const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books')
const validator = require('../middleware/validation')


// POST /books
router.post('/', validator.createBookRules, validator.validate, booksController.createBook);

// GET /books
router.get('/', booksController.getAllBooks);

// GET /books/:id
router.get('/:id', booksController.getBookById);

// PUT /books/:id
router.put('/:id', validator.updateBookRules, validator.validate, booksController.updateBook);

// DELETE /books/:id
router.delete('/:id', validator.idParamRule, validator.validate, booksController.deleteBook);




module.exports = router;
