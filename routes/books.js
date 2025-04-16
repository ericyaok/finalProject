const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books')


// POST /books
router.post('/', booksController.createBook);

// GET /books
router.get('/', booksController.getAllBooks);

// GET /books/:id
router.get('/:id', booksController.getBookById);

// PUT /books/:id
router.put('/:id', booksController.updateBook);

// DELETE /books/:id
router.delete('/:id', booksController.deleteBook);




module.exports = router;
