const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  uploadImage,
  deleteImage,
  getImageInfo,
  getAllImages,
} = require("../controllers/imageController");

// Upload single image
router.post("/upload", upload.single("image"), uploadImage);

// Delete image
router.delete("/:filename", deleteImage);

// Get image info
router.get("/info/:filename", getImageInfo);

// Get all images
router.get("/all", getAllImages);

module.exports = router;