const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const routes = require('./routes/api.js');
const noteRoutes = require('./routes/noteRoutes.js');
const imagesRoutes = require('./routes/images.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log(err));

// Set up CORS middleware
app.use(cors());

// Serve uploaded files statically with full path
// Middleware to handle image uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Set up middleware for serving static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up middleware for handling JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use your routes
app.use('/api', routes);
app.use('/api/notes', noteRoutes);
app.use('/api/images', imagesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
