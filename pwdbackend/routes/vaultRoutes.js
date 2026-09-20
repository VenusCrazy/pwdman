const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const { getVault, createEntry, deleteEntry } = require('../controllers/vaultController')
const { createShare } = require('../controllers/shareController')

router.use(requireAuth)

router.get('/', getVault)
router.post('/', createEntry)
router.delete('/:id', deleteEntry)
router.post('/:id/share', createShare)

module.exports = router