const express = require('express');
const router = express.Router();
const {test, signupUser, loginUser, meHandler, refreshUser, logoutUser}=require('../controllers/authController')
const requireAuth = require('../middleware/requireAuth')

//routes
router.get('/',test)
router.post('/signup', signupUser)
router.post('/login',loginUser)
router.get('/me', requireAuth, meHandler)
router.post('/refresh', refreshUser)
router.post('/logout', logoutUser)

module.exports = router 