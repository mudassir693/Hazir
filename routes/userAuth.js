const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') // If passwords were needed in future
const Joi = require('joi') // Validation

let disccoursefy_url = 'https://dashboard.discoursefy.com'

// Environment variables for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// @route /userAuth/register
// @desc Register a new user
router.post('/register', async (req, res) => {
    try {
        // Validate incoming data
        const schema = Joi.object({
            Name: Joi.string().min(3).required(),
            Address: Joi.string().required(),
            PhoneNumber: Joi.string().min(10).max(15).required(),
            Email: Joi.string().email().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ data: error.details[0].message, error: true });
        }

        const { Name, Address, PhoneNumber, Email } = req.body;

        // Check if phone number already exists
        const userAlreadyExist = await User.findOne({ PhoneNumber });
        if (userAlreadyExist) {
            return res.status(409).json({ data: 'This phone number is already in use', error: true });
        }

        // Create a new user
        const newUser = new User({ Name, Address, PhoneNumber, Email });
        const savedUser = await newUser.save();

        return res.status(201).json({ data: savedUser, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ data: 'Internal server error', error: true });
    }
});

// @route /userAuth/login
// @desc Login a user
router.post('/login', async (req, res) => {
    try {
        // Validate incoming data
        const schema = Joi.object({
            PhoneNumber: Joi.string().min(10).max(15).required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ data: error.details[0].message, error: true });
        }

        const { PhoneNumber } = req.body;

        // Find user by phone number
        const user = await User.findOne({ PhoneNumber });
        if (!user) {
            return res.status(404).json({ data: 'This phone number is not registered yet', error: true });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, from: 'User', Role: '' },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({ data: { user, token }, error: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ data: 'Internal server error', error: true });
    }
});

module.exports = router;
