import Book from "../model/book.js";
import UserBookRecord from "../model/userBookRec.js";
import UserHistory from "../model/userHistory.js";

export const rentBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book || book.quantity <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    let userHistory = await UserHistory.findOne({ userId });
    if (!userHistory) {
      userHistory = new UserHistory({ userId, records: [] });
    }

    userHistory.records.push({
      bookId,
      rentedDate: new Date(),
      returnDate: null,
    });
    await userHistory.save();

    book.quantity -= 1;
    await book.save();

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 10);

    const record = new UserBookRecord({
      user: userId,
      book: bookId,
      deadline,
    });
    await record.save();

    res.status(201).json({ message: "Book rented successfully", record });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error: " + error.message });
  }
};

export const giveBackBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const rentRecord = await UserBookRecord.findOne({
      user: userId,
      book: bookId,
      returnDate: { $exists: false },
    });

    if (!rentRecord) {
      return res.status(404).json({ message: "Rent record not found or book already returned." });
    }

    rentRecord.returnDate = new Date();
    await rentRecord.save();

    const userHistory = await UserHistory.findOne({ userId });
    if (!userHistory) {
      return res.status(404).json({ message: "User history not found." });
    }

    const record = userHistory.records.find(
      (r) => r.bookId.equals(bookId) && r.returnDate === null
    );
    
    if (!record) {
      return res.status(404).json({ message: "Book rental record not found or book already returned." });
    }

    record.returnDate = new Date();
    await userHistory.save();

    const book = await Book.findById(bookId);
    book.quantity += 1;
    await book.save();

    res.status(200).json({ message: "Book returned successfully.", rentRecord });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const userHistory = await UserHistory.findOne({ userId }).populate('records.bookId', 'title author');

    if (!userHistory) {
      return res.status(404).json({ message: "User history not found." });
    }

    const historyWithDetails = userHistory.records.map((record) => ({
      book: {
        title: record.bookId.title,
        author: record.bookId.author,
      },
      rentedDate: record.rentedDate,
      returnDate: record.returnDate,
    }));

    res.status(200).json({ userId, history: historyWithDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
