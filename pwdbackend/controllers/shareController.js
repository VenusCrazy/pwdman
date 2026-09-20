const crypto = require('crypto')
const ShareLink = require('../models/shareLink')
const vaultEntry = require('../models/vaultEntry')
const VaultEntryModel = require('../models/vaultEntry')

const createShare = async(req , res) => {
    const entry = await VaultEntryModel.findOne({_id: req.params.id, userId: req.user.id})
    if(!entry) return res.status(400).json({error:'Entry not Found'})
    
    const link = await ShareLink.create({
        vaultEntryId: entry._id,
        token: crypto.randomBytes(32).toString('hex'),
        expiresAt: link.expiresAt
    })
}

const getShared = async (req, res) => {
    const link = await ShareLink.findOne({ token: req.params.token })
    if (!link) return res.status(404).json({ error: 'Invalid link' })
    if (link.used) return res.status(400).json({ error: 'This link has already been viewed' })
    if (link.expiresAt < new Date()) return res.status(400).json({ error: 'This link has expired' })

    await ShareLink.findOneAndUpdate(
        { _id: link._id, used: false },
        { used: true }
    )
    const entry = await VaultEntry.findById(link.vaultEntryId)
    res.json({ label: entry.label, password: entry.password })
}

module.exports = { createShare, getShared }