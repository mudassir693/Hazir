const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Name:{
        type:String
    },
    ProfileImage:{
        type:String
    },
    Address:{
        type:String
    },
    Email:{
        type:String
    },
    WorkHistory:{
        type:Array
    },
},{
    timestamps:true
})

module.exports = mongoose.model('User',UserSchema)