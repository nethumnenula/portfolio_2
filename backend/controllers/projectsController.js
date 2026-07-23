const Project = require("../models/projectsModel");
const mongoose = require("mongoose");

// GET all Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single project
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD a new project
const addProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(200).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE a project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        {...req.body, updatedAt : Date.now()},
        {new : true, runValidators: true}
    );
    if(!project){
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    getProjects,
    getProject,
    addProject,
    updateProject,
    deleteProject
};