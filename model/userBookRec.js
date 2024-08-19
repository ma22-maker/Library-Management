import mongoose from "mongoose";

const userBookRecordSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rentDate: { type: Date, default: Date.now, required: true },
    returnDate: { type: Date },
    deadline: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('UserBookRecord', userBookRecordSchema);
