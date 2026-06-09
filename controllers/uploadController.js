const cloudinary = require("../config/cloudinary");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) {
            error.http_code = error.http_code || 500;
            return reject(error);
          }

          resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    return res.status(200).json({
      success: true,
      message: "Upload successful",
      data: {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadFile };