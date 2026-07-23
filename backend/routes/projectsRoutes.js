const express = require("express");
const {
    getProject,
    getProjects,
    addProject,
    updateProject,
    deleteProject
} = require("../controllers/projectsController");

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;