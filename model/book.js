import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String , require: true},
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    publishedDate: { type: Date ,required:true },
    coverImage: { type: String } ,// URL or path to the cover image
    quantity: { type: Number, default: 10, required: true }, // Default quantity is 10
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);