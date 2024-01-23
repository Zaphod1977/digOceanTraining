const express = require('express');
const router = express.Router();
const Note = require('../models/note'); // Assuming you have a Note model

// POST /api/saveNote
router.post('/saveNote', async (req, res) => {
  try {
    const { noteText, imageUrls } = req.body;

    // Save the note to the database (adjust as needed based on your model)
    const newNote = new Note({
      text: noteText,
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
