const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')
const validator = require('../middleware/validation')

// POST /users/register
router.post('/register', validator.registerUserRules, validator.validate, usersController.registerUser);

// GET /users/:id
router.get('/', usersController.getUsers);

// PUT /users/:id
router.put('/:id', validator.updateUserRules, validator.validate, usersController.updateUser);

router.delete('/:id',validator.idParamRule, validator.validate, usersController.deleteUser);



module.exports = router;
