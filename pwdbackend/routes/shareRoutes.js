const express = require('express')
const router = express.Router()
const { getShared } = require('../controllers/shareController')

router.get('/:token', getShared)

module.exports = router