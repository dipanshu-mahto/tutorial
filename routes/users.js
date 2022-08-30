const express = require('express');
const router = express.Router();
console.log('chal ja bhai');
const usersController = require('../controller/users_controller');

router.get('/profile',usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create',usersController.create);

module.exports = router;