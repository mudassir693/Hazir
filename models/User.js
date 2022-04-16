const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    ProfileImage:{
        type:String
    },
    Address:{
        type:String
    },
    PhoneNumber:{
        type:String
    },
    Email:{
        type:String
    },
},{
    timestamps:true
})

module.exports = mongoose.model('User',UserSchema)