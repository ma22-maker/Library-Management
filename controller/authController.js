import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/user.js';

// Register a new user
// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
    const { email, password, role, plan } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user with optional role and plan
        const user = new User({
            email,
            password,
            role: role || 'user', // Default to 'user' if not provided
            plan: plan || 'Commonworm' // Default to 'Commonworm' if not provided
        });

        await user.save();

        // Generate tokens
        const accessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role, plan: user.plan },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        user.refreshToken = refreshToken;
        await user.save();

        // Set cookies
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 604800000 // 7 days
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Authenticate user and login
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

       //access token
        const accessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role, plan: user.plan },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        //refresh token
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_SECRET,
            { expiresIn: '7d' } 
        );

 
        user.refreshToken = refreshToken;
        await user.save();

 
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 604800000 //a week
        });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Refresh token endpoint
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role, plan: user.plan },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
// only issuing a new access token instead of giving back new refresh token every time .

        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000
        });

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
});

// Promote a user to admin
export const promoteToAdmin = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.role = 'admin';
        await user.save();

        res.status(200).json({ message: `User ${user.email} has been promoted to admin` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});