const express = require('express');
const { registerUser, login, isAdmin } = require('../controller/authcontroller');
const router = express.Router();

router.post('/register', registerUser);

router.post('/login', login);

module.exports = router;
