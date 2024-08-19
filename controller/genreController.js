import Genre from "../model/genre.js";
import Book from "../model/book.js";
import { validationResult } from "express-validator";

// List all genres or a specific genre by name and return related books if genreName is provided
export const listGenres = async (req, res) => {
  const { genreName } = req.params;

  try {
    let query = {};
    if (genreName) {
      query.name = new RegExp(`^${genreName}$`, "i");
    }

    const genres = await Genre.find(query);

    if (genreName && genres.length > 0) {
      const genreId = genres[0]._id;
      const books = await Book.find({ genre: genreId }).populate("author");

      return res.status(200).json({ genre: genres[0], books });
    }
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new genre
export const createGenre = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, image } = req.body;

  try {
    const genre = new Genre({ name, description, image });
    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a genre by ID
export const updateGenre = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, description, image } = req.body;

  try {
    const genre = await Genre.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true, runValidators: true }
    );
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a genre by ID
export const deleteGenre = async (req, res) => {
  const { id } = req.params;

  try {
    const genre = await Genre.findByIdAndDelete(id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
