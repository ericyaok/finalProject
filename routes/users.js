const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')


// POST /users/register
router.post('/register', usersController.registerUser);

// GET /users/:id
router.get('/', usersController.getUsers);

// PUT /users/:id
router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);



module.exports = router;
