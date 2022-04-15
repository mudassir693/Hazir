const User = require('../models/User');

const router = require('express').Router();

// @route /user/getAll
// @desc get All users 

router.get('/getAll',async(req,res)=>{
    try {
        const resp = await User.find()
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        return res.status(500).json({data:error,error:true})
    }
})


// @route /user/getById/:id
// @desc get By id

router.get('/getById/:id',async(req,res)=>{
    try {
        const resp = await User.findById(req.params.id)
        if(!resp){
            return res.status(404).json({data:'record does not exist',error:true})
        }
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        return res.status(500).json({data:error,error:true})
    }
})


// @route /user/update/:id
// @desc update user

router.put('/update/:id',async(req,res)=>{
    try {
        const {PhoneNumber,...others} = req.body
        const resp = await User.findById(req.params.id)
        if(!resp){
            return res.status(404).json({data:'record does not exist',error:true})
        }

        const updResp = await User.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        return res.status(200).json({data:updResp,error:false})
    } catch (error) {
        return res.status(500).json({data:error,error:true})
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try {
        const isUserThere = await User.findById(req.params.id)
        if(!isUserThere){
            return res.status(404).json({data:'User already not there',error:true})
        }
        const delUser = await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({data:"record deleted sucessfully",error:false})
    } catch (error) {
        return res.status(500).json({data:error,error:true})
    }
})

module.exports = router