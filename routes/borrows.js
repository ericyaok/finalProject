const express = require('express');
const router = express.Router();
const borrowsController = require('../controllers/borrows')
const validator = require('../middleware/validation')



router.post('/', validator.transactionRules, validator.validate, borrowsController.createBorrow);


router.get('/', borrowsController.getAllBorrows);


router.put('/:id', validator.transactionRules, validator.validate, borrowsController.updateBorrow);


router.delete('/:id', validator.idParamRule, validator.validate, borrowsController.deleteBorrow);


module.exports = router;
