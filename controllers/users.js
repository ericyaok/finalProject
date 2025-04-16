const { getDatabase } = require('../data/database'); // Correct import
const { ObjectId } = require('mongodb'); // Destructure ObjectId


const getUsers = async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.collection('users').find().toArray(); // Convert cursor to array
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};


const registerUser = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, // should already be hashed before saving
            fullName: req.body.fullName,
            role: 'student',
            studentId: req.body.studentId,
            program: req.body.program,
            year: parseInt(req.body.year),
            borrowedBooks: req.body.borrowedBooks || [] // optional: array of borrowed books
          };
          

        const db = getDatabase();
        const response = await db.collection('users').insertOne(user);

        if (response.acknowledged) {
            return res.status(204).send();
        }

        throw new Error('User creation failed');

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message || 'An error occurred while creating the user' });
    }
};

const updateUser = async (req, res) => {
    try {
        const contactId = ObjectId.createFromHexString(req.params.id);
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, // should already be hashed before saving
            fullName: req.body.fullName,
            role: 'student',
            studentId: req.body.studentId,
            program: req.body.program,
            year: parseInt(req.body.year),
            borrowedBooks: req.body.borrowedBooks || [] // optional: array of borrowed books
          };
          

        const db = getDatabase();
        const response = await db.collection('users').replaceOne({ _id: contactId }, user);

        if (response.modifiedCount > 0) {
            return res.status(204).send();
        }

        throw new Error('No user was updated. The provided ID may not exist.');

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || 'An error occurred while updating the user' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const contactId = ObjectId.createFromHexString(req.params.id);
        const db = getDatabase();
        const response = await db.collection('users').deleteOne({ _id: contactId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        throw new Error('No user was deleted. The provided ID may not exist.');

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message || 'An error occurred while deleting the user' });
    }
};



module.exports = {
    getUsers,
    registerUser,
    updateUser,
    deleteUser
};
