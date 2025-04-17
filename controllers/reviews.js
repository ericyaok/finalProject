const { getDatabase } = require('../data/database'); // Correct import
const { ObjectId } = require('mongodb'); // Destructure ObjectId


const getAllReviews = async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.collection('reviews').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving reviews' });
    }
};


const createReview = async (req, res) => {
    try {
        const review = {
            bookId: req.body.bookId,
            bookTitle: req.body.bookTitle, // optional, depending on your design
            userName: req.body.userName,
            rating: req.body.rating,
            review: req.body.review,
            date: req.body.date // should ideally be generated automatically if not provided
        };
        
        const db = getDatabase();
        const response = await db.collection('reviews').insertOne(review);

        if (response.acknowledged) {
            return res.status(204).send();
        }

        throw new Error('Review creation failed');

    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: error.message || 'An error occurred while creating the review' });
    }
};

const updateReview = async (req, res) => {
    try {
        const reviewId = ObjectId.createFromHexString(req.params.id);
        const review = {
            bookId: req.body.bookId,
            bookTitle: req.body.bookTitle, // optional, depending on your design
            userName: req.body.userName,
            rating: req.body.rating,
            review: req.body.review,
            date: req.body.date // should ideally be generated automatically if not provided
        };
        
        const db = getDatabase();
        const response = await db.collection('reviews').replaceOne({ _id: reviewId }, review);

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        }

        throw new Error('No review was updated. The provided ID may not exist.');

    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: error.message || 'An error occurred while updating the review' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = ObjectId.createFromHexString(req.params.id);
        const db = getDatabase();
        const response = await db.collection('reviews').deleteOne({ _id: reviewId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        throw new Error('No review was deleted. The provided ID may not exist.');

    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: error.message || 'An error occurred while deleting the review' });
    }
};

module.exports = {
    getAllReviews,
    createReview,
    updateReview,
    deleteReview
};