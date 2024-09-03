import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/user.js';

// Middleware to protect routes
export const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});


export const adminOnly = asyncHandler((req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403); 
        throw new Error('Not authorized as an admin');
    }
});
