const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({
  dest: 'uploads/',
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: fileFilter
});

// Middleware to handle Multer errors
const uploadMiddleware = (req, res, next) => {
  upload.array('files', 4)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File size exceeds the limit of 5 MB.' });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({ message: 'Too many files were uploaded.' });
        }
        return res.status(400).json({ message: err.message });
      }
       else {
        // Other errors
        //console.log(err.message);
        return res.status(500).json({ message: 'An error occurred while uploading files.' });
      }
    }
    // //console.log("uploaded")
    next();
  });
}


module.exports = uploadMiddleware;
