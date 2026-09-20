const VaultEntry = require('../models/vaultEntry')

const getVault = async (req, res) => {
    const entries = await VaultEntry.find({ userId: req.user.id })
    res.json(entries)
}

const createEntry = async (req, res) => {
    const { label, password } = req.body
    if (!label || !password) {
        return res.status(400).json({ error: 'Label and password are required' })
    }
    const entry = await VaultEntry.create({ userId: req.user.id, label, password })
    res.status(201).json(entry)
}

const deleteEntry = async (req, res) => {
    const result = await VaultEntry.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id
    })
    if (!result) return res.status(404).json({ error: 'Entry not found' })
    res.json({ ok: true })
}

module.exports = { getVault, createEntry, deleteEntry }