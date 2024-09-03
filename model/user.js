import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true }, 
    password: { type: String, required: true },
    refreshToken: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user', required: false },
    plan: { type: String, enum: ['Bookworm', 'Commonworm'], default: 'Commonworm', required: false },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('email')) {
        this.username = this.email.split('@')[0];
    }

    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});


userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
