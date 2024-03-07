const mongoose = require('mongoose')
const {Schema} = require("mongoose")

const userSchema = new Schema({
name: {
    type: String,
    required: [true, "please fill name!"]
},
email: {
    type: String,
    unique: true,
    required: [true, "please fill email!"]
},
password: {
    type: String,
    required: [true, "password required"]
},
isAdmin:{
    type: Boolean,
    required: true,
    default: false
}
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User