import Book from '../model/book.js';
import Genre from '../model/genre.js';
import Author from '../model/author.js';
import { validationResult } from 'express-validator';

// Create a new book
export const createBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, genre, author, publishedDate, coverImage, quantity = 10 } = req.body;

    try {
        const genreExists = await Genre.findById(genre);
        const authorExists = await Author.findById(author);

        if (!genreExists) return res.status(400).json({ message: 'Genre not found' });
        if (!authorExists) return res.status(400).json({ message: 'Author not found' });

        const existingBook = await Book.findOne({
            title,
            author,
            publishedDate
        });

        if (existingBook) {
            return res.status(400).json({ message: 'Book already exists' });
        }

        const newBook = new Book({
            title,
            description,
            genre,
            author,
            publishedDate,
            coverImage,
            quantity
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

// Update a book by ID
export const updateBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, genre, author, publishedDate, coverImage, quantity } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, description, genre, author, publishedDate, coverImage, quantity },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

// Get details of a particular book by ID
export const getBookById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
        const book = await Book.findById(id).populate('genre').populate('author');

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};

// List books with pagination and filtering
export const listBooks = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { page = 1, limit = 10, genre, author, q } = req.query;

    const query = {};
    if (genre) {
        query.genre = genre;
    }
    if (author) {
        query.author = author;
    }
    if (q) {
        query.title = new RegExp(q, 'i');
    }

    try {
        const books = await Book.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('genre')
            .populate('author');

        const total = await Book.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
        const next = page < totalPages ? `${baseUrl}?page=${parseInt(page) + 1}&limit=${limit}` : null;
        const previous = page > 1 ? `${baseUrl}?page=${parseInt(page) - 1}&limit=${limit}` : null;

        res.status(200).json({
            books,
            total,
            page: parseInt(page),
            totalPages,
            next,
            previous
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
};
