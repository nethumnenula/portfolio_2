require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Import routes
const projectRouter = require("./routes/projectsRoutes");
const imageRouter = require("./routes/imageRoutes");

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded images statically
app.use("/uploads", express.static(uploadDir));


// ROUTES
// Image routes
app.use("/api/images", imageRouter);

// Project routes
app.use("/api/projects", projectRouter);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API is running",
    endpoints: {
      upload: "POST /api/images/upload",
      projects: "GET /api/projects",
      project: "GET /api/projects/:id",
      create: "POST /api/projects",
      update: "PUT /api/projects/:id",
      delete: "DELETE /api/projects/:id",
    },
  });
});


// ERROR HANDLING MIDDLEWARE


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Multer errors
  if (err.code === "FILE_TOO_LARGE") {
    return res.status(413).json({
      success: false,
      message: "File too large. Maximum size is 10MB.",
    });
  }

  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({
      success: false,
      message: "Too many files uploaded.",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});


// DATABASE CONNECTION

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Portfolio");

    console.log("Connected to MongoDB Database");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
      console.log(`Base URL: http://localhost:${PORT}`);
      console.log(`Upload endpoint: http://localhost:${PORT}/api/images/upload`);
      console.log(`Uploads served from: http://localhost:${PORT}/uploads`);
    });
  } catch (error) {
    console.error(`An Error Occurred: ${error}`);
    process.exit(1);
  }
}

startServer();