import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String , require: true},
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    publishedDate: { type: Date ,required:true },
    coverImage: { type: String } ,
    quantity: { type: Number, default: 10, required: true }, 
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);