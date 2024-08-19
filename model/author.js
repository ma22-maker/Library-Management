import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    biography: { type: String },
    profileImage: { type: String }, 
}, { timestamps: true });

export default mongoose.model('Author', authorSchema);
