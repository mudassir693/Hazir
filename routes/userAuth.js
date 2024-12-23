const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// @route /userAuth/register
// @desc add User

router.post('/register',async(req,res)=>{
    try {
        const {Name,Address,PhoneNumber,Email} = req.body

        const userAlreadyExist = await User.findOne({PhoneNumber})
        if(userAlreadyExist){
            return res.status(404).json({data:'this phone number alredy in use',error:true})
        }

        const newUser = new User({
            Name,
            Address,
            PhoneNumber,
            Email
        })
        const respUser = await newUser.save()
        return res.status(200).json({data:respUser,error:false})
    } catch (error) {
        return res.status(500).json({data:error,error:true})
    }
})

// @route /userAuth/login
// @desc login user

router.post('/login',async(req,res)=>{
    try {
        const {PhoneNumber} = req.body

        const userAlreadyExist = await User.findOne({PhoneNumber})
        if(!userAlreadyExist){
            return res.status(404).json({data:'this phone number is not registered yet...',error:true})
        }

        const token = jwt.sign({
            id:userAlreadyExist._id,
            from:'User',
            Role:''
        },'jwtetgdauSetgdauecrdg',{expiresIn:'7d'})

        return res.status(200).json({data:{user:userAlreadyExist,token},error:false})
    } catch (error) {
        console.log(error);
        return res.status(500).json({data:error,error:true})
    }
})
module.exports = router
