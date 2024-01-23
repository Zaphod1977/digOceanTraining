const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/images.js'); // Ensure the correct path

// Set up Multer storage
const storage = multer.memoryStorage(); // Change this based on your needs
const upload = multer({ storage: storage });

// POST /api/uploadImage
router.post('/uploadImage', upload.single('file'), async (req, res) => {
  try {
    const { filename } = req.body;
    const path = req.file ? `/uploads/${req.file.filename}` : '';

    if (!filename || filename.trim() === '') {
      return res.status(400).json({ error: 'Filename is required for an image' });
    }

    // Save the image to the database
    const newImage = new Image({
      filename: filename,
      path: path,
    });

    const savedImage = await newImage.save();

    res.json(savedImage);
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
