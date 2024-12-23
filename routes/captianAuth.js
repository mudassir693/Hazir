const jwt = require('jsonwebtoken');
const Captain = require('../models/Captain');
const bcrypt = require('bcryptjs'); // bcryptjs for password hashing (if needed)
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const router = require('express').Router();

// @route   POST /captainAuth/register
// @desc    Register a new captain
router.post('/register', async (req, res) => {
    const { Name, PhoneNumber, Email, Picture, CNIC, Category } = req.body;

    try {
        // Input validation (can be extended)
        if (!PhoneNumber || !Name || !Email) {
            return res.status(400).json({ data: 'Name, PhoneNumber, and Email are required.', error: true });
        }

        // Check if the captain already exists
        const existingCaptain = await Captain.findOne({ PhoneNumber });
        if (existingCaptain) {
            return res.status(409).json({ data: 'This Phone number is already in use', error: true });
        }

        // Create a new captain
        const newCaptain = new Captain({
            Name,
            PhoneNumber,
            Email,
            Picture,
            CNIC,
            Category,
        });

        // Save the new captain to the database
        const savedCaptain = await newCaptain.save();

        return res.status(201).json({ data: savedCaptain, error: false });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ data: 'An error occurred while registering the captain.', error: true });
    }
});

// @route   POST /captainAuth/login
// @desc    Log in a captain
router.post('/login', async (req, res) => {
    const { PhoneNumber } = req.body;

    try {
        // Validate input
        if (!PhoneNumber) {
            return res.status(400).json({ data: 'PhoneNumber is required.', error: true });
        }

        // Check if the captain exists
        const captain = await Captain.findOne({ PhoneNumber });
        if (!captain) {
            return res.status(404).json({ data: 'This Phone number is not registered.', error: true });
        }

        // Create a JWT token for the captain
        const token = jwt.sign(
            { id: captain._id, from: 'Captain', role: '' },
            process.env.JWT_SECRET, // Use environment variable for the secret
            { expiresIn: '7d' }
        );

        // Respond with captain data and the token
        return res.status(200).json({ data: { captain, token }, error: false });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ data: 'An error occurred while logging in.', error: true });
    }
});

module.exports = router;
