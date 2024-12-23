const router = require('express').Router()
const Team = require('../models/Team')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// aws_secret = "process.env.AWS_SECRET_TOKEN"
// aws secret = "aws_asdnkjfrfsrkjadajkde23420asdnedn3ir4kj"
// @route /teamAuth/register
// @desc Add team member(in-house)

router.post('/register',async(req,res)=>{
    try {
        const {Role,Password,Email,Name} = req.body

        const isAvailable = await Team.findOne({Email})

        if(isAvailable){
            return res.status(200).json({data:'This email is already register to team member',error:true})
        }
        const salt = bcrypt.genSaltSync(12)
        const newPassword =  bcrypt.hashSync(Password,salt)
        const newTeamMember = new Team({
            Role,
            Password:newPassword,
            Email,
            Name
        })

        const resp = await newTeamMember.save()
        return res.status(200).json({data:resp,error:false}) 

    } catch (error) {
        return res.status(500).json({data:error,error:tru})
    }
})

// @route /teamAuth/login
// @desc login team member

router.post('/login',async(req,res)=>{
    try {
        const {Email,Password} = req.body

        const isAlreadyAvailable = await Team.findOne({Email})
        if(!isAlreadyAvailable){
            return res.status(400).json({data:'this email is not registered',error:true})
        }

        const isPassMatch = bcrypt.compareSync(Password,isAlreadyAvailable.Password)

        if(!isPassMatch){
            return res.status(200).json({data:'wrong Password',error:true})
        }

        const token = jwt.sign({
            id:isAlreadyAvailable._id,
            from:'Team',
            Role:isAlreadyAvailable.Role

        },'jwtetgdauSetgdauecrdg',{expiresIn:'7d'})

        return res.status(200).json({data:{team:isAlreadyAvailable,token},error:false})
    } catch (error) {
        return res.status(200).json({data:'err: '+error,error:true})
    }
})


module.exports = router
