const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  techStark: {
    type: [String],
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  demo: {
    type: String,
    default: "#",
  },
  image: {
    type: String,
    default: "",
  },
  details: {
    date: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Live"],
      default: "Completed",
    },
    category: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
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
