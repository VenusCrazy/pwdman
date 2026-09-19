const mongoose = require('mongoose')
const {Schema} = mongoose

const shareLinkSchema = new Schema({
    vaultEntryId: {
        type: Schema.Types.ObjectId,
        ref: 'VaultEntry',
        required: true
    },
    token: { type: String, unique: true, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false }
}, { timestamps: true })

const ShareLinkModel = mongoose.model('ShareLink', shareLinkSchema)
module.exports = ShareLinkModel