const Captain = require('../models/Captain');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

// @route   GET /captain/getAll
// @desc    Get all captain members
router.get('/getAll', async (req, res) => {
    try {
        const captains = await Captain.find();
        return res.status(200).json({ data: captains, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ data: 'An error occurred while fetching captains.', error: true });
    }
});

// @route   GET /captain/getById/:id
// @desc    Get a captain by ID
router.get('/getById/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ID format
    if (!Captain.isValidObjectId(id)) {
        return res.status(400).json({ data: 'Invalid ID format.', error: true });
    }

    try {
        const captain = await Captain.findById(id);
        if (!captain) {
            return res.status(404).json({ data: 'No captain found with this ID.', error: true });
        }
        return res.status(200).json({ data: captain, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ data: 'An error occurred while fetching the captain.', error: true });
    }
});

// @route   PUT /captain/update/:id
// @desc    Update a captain member
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { PhoneNumber, ...updateData } = req.body;

    // Validate ID format
    if (!Captain.isValidObjectId(id)) {
        return res.status(400).json({ data: 'Invalid ID format.', error: true });
    }

    try {
        const captain = await Captain.findById(id);
        if (!captain) {
            return res.status(404).json({ data: 'Captain not found for this ID.', error: true });
        }

        const updatedCaptain = await Captain.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        return res.status(200).json({ data: updatedCaptain, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ data: 'An error occurred while updating the captain.', error: true });
    }
});

// @route   DELETE /captain/delete/:id
// @desc    Delete a captain member
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ID format
    if (!Captain.isValidObjectId(id)) {
        return res.status(400).json({ data: 'Invalid ID format.', error: true });
    }

    try {
        const captain = await Captain.findById(id);
        if (!captain) {
            return res.status(404).json({ data: 'Captain not found for this ID.', error: true });
        }

        const deletedCaptain = await Captain.findByIdAndRemove(id);
        return res.status(200).json({ data: deletedCaptain, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ data: 'An error occurred while deleting the captain.', error: true });
    }
});

module.exports = router;
