const express = require('express');
const router = express.Router();
const borrowsController = require('../controllers/borrows')
const validator = require('../middleware/validation')
const { ensureAuthenticated } = require('../middleware/authenticate');


router.post('/', validator.transactionRules, validator.validate, borrowsController.createBorrow);


router.get('/', borrowsController.getAllBorrows);


router.put('/:id', ensureAuthenticated, validator.transactionRules, validator.validate, borrowsController.updateBorrow);


router.delete('/:id', ensureAuthenticated, validator.idParamRule, validator.validate, borrowsController.deleteBorrow);


module.exports = router;
