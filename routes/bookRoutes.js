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
import { validateToken, adminOnly } from '../middleware/protect.js'; 

export const router = Router();


router.post('/', validateToken, adminOnly, createBookValidator, createBook);// Create a new book (admin only)
router.put('/:id', validateToken, adminOnly, updateBookValidator, updateBook);// Update a book by ID (admin only)
router.delete('/:id', validateToken, adminOnly, deleteBookValidator, deleteBook);// Delete a book by ID (admin only)
router.get('/show/:id', validateToken, getBookByIdValidator, getBookById);// Get details of a particular book 
router.get('/show', validateToken, listBooksValidator, listBooks);
// Get books with pagination and filtering options http://localhost:5000/book/show?page=1&limit=10&genre=66bcb28b389bebdb6f330e3b&author=66bcbc483cc5a7c0a07db2f3&q=honey

