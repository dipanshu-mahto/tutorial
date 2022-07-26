const express = require('express');
const router = express.Router();
console.log('chal ja bhai');
const usersController = require('../controller/users_controller');

router.get('/profile',usersController.profile);


module.exports = router;