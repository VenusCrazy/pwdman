const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vaultEntrySchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    label:{type:String, required:true},
    password:{type:String, required:true}
},{timestamps:true})

vaultEntrySchema.index({ userId: 1 })

const VaultEntryModel = mongoose.model('VaultEntry', vaultEntrySchema)
module.exports = VaultEntryModel