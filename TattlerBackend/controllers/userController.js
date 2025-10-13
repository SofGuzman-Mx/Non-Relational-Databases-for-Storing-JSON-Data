import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; // ✅ 1. IMPORTAMOS asyncHandler

// Helper function to generate a token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token will be valid for 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// ✅ 3. MEJORAMOS la función envolviéndola en asyncHandler
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the user in the database
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // 4. Respond with user data and a token
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate/login a user
// @route   POST /api/users/login
// ✅ 3. MEJORAMOS la función envolviéndola en asyncHandler
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });

    // 2. Check if user exists and if the password matches the hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        // 3. Respond with user data and a new token
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private (requiere token)

// new function 'getMe'
export const getMe = asyncHandler(async (req, res) => {
    // The `protect` middleware has already found the user and put it in `req.user`.
    // We simply return it.
    res.status(200).json(req.user);
});