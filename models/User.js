const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Name:{
        type:String
    },
    Address:{
        type:String
    },
    Email:{
        type:String
    }
})

module.exports = mongoose.model('User',UserSchema)