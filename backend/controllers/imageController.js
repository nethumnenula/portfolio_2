const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const uploadDir = path.join(__dirname, "../uploads");

// Upload single image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const filePath = req.file.path;
    const fileName = req.file.filename;
    const fileExt = path.extname(fileName);
    const fileNameWithoutExt = path.basename(fileName, fileExt);
    const originalSize = req.file.size;

    // Compress and optimize image using sharp
    const optimizedFileName = `${fileNameWithoutExt}-optimized${fileExt}`;
    const optimizedPath = path.join(uploadDir, optimizedFileName);

    await sharp(filePath)
      .resize(800, 600, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80, progressive: true })
      .png({ quality: 80, compressionLevel: 9 })
      .webp({ quality: 80 })
      .toFile(optimizedPath);

    // Delete the original file (keep optimized version)
    fs.unlinkSync(filePath);

    // Get optimized file size
    const stats = fs.statSync(optimizedPath);
    const optimizedSize = stats.size;

    // Generate URL for the optimized image
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${optimizedFileName}`;

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: imageUrl,
      fileName: optimizedFileName,
      fileInfo: {
        originalName: req.file.originalname,
        fileName: optimizedFileName,
        originalSize: originalSize,
        optimizedSize: optimizedSize,
        mimeType: req.file.mimetype,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    // Clean up any uploaded file if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

// Delete image
const deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;

    // Security: Prevent directory traversal
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return res.status(400).json({ message: "Invalid filename" });
    }

    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({
        success: true,
        message: "Image deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

// Get image info
const getImageInfo = async (req, res) => {
  try {
    const { filename } = req.params;

    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return res.status(400).json({ message: "Invalid filename" });
    }

    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    const stats = fs.statSync(filePath);
    const ext = path.extname(filename);

    res.json({
      success: true,
      fileInfo: {
        fileName: filename,
        fileSize: stats.size,
        fileSizeMB: (stats.size / (1024 * 1024)).toFixed(2),
        created: stats.birthtime,
        modified: stats.mtime,
        extension: ext,
      },
    });
  } catch (error) {
    console.error("Get image info error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get image info",
      error: error.message,
    });
  }
};

// Get all uploaded images (for admin)
const getAllImages = async (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    const imageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext);
      })
      .map((file) => {
        const stats = fs.statSync(path.join(uploadDir, file));
        return {
          fileName: file,
          fileSize: stats.size,
          fileSizeMB: (stats.size / (1024 * 1024)).toFixed(2),
          created: stats.birthtime,
          url: `${req.protocol}://${req.get("host")}/uploads/${file}`,
        };
      })
      .sort((a, b) => b.created - a.created);

    res.json({
      success: true,
      count: imageFiles.length,
      images: imageFiles,
    });
  } catch (error) {
    console.error("Get all images error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get images",
      error: error.message,
    });
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  getImageInfo,
  getAllImages,
};