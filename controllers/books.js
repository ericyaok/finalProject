const { getDatabase } = require('../data/database'); // Correct import
const { ObjectId } = require('mongodb'); // Destructure ObjectId


const getAllBooks = async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.collection('books').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving books' });
    }
};

const getBookById = async (req, res) => {
    try {
        const db = getDatabase();
        const bookId = ObjectId.createFromHexString(req.params.id);

        const result = await db.collection('books').findOne({ _id: bookId});

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving the book' });
    }
};

const createBook = async (req, res) => {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear,
            isbn: req.body.isbn,
            copiesAvailable: req.body.copiesAvailable
        };
        
        const db = getDatabase();
        const response = await db.collection('books').insertOne(book);

        if (response.acknowledged) {
            return res.status(204).send();
        }

        throw new Error('Book creation failed');

    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: error.message || 'An error occurred while creating the book' });
    }
};

const updateBook = async (req, res) => {
    try {
        const bookId = ObjectId.createFromHexString(req.params.id);
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear,
            isbn: req.body.isbn,
            copiesAvailable: req.body.copiesAvailable
        };
        
        const db = getDatabase();
        const response = await db.collection('books').replaceOne({ _id: bookId }, book);

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        }

        throw new Error('No book was updated. The provided ID may not exist.');

    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: error.message || 'An error occurred while updating the book' });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookId = ObjectId.createFromHexString(req.params.id);
        const db = getDatabase();
        const response = await db.collection('books').deleteOne({ _id: bookId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        throw new Error('No book was deleted. The provided ID may not exist.');

    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: error.message || 'An error occurred while deleting the book' });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
