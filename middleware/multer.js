const multer = require("multer");

// memory storage (no disk saving)
const storage = multer.memoryStorage();

// MIME whitelist
const allowedMimeTypes = ["image/jpeg", "image/png"];

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error = new Error(
      "Invalid file type. Only JPEG and PNG images are allowed."
    );
    error.code = "INVALID_FILE_TYPE";
    return cb(error, false);
  }

  cb(null, true);
};

// Multer config
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
});

module.exports = upload;