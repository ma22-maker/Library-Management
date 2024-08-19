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

export const router = Router();


router.get('/list/:AuthorId?', listAuthorsOrGetAuthorByID); // List all authors or retrieve a specific author by id and return the author related books.
router.post('/', createAuthorValidator, createAuthor); // Create a new author
router.put('/:id', updateAuthorValidator, updateAuthor); // Update an author by ID
router.delete('/:id', deleteAuthorValidator, deleteAuthorOrSpecificBookList); 