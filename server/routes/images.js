const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the file system module for reading the directory contents
const router = express.Router();

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: './uploads/', // Specify the uploads directory
  filename: function (req, file, cb) {
    // Generate a unique filename with the original extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload using the storage engine
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Example limit to 1MB
  fileFilter: function (req, file, cb) {
    // Filter uploaded files to only include images
    checkFileType(file, cb);
  }
}).single('myImage'); // Expect a single file upload named 'myImage'

// Helper function to check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// POST route for uploading an image
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (req.file == undefined) {
        res.status(400).send('Error: No File Selected!');
      } else {
        // Respond with the path of the uploaded image
        res.send({
          msg: 'File Uploaded!',
          file: `/uploads/${req.file.filename}`
        });
      }
    }
  });
});

// GET route to list all images in the uploads directory
router.get('/list', (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads'); // Adjust if your directory structure is different

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to list images" });
    }
    // Filter for image files only and prepend the path
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/uploads/${file}`);
    res.json(imageFiles);
  });
});

module.exports = router;
