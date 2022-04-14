const mongoose =  require('mongoose')

const TeamSchema = new mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    Email:{
        type: String,
        required:true
    },
    Password:{
        type:String
    },
    Role:{
        type:String,
    },

},{
    timestamps:true
})

module.exports = mongoose.model('Team',TeamSchema)