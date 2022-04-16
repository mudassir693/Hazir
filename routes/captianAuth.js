const jwt = require('jsonwebtoken');
const Captain = require('../models/Captain');

const router = require('express').Router();

// @route /captainAuth/register
// @desc add captain

router.post('/register',async(req,res)=>{
    try {
        const {Name,PhoneNumber,Email,Picture,CNIC,Category} = req.body

        console.log(PhoneNumber)
        
        const iscaptainAlreadyExist = await Captain.findOne({PhoneNumber})
        console.log('checkPoint:2: ',iscaptainAlreadyExist)
        if(iscaptainAlreadyExist){
            return res.status(500).json({data:'This Phone number already in use',error:true})
        }
        const newCaptain = new Captain({
            Name,
            PhoneNumber,
            Email,
            Picture,
            CNIC,
            Category,
        })

        console.log('checkPoint:3: ',newCaptain)

        const respCaptain = await newCaptain.save() 

        return res.status(200).json({data:respCaptain,error:false})
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})


// @route /captainAuth/login
// @desc login

router.post('/login',async (req, res)=>{
    try {
        const {PhoneNumber} = req.body

        const iscaptainAlreadyExist = await Captain.findOne({PhoneNumber})
        if(!iscaptainAlreadyExist){
            return res.status(500).json({data:'This Phone number is not is use',error:true})
        }

        const token = jwt.sign({
            id:iscaptainAlreadyExist._id,
            from:'Captain',
            Role:''
        },'jwtetgdauSetgdauecrdg',{expiresIn:'7d'})

        return res.status(200).json({data:{captain:iscaptainAlreadyExist,token},error:false})
    } catch (error) {
        console.log(error)
        return res.status(500).json({data:error,error:true})
    }
})
module.exports = router