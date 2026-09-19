const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
    passwordHash :String,
    refreshTokenVersion:{
        type:Number,
        default: 0
    }
}, {timestamps: true})

const UserModel = mongoose.model('User',userSchema)

module.exports=UserModel