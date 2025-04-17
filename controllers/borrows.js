const { getDatabase } = require('../data/database'); // Correct import
const { ObjectId } = require('mongodb'); // Destructure ObjectId


const getAllBorrows = async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.collection('borrows').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving borrows' });
    }
};


const createBorrow = async (req, res) => {
    try {
        const transaction = {
            userId: req.body.userId,
            userName: req.body.userName,
            bookId: req.body.bookId,
            bookTitle: req.body.bookTitle,
            borrowDate: new Date().toISOString(),
            dueDate: req.body.dueDate,
            returnDate: null,
            status: "Borrowed"
        };
        
        const db = getDatabase();
        const response = await db.collection('borrows').insertOne(transaction);

        if (response.acknowledged) {
            return res.status(204).send();
        }

        throw new Error('Borrow creation failed');

    } catch (error) {
        console.error('Error creating borrow:', error);
        res.status(500).json({ error: error.message || 'An error occurred while creating the borrow' });
    }
};

const updateBorrow = async (req, res) => {
    try {
        const transactionId = ObjectId.createFromHexString(req.params.id);
        const transaction = {
            userId: req.body.userId,
            userName: req.body.userName,
            bookId: req.body.bookId,
            bookTitle: req.body.bookTitle,
            borrowDate: new Date().toISOString(),
            dueDate: req.body.dueDate,
            returnDate: null,
            status: "Borrowed"
        };
         
        const db = getDatabase();
        const response = await db.collection('borrows').replaceOne({ _id: transactionId }, transaction);

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        }

        throw new Error('No borrow was updated. The provided ID may not exist.');

    } catch (error) {
        console.error('Error updating borrow:', error);
        res.status(500).json({ error: error.message || 'An error occurred while updating the borrow' });
    }
};

const deleteBorrow = async (req, res) => {
    try {
        const transactionIdId = ObjectId.createFromHexString(req.params.id);
        const db = getDatabase();
        const response = await db.collection('borrows').deleteOne({ _id: transactionIdId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        throw new Error('No borrow was deleted. The provided ID may not exist.');

    } catch (error) {
        console.error('Error deleting borrow:', error);
        res.status(500).json({ error: error.message || 'An error occurred while deleting the borrow' });
    }
};

module.exports = {
    getAllBorrows,
    createBorrow,
    updateBorrow,
    deleteBorrow
};