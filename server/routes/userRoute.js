const express = require('express');
const userController = require('../controller/userController');
const router = express();
const admin = require('firebase-admin');

// register user
router.post('/register', userController.register);

// login user
router.post('/login', userController.login);

module.exports = router;
