const Team = require('../models/Team');
const bcrypt = require('bcryptjs');

const router = require('express').Router();

// @route /team/getAll
// @desc Get all team members
router.get('/getAll', async (req, res) => {
    try {
        const teamMembers = await Team.find();
        return res.status(200).json({ data: teamMembers, error: false });
    } catch (error) {
        return res.status(500).json({ data: 'Error retrieving team members', error: true });
    }
});

// @route /team/getById/:id
// @desc Get team member by ID
router.get('/getById/:id', async (req, res) => {
    const { id } = req.params;
    
    // Validate ID format (you can use a library like mongoose.Types.ObjectId.isValid)
    if (!Team.isValidObjectId(id)) {
        return res.status(400).json({ data: 'Invalid ID format', error: true });
    }

    try {
        const teamMember = await Team.findById(id);
        if (!teamMember) {
            return res.status(404).json({ data: 'No record found with this ID', error: true });
        }
        return res.status(200).json({ data: teamMember, error: false });
    } catch (error) {
        return res.status(500).json({ data: 'Error retrieving team member', error: true });
    }
});

// @route /team/update/:id
// @desc Update team member
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { Email, Password, ...otherFields } = req.body;

    // Validate ID format
    if (!Team.isValidObjectId(id)) {
        return res.status(400).json({ data: 'Invalid ID format', error: true });
    }

    try {
        const existingTeamMember = await Team.findById(id);
        if (!existingTeamMember) {
            return res.status(404).json({ data: 'Team member not found', error: true });
        }

        // If a password is provided, hash it
        if (Password) {
            const salt = bcrypt.genSaltSync(12);
            otherFields.Password = bcrypt.hashSync(Password, salt);
        }

        const updatedTeamMember = await Team.findByIdAndUpdate(id, { $set: otherFields }, { new: true });
        return res.status(200).json({ data: updatedTeamMember, error: false });
    } catch (error) {
        return res.status(500).json({ data: 'Error updating team member', error: true });
    }
});

// @route /team/delete/:id
// @desc Delete team member
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ID format
    if (!Team.isValidObjectId(id)) {
        return res.status(400).json({ data: 'Invalid ID format', error: true });
    }

    try {
        const teamMember = await Team.findById(id);
        if (!teamMember) {
            return res.status(404).json({ data: 'No record found with this ID', error: true });
        }

        const deletedTeamMember = await Team.findByIdAndRemove(id);
        return res.status(200).json({ data: deletedTeamMember, error: false });
    } catch (error) {
        return res.status(500).json({ data: 'Error deleting team member', error: true });
    }
});

module.exports = router;
