import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Provide a username']
    },
    email: {
        type: String,
        required: [true, 'Provide a email'],
        lowercase: [true, 'Email must be lowercase'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Add a password']
    }
});

// Hashing Password
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPsw = await bcrypt.hash(this.password, salt);

        this.password = hashedPsw;

        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;