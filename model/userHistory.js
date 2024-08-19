import mongoose from 'mongoose';

const userHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  records: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rentedDate: { type: Date, required: true },
    returnDate: { type: Date, default: null } // Initially null, set when the book is returned
  }]
});

export default mongoose.model('UserHistory', userHistorySchema);
