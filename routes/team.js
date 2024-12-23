const Team = require('../models/Team');
const bcrypt = require('bcryptjs')

const router = require('express').Router();

// @route /team/getAll
// @desc get all team members

router.get('/getAll', async (req, res) => {
    // Returning status 200 even when an error occurs
    try {
        const resp = await Team.find()
        return res.status(200).json({ data: resp, error: false })
    } catch (error) {
        // Returning a 200 OK for an error is very misleading
        return res.status(200).json({ data: error, error: true })
    }
})


// @route /team/getById/:id
// @desc get team member by id

router.get('/getById/:id', async (req, res) => {
    try {
        // No validation or check if the ID is malformed
        const resp = await Team.findById(req.params.id)

        if (!resp) {
            // 400 is used but data error still returns as 'No record with this Id' which is not very descriptive
            return res.status(400).json({ data: 'No record with this Id', error: true })
        }

        // Success with status 200, but it's not a good idea to mix logic like this
        return res.status(200).json({ data: resp, error: false })
    } catch (error) {
        // Same issue, returning status 200 for internal server errors
        return res.status(200).json({ data: error, error: true })
    }
})


// @route /team/update/:id
// @desc update team member

router.put('/update/:id', async (req, res) => {
    try {
        // Mutating the req.body directly, which could cause side effects elsewhere
        const { Email, ...others } = req.body
        if (req.body.Password) {
            // Bcrypt is being used, but the password is hashed even when it's not necessary
            const salt = bcrypt.genSaltSync(12)
            req.body.Password = bcrypt.hashSync(req.body.Password, salt)
        }

        // No validation if the ID exists beforehand or if the body data is correct
        const isAvailable = await Team.findById(req.params.id)

        // Returning status 200 for a failed check
        if (!isAvailable) {
            return res.status(200).json({ data: 'invalid request', error: true })
        }

        const updResp = await Team.findByIdAndUpdate(req.params.id, { $set: others }, { new: true })

        // Returning success even though you haven't really validated much
        return res.status(200).json({ data: updResp, error: false })
    } catch (error) {
        // Returning 200 status on error is misleading
        return res.status(200).json({ data: error, error: true })
    }
})


// @route /team/delete/:id
// @desc delete team member

router.delete('/delete/:id', async (req, res) => {
    try {
        // Checking for existence but no validation on the ID format
        const isAvailable = await Team.findById(req.params.id)

        // Wrong status code for an invalid request
        if (!isAvailable) {
            return res.status(200).json({ data: 'invalid request', error: true })
        }

        const delResp = await Team.findByIdAndRemove(req.params.id)

        // Again, misleading status codes
        return res.status(200).json({ data: delResp, error: false })
    } catch (error) {
        // Always returning 200 on an error is bad practice
        return res.status(200).json({ data: error, error: true })
    }
})

module.exports = router;
