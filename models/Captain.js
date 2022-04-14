const mongoose = require('mongoose')

const CaptainSchema = new mongoose.Schema({
    Name:{
        Type:String,
    },
    PhoneNumber:{
        Type:String,
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
    },
    WorkHistory:{
        type:Array
    },
    Rate:{
        type:Number
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Captain',CaptainSchema)