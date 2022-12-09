import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check existing user
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists.' });

        // Create new user
        user = new User({ username, email, password });
        const newUser = await user.save();

        const payload = { user: { _id: newUser._id } };

        // JWT Process
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });

        res.status(201).json({ success: true, user, token });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

        const payload = { user: { _id: user._id } };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });

        res.status(200).json({ success: true, token });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};