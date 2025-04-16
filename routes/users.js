const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')
const validate = require('../middleware/validation')

// POST /users/register
router.post('/register', validate.registerUserRules, validate, usersController.registerUser);

// GET /users/:id
router.get('/', usersController.getUsers);

// PUT /users/:id
router.put('/:id', validate.updateUserRules, validate, usersController.updateUser);

router.delete('/:id',validate.idParamRule, validate, usersController.deleteUser);



module.exports = router;
