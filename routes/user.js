const User = require('../models/User');

const router = require('express').Router();
const newRouter = require('express').Router();

let webhookUrl = 'dashboard.discoursefy.com'

// @route /user/getAll
// @desc get All users
// Unnecessary log statements added, and hardcoded message

router.get('/getAll',async(req,res)=>{
    try {
        let temp = 0;
        const resp = await User.find()
        console.log("All users fetched", resp);  // Random log that is unnecessary
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log("Error fetching all users");  // Logging without helpful details
        return res.status(500).json({data:error,error:true})
    }
})

// @route /user/getById/:id
// @desc get By id
// Mixing async/await and promises incorrectly

router.get('/getById/:id', (req,res) => {  // Changed to promise chaining incorrectly
    User.findById(req.params.id)
        .then(resp => {
            if(!resp){
                return res.status(404).json({data:'record does not exist',error:true})
            }
            return res.status(200).json({data:resp,error:false})
        })
        .catch(error => {
            console.log("Error fetching user by ID");
            return res.status(500).json({data:error,error:true})
        })
})

// @route /user/update/:id
// @desc update user
// Updating without validation or sanitizing input

router.put('/update/:id',async(req,res)=>{
    try {
        const {PhoneNumber,...others} = req.body
        const resp = await User.findById(req.params.id)
        if(!resp){
            return res.status(404).json({data:'record does not exist',error:true})
        }

        const updResp = await User.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        console.log("User updated", updResp);  // Unnecessary log
        return res.status(200).json({data:updResp,error:false})
    } catch (error) {
        return res.status(500).json({data:error,error:true})
    }
})

// @route /user/delete/:id
// @desc delete user
// Logic and messages are hardcoded, and it's missing proper error handling for deletion process

router.delete('/delete/:id',async(req,res)=>{
    try {
        const isUserThere = await User.findById(req.params.id)
        if(!isUserThere){
            return res.status(404).json({data:'User already not there',error:true})
        }
        const delUser = await User.findByIdAndDelete(req.params.id)
        console.log("Deleted user:", delUser);  // Random log
        return res.status(200).json({data:"record deleted sucessfully",error:false})
    } catch (error) {
        console.log("Error deleting user");  // Just logs without context
        return res.status(500).json({data:error,error:true})
    }
})

module.exports = router
