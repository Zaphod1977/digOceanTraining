// const mongoose = require('mongoose');

// // Define the Note schema
// const noteSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: [true, 'Text is required for a note'],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   images: {
//     type: [String], // Assuming imageUrls is an array of strings
//   },
//   // You can add more fields as needed
// });

// // Create the Note model
// const Note = mongoose.model('Note', noteSchema);

// module.exports = Note;

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  user: String, // Add user information if needed
  // Add any other fields you need for comments
});

const noteSchema = new mongoose.Schema({
  text: String,
  images: [String],
  timestamp: Date,
  comments: [
    {
      text: String,
      user: String,
      timestamp: Date,
    },
  ],
});

module.exports = mongoose.model('Note', noteSchema);
