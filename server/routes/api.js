const express = require('express');
const router = express.Router();
const Note = require('../models/note.js'); // Assuming you have a Note model


// Define routes
router.get('/todos', (req, res) => {
  // Implement logic to fetch todos from the database
  // ...

  // Respond with the fetched todos
  res.json({ todos: [ /*...*/] });
});



// POST /api/saveNote
router.post('/saveNote', async (req, res) => {
  try {
    const { text, imageUrls } = req.body; // Use 'text' as the key for the note

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


module.exports = router;
