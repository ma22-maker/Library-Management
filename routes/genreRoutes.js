// routes/genreRoutes.js
import { Router } from 'express';
import { createGenre, updateGenre, deleteGenre, listGenres } from '../controller/genreController.js';
import {
  createGenreValidator,
  updateGenreValidator,
  deleteGenreValidator
} from "../middleware/genreValidate.js";


export const router = Router();

router.get('/list/:genreName?', listGenres); // List all genres or a specific genre by name
router.post('/', createGenreValidator, createGenre); // Create a new genre
router.put('/:id', updateGenreValidator, updateGenre); // Update a genre by ID
router.delete('/:id', deleteGenreValidator, deleteGenre); // Delete a genre by ID
