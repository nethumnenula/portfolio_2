const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  techStack: {
    type: [String],
    required: [true, "Tech stack is required"],
  },
  github: {
    type: String,
    required: [true, "GitHub URL is required"],
    trim: true,
  },
  demo: {
    type: String,
    default: "#",
    trim: true,
  },
  image: {
    type: String,
    default: "",
    trim: true,
  },
  details: {
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Live"],
      default: "Completed",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    features: {
      type: [String],
      required: [true, "Features are required"],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);