require("dotenv").config();

const express = require("express");
const app = express();

const uploadRoutes = require("./routes/uploadRoutes");

app.use(express.json());

app.use("/api", uploadRoutes);

// error handler (important for multer errors)
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});