const express = require('express');
const router = express.Router();
const Note = require('../models/note.js'); // Assuming you have a Note model

// GET /api/todos
router.get('/todos', async (req, res) => {
  try {
    // Fetch todos from the database (adjust as needed based on your model)
    const todos = await Note.find();

    // Respond with the fetched todos
    res.json({ todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/saveNote
router.post('/saveNote', async (req, res) => {
  try {
    const { text, imageUrls } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required for a new note' });
    }

    // Save the note to the database (adjust as needed based on your model)
    const newNote = new Note({
      text: text,
      images: imageUrls,
    });

    const savedNote = await newNote.save();

    res.json(savedNote);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// DELETE /api/todos/:id
router.delete('/todos/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    // Find and delete the todo by ID
    const deletedTodo = await Note.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Respond with a success message or updated data
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
