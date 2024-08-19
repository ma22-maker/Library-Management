import User from '../model/user.js';
import { validationResult } from 'express-validator';

// Create a new user
export const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, role, plan } = req.body;

    try {
        const newUser = new User({ firstName, lastName, email, role, plan });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

// Get a list of users
export const listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

// Get a specific user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, role, plan } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { firstName, lastName, email, role, plan }, 
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};
