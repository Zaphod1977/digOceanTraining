const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import Multer
const noteRoutes = require('./noteRoutes.js');
const imageRoutes = require('./images.js'); // Import imageRoutes separately
const Note = require('../models/note.js');

// Set up Multer storage
const storage = multer.memoryStorage(); // Change this based on your needs
const upload = multer({ storage: storage });

router.use('/api/notes', noteRoutes);
router.use('/api/images', imageRoutes); // Change this line to a unique path, e.g., '/api/images'

// GET /api/todos
router.get('/todos', async (req, res) => {
  try {
    // Fetch todos from the database (adjust as needed based on your model)
    const todos = await Note.find();

    // Add a timestamp to each todo
    const todosWithTimestamp = todos.map((todo) => ({
      ...todo._doc,
      timestamp: todo.createdAt,
      formattedTimestamp: todo.timestamp ? todo.timestamp.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }) : null,
    }));

    // Log the timestamp for each todo
    todosWithTimestamp.forEach((todo) => {
      console.log('Todo Timestamp:', todo.timestamp);
    });

    // Respond with the fetched todos
    res.json({ todos: todosWithTimestamp });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/todo
router.post('/todo', upload.single('file'), async (req, res) => {
  try {
    const { text, commentText, commentUser } = req.body;
    const imageUrls = req.file ? [req.file.buffer.toString('base64')] : [];

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required for a new note' });
    }

    // Save the note to the database (adjust as needed based on your model)
    const newNote = new Note({
      text: text,
      images: imageUrls,
      timestamp: new Date(),
      comments: [{ text: commentText, user: commentUser, timestamp: new Date() }],
    });

    const savedNote = await newNote.save();

    res.json(savedNote);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Assuming you're using express
router.post('/todos/addComment/:id', async (req, res) => {
  const todoId = req.params.id;
  const { commentText, commentUser } = req.body;

  try {
    // Find the todo by ID and add the comment
    const todo = await Note.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.comments.push({
      text: commentText,
      user: commentUser,
      timestamp: new Date(),
    });

    const savedTodo = await todo.save();

    res.json(savedTodo);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// PUT /api/editNote/:id
router.put('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  const newText = req.body.text;

  try {
    // Find and update the todo by ID
    const updatedTodo = await Note.findByIdAndUpdate(
      todoId,
      { $set: { text: newText } },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Respond with the updated todo
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
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

