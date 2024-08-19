import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    biography: { type: String },
    profileImage: { type: String }, // URL to the author image (optional)
}, { timestamps: true });

export default mongoose.model('Author', authorSchema);
