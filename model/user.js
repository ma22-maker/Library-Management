import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    plan: { type: String, enum: ['Bookworm', 'Commonworm'], required: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
