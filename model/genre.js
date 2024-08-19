import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String,required: true},
    image: { type: String }, // URL to the genre image (optional)
}, { timestamps: true });

export default mongoose.model('Genre', genreSchema);
