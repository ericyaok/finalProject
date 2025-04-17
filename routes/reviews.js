const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews')
const validator = require('../middleware/validation')



router.post('/', validator.reviewRules, validator.validate, reviewsController.createReview);


router.get('/', reviewsController.getAllReviews);


router.put('/:id', validator.reviewRules, validator.validate, reviewsController.updateReview);


router.delete('/:id', validator.idParamRule, validator.validate, reviewsController.deleteReview);


module.exports = router;
