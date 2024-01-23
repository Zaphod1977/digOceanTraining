// models/image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
