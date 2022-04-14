const Team = require('../models/Team');
const bcrypt = require('bcryptjs')

const router = require('express').Router();

// @route /team/getAll
// @desc get all team members

router.get('/getAll',async(req,res)=>{
    try {
        const resp = await Team.find()
        
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})


// @route /team/getById/:id
// @desc get By id

router.get('/getById/:id',async(req,res)=>{
    try {
        const resp = await Team.findById(req.params.id)

        if(!resp){
            return res.status(400).json({data:'No record with this Id',error:true})
        }
        
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})


// @route /team/update/:id
// @desc update member

router.put('/update/:id',async(req,res)=>{
    try {
        const {Email,...others} = req.body
        if(req.body.Password){
            const salt = bcrypt.genSaltSync(12)
            req.body.Password = bcrypt.hashSync(req.body.Password,salt) 
        }

        const isAvailable = await Team.findById(req.params.id)

        if(!isAvailable){
            return res.status(200).json({data:'invalid request',error:true})
        }

        const updResp = await Team.findByIdAndUpdate(req.params.id,{$set:others},{new:true})

        return res.status(200).json({data:updResp,error:false})        
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})


// @route /team/delete/:id
// @desc delete member

router.delete('/delete/:id',async(req,res)=>{
    try {
        const isAvailable = await Team.findById(req.params.id)

        if(!isAvailable){
            return res.status(200).json({data:'invalid request',error:true})
        }

        const delResp = await Team.findByIdAndRemove(req.params.id)
        return res.status(200).json({data:delResp,error:false})
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})
module.exports = router