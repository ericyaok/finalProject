const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews')
const validator = require('../middleware/validation')



router.post('/', reviewsController.createReview);


router.get('/', reviewsController.getAllReviews);


router.put('/:id', reviewsController.updateReview);


router.delete('/:id', reviewsController.deleteReview);


module.exports = router;
