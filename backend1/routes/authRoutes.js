
const express = require('express');
const { signup, login , forget,resetpass, } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forget', forget);
router.put('/resetpassword', resetpass)

module.exports = router;
