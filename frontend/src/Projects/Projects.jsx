import styles from "./Projects.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaJava,
  FaReact,
  FaCss3,
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaDesktop,
  FaJsSquare,
} from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { MdCode } from "react-icons/md";

const API_URL = "http://localhost:4000/api/projects";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Map tech name to icon and color
  const getTechIcon = (techName) => {
    const techMap = {
      React: { icon: FaReact, color: "#61DAFB" },
      Java: { icon: FaJava, color: "#007396" },
      MySQL: { icon: SiMysql, color: "#4479A1" },
      JavaFX: { icon: FaDesktop, color: "#FF6B00" },
      CSS: { icon: FaCss3, color: "#1572B6" },
      JavaScript: { icon: FaJsSquare, color: "#F7DF1E" },
      "Node.js": { icon: FaJsSquare, color: "#339933" },
      "Express.js": { icon: FaJsSquare, color: "#FFFFFF" },
      MongoDB: { icon: FaJsSquare, color: "#47A248" },
    };
    return techMap[techName] || { icon: MdCode, color: "#8a8a8a" };
  };

  if (loading) {
    return (
      <section className={styles.projects} id="projects">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>My Projects</h2>
          <p className={styles.sectionSubtitle}>Loading projects...</p>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.projects} id="projects">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>My Projects</h2>
          <p className={styles.sectionSubtitle} style={{ color: "#ff6b00" }}>
            {error}
          </p>
          <button onClick={fetchProjects} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className={styles.projects} id="projects">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>My Projects</h2>
          <p className={styles.sectionSubtitle} style={{ color: "#8a8a8a" }}>
            No projects found. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>My Projects</h2>
        <p className={styles.sectionSubtitle}>
          Some of the projects I've worked on
        </p>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={project._id} className={styles.projectCard}>
              {/* Image Section */}
              <div className={styles.projectImage}>
                <img 
                  src={project.image || "https://via.placeholder.com/400x220/1a1a1a/ff6b00?text=Project"} 
                  alt={project.title} 
                />
                <div className={styles.projectOverlay}>
                  <span className={styles.projectNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`${styles.projectStatus} ${styles[project.details.status.toLowerCase().replace(" ", "")]}`}
                  >
                    {project.details.status}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className={styles.projectContent}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {/* Tech Stack */}
                <div className={styles.techStack}>
                  {project.techStack.map((tech, index) => {
                    const { icon: TechIcon, color } = getTechIcon(tech);
                    return (
                      <span key={index} className={styles.techTag}>
                        <TechIcon style={{ color }} />
                        {tech}
                      </span>
                    );
                  })}
                </div>

                {/* Features List */}
                <div className={styles.featuresList}>
                  <span className={styles.featuresLabel}>Key Features:</span>
                  <div className={styles.featuresTags}>
                    {project.details.features.map((feature, idx) => (
                      <span key={idx} className={styles.featureTag}>
                        • {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Details Footer */}
                <div className={styles.projectFooter}>
                  <div className={styles.projectMeta}>
                    <div className={styles.metaItem}>
                      <FaCalendarAlt />
                      <span>{project.details.date}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FaUser />
                      <span>{project.details.role}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FaClock />
                      <span>{project.details.category}</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className={styles.projectButtons}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubBtn}
                  >
                    <FaGithub /> View Code
                  </a>
                  <a
                    href={project.demo || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.demoBtn}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;