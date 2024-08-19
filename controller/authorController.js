import Author from '../model/author.js';
import Book from "../model/book.js"
import { validationResult } from 'express-validator';

// List all authors or retrieve a specific author by ID
// List all authors or retrieve a specific author by ID
export const listAuthorsOrGetAuthorByID = async (req, res) => {
  const { AuthorId } = req.params;

  try {
    if (AuthorId) {
      const author = await Author.findById(AuthorId);
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }

   
      const books = await Book.find({ author: AuthorId }).populate('genre', 'name'); 

      return res.status(200).json({
        author,
        books
      });
    } else {
      const authors = await Author.find();
      if (authors.length === 0) {
        return res.status(404).json({ message: 'No authors found' });
      }
      return res.status(200).json(authors);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Create a new author
export const createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, biography, profileImage } = req.body;

  try {
    const existingAuthor = await Author.findOne({ name });
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author already exists' });
    }
    
    const author = new Author({ name, biography, profileImage });
    await author.save();
    return res.status(201).json({ message: 'Author created successfully', author });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update an author by ID
export const updateAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, biography, profileImage } = req.body;

  try {
    const author = await Author.findByIdAndUpdate(
      id,
      { name, biography, profileImage },
      { new: true, runValidators: true }
    );
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(200).json({ message: 'Author updated successfully', author });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete an author by ID
export const deleteAuthorOrSpecificBookList = async (req, res) => {
  const { id } = req.params;

  try {
    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    return res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
