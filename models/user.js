const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
    ,
    date: {
        type: Date,
        default: Date.now
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User',userSchema)