const express = require('express');
const router = express.Router();
const borrowsController = require('../controllers/borrows')
const validator = require('../middleware/validation')



router.post('/', borrowsController.createBorrow);


router.get('/', borrowsController.getAllBorrows);


router.put('/:id', borrowsController.updateBorrow);


router.delete('/:id', borrowsController.deleteBorrow);


module.exports = router;
