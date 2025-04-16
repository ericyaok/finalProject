const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books')
const validate = require('../middleware/validation')


// POST /books
router.post('/', validate.createBookRules, validate.validate, booksController.createBook);

// GET /books
router.get('/', booksController.getAllBooks);

// GET /books/:id
router.get('/:id', booksController.getBookById);

// PUT /books/:id
router.put('/:id', validate.updateBookRules, validate, booksController.updateBook);

// DELETE /books/:id
router.delete('/:id', validate.idParamRule, validate, booksController.deleteBook);




module.exports = router;
