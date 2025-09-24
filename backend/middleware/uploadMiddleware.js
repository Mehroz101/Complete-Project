const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dxqhpfea3",
  api_key: process.env.CLOUDINARY_API_KEY || "136425488693859",
  api_secret: process.env.CLOUDINARY_API_SECRET | "fJLlMGYHPz-e1sKTIOO-QvYD6WM",
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    public_id: (req, file) =>
      Date.now() + "-" + file.originalname.split(".")[0], // unique filename
  },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: fileFilter,
});

// Middleware to handle Multer errors
const uploadMiddleware = (req, res, next) => {
  upload.array("files", 4)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File size exceeds the limit of 5 MB." });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res
            .status(400)
            .json({ message: "Too many files were uploaded." });
        }
        return res.status(400).json({ message: err.message });
      } else {
        // Other errors
        return res
          .status(500)
          .json({ message: "An error occurred while uploading files." });
      }
    }
    next();
  });
};

module.exports = uploadMiddleware;
