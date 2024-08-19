import { Router } from 'express';
import {
    createBook,
    updateBook,
    deleteBook,
    getBookById,
    listBooks
} from '../controller/bookController.js';
import {
    createBookValidator,
    updateBookValidator,
    deleteBookValidator,
    getBookByIdValidator,
    listBooksValidator
} from '../middleware/booksValidate.js';

export const router = Router();


router.post('/admin', createBookValidator, createBook);// Create a new book
router.put('/admin/:id', updateBookValidator, updateBook);// Update a book
router.delete('/admin/:id', deleteBookValidator, deleteBook);// Delete a book
router.get('/show/:id', getBookByIdValidator, getBookById);// Get details of a particular book
router.get('/show', listBooksValidator, listBooks);// Get books with pagination and filtering options http://localhost:5000/book/show?page=1&limit=10&genre=66bcb28b389bebdb6f330e3b&author=66bcbc483cc5a7c0a07db2f3&q=honey

