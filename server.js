require("dotenv").config();

const express = require("express");
const app = express();

const uploadRoutes = require("./routes/uploadRoutes");

app.use(express.json());

app.use("/api", uploadRoutes);

// global error handler (Multer + Cloudinary + clean error responses)
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  // Multer: file too large
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      success: false,
      message: "File too large. Max size allowed is 5MB.",
    });
  }

  // Multer: invalid file type
  if (err.code === "INVALID_FILE_TYPE") {
    return res.status(415).json({
      success: false,
      message: err.message,
    });
  }

  // Cloudinary auth errors
  if (err.http_code === 401) {
    return res.status(401).json({
      success: false,
      message: "Cloudinary authentication failed. Check credentials.",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});