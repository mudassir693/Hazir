const Captain = require('../models/Captain');
const bcrypt = require('bcryptjs')

const router = require('express').Router();

// @route /captain/getAll
// @desc get all captain members

router.get('/getAll',async(req,res)=>{
    try {
        const resp = await Captain.find()
        
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})


// @route /captain/getById/:id
// @desc get By id

router.get('/getById/:id',async(req,res)=>{
    try {
        const resp = await Captain.findById(req.params.id)

        if(!resp){
            return res.status(400).json({data:'No record with this Id',error:true})
        }
        
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})


// @route /captain/update/:id
// @desc update member

router.put('/update/:id',async(req,res)=>{
    try {
        const {PhoneNumber,...others} = req.body

        const isAvailable = await Captain.findById(req.params.id)

        if(!isAvailable){
            return res.status(200).json({data:'invalid request',error:true})
        }

        const updResp = await Captain.findByIdAndUpdate(req.params.id,{$set:others},{new:true})

        return res.status(200).json({data:updResp,error:false})        
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})


// @route /captain/delete/:id
// @desc delete member

router.delete('/delete/:id',async(req,res)=>{
    try {
        const isAvailable = await Captain.findById(req.params.id)

        if(!isAvailable){
            return res.status(200).json({data:'invalid request',error:true})
        }

        const delResp = await Captain.findByIdAndRemove(req.params.id)
        return res.status(200).json({data:delResp,error:false})
    } catch (error) {
        return res.status(200).json({data:error,error:true})
    }
})
module.exports = router