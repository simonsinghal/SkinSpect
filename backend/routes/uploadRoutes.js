const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage engine for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = './uploads/';
    console.log(`[Multer] Destination: ${dest}`); // Added logging
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log(`[Multer] Filename: ${filename}`); // Added logging
    cb(null, filename);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  console.log(`[Multer] File: ${file.originalname}, extName: ${extName}, mimeType: ${mimeType}`); // Added logging

  if (extName && mimeType) {
    cb(null, true);
  } else {
    const error = new Error('Only images are allowed');
    console.error('[Multer] File filter error:', error);
    cb(error);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});

// Route to handle image uploads
router.post('/', upload.fields([  // Changed to upload.fields()
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
]), (req, res) => {
  console.log('[/api/upload] Received request');
  console.log('[/api/upload] Request body:', req.body);
  console.log('[/api/upload] Request files:', req.files);

  try {
    // --------------------------------------------------------
    // Server-Side Validation (CRITICAL)
    // --------------------------------------------------------
    const { fullName, gender, age } = req.body;

    if (!fullName || !gender || !age) {
      console.warn('[/api/upload] Missing fields');
      return res.status(400).json({ error: 'Bad Request', message: 'Missing required fields: fullName, gender, age' });
    }

    const ageNum = Number(age);
    if (isNaN(ageNum)) {
      console.warn('[/api/upload] Invalid age');
      return res.status(400).json({ error: 'Bad Request', message: 'Invalid age: Age must be a number' });
    }

    if (!req.files.image1 && !req.files.image2) {
      console.warn('[/api/upload] No images uploaded');
      return res.status(400).json({ error: 'Bad Request', message: 'At least one image is required (image1 or image2)' });
    }
    // File validation (example, adjust as needed)
    if (req.files.image1) {
        if (!req.files.image1[0].mimetype.startsWith('image/'))
        {
          return res.status(400).json({ error: 'Bad Request', message: 'image1 is not a valid image file' });
        }
    }
     if (req.files.image2) {
        if (!req.files.image2[0].mimetype.startsWith('image/'))
        {
          return res.status(400).json({ error: 'Bad Request', message: 'image2 is not a valid image file' });
        }
    }

    // --------------------------------------------------------
    // File Handling (if validation passes)
    // --------------------------------------------------------
    const imageUrls = [];
    if (req.files.image1) {
      imageUrls.push(`/uploads/${req.files.image1[0].filename}`);
    }
    if (req.files.image2) {
      imageUrls.push(`/uploads/${req.files.image2[0].filename}`);
    }
    console.log('[/api/upload] Image URLs:', imageUrls);

    res.status(200).json({
      message: 'Files uploaded successfully',
      imageUrls: imageUrls,
    });
  } catch (error) {
    console.error('[/api/upload] Error handling upload:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Multer error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('[/api/upload] Multer error:', err);
    res.status(400).json({ error: 'Bad Request', message: err.message });
  } else if (err) {
    console.error('[/api/upload] Unknown error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  } else {
    next();
  }
});

module.exports = router;