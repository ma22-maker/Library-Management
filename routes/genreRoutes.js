import { Router } from 'express';
import { createGenre, updateGenre, deleteGenre, listGenres } from '../controller/genreController.js';
import {
  createGenreValidator,
  updateGenreValidator,
  deleteGenreValidator
} from "../middleware/genreValidate.js";
import { validateToken, adminOnly } from '../middleware/protect.js'; 

export const router = Router();

router.get('/list/:genreName?', validateToken, listGenres); // List all genres or a specific genre by name 
router.post('/', validateToken, adminOnly, createGenreValidator, createGenre); // Create a new genre (admin only)
router.put('/:id', validateToken, adminOnly, updateGenreValidator, updateGenre);// Update a genre by ID (admin only)
router.delete('/:id', validateToken, adminOnly, deleteGenreValidator, deleteGenre);// Delete a genre by ID (admin only)

