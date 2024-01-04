const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Assuming image URLs are stored as strings
    default: [],
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
