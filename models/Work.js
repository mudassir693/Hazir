const mongoose = require('mongoose')

const WorkSchema = new mongoose.Schema({
    UserId:{
        type:String
    },
    CaptainId:{
        type:String
    },
    Hours:{
        type:String,
    },
    Bill:{
        type:Number
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Work',WorkSchema) 