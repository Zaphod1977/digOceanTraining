const express = require('express');
const router = express.Router();
const Note = require('../models/note.js'); // Assuming you have a Note model


// GET /api/todos
router.get('/todos', async (req, res) => {
  try {
    // Fetch todos from the database (adjust as needed based on your model)
    const todos = await Note.find();

    // Add a timestamp to each todo
    const todosWithTimestamp = todos.map((todo) => ({
      ...todo._doc,
      timestamp: todo.createdAt, // Assuming your model has a 'createdAt' field
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
router.post('/todo', async (req, res) => {
  try {
    const { text, imageUrls } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required for a new note' });
    }

    // Save the note to the database (adjust as needed based on your model)
    const newNote = new Note({
      text: text,
      images: imageUrls,
      timestamp: new Date(), // Add the timestamp here
    });

    const savedNote = await newNote.save();

    res.json(savedNote);
  } catch (error) {
    console.error('Error saving note:', error);
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
