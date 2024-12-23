const mongoose = require('mongoose')

const CaptainSchema = new mongoose.Schema({
    Name:{
        type:String,
    },
    PhoneNumber:{
        type:String,
    },
    Email:{
        type:String
    },
    Picture:{
        type:String
    },
    CNIC:{
        type:String
    },
    Category:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Captain',CaptainSchema)
