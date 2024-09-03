import { Router } from 'express';
import {
  listAuthorsOrGetAuthorByID,
  updateAuthor,
  deleteAuthorOrSpecificBookList,
  createAuthor
} from '../controller/authorController.js';

import {
  createAuthorValidator,
  updateAuthorValidator,
  deleteAuthorValidator
} from '../middleware/authorValidate.js';

import { validateToken, adminOnly } from '../middleware/protect.js';

export const router = Router();


router.get('/list/:AuthorId?',validateToken, listAuthorsOrGetAuthorByID); // List all authors or retrieve a specific author by id and return the author related books.
router.post('/',validateToken, adminOnly, createAuthorValidator, createAuthor); // Create a new author
router.put('/:id',validateToken, adminOnly, updateAuthorValidator, updateAuthor); // Update an author by ID
router.delete('/:id',validateToken, adminOnly, deleteAuthorValidator, deleteAuthorOrSpecificBookList); 






