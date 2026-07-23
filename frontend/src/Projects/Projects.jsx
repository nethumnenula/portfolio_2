import styles from "./Projects.module.css";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import project3 from "../assets/project3.jpg";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaJava,
  FaReact,
  FaCss3,
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaStar,
  FaEye,
  FaDesktop,
  FaJsSquare,
} from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { MdCode } from "react-icons/md";

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Logistic Management System",
      description:
        "A comprehensive logistics management system designed to streamline supply chain operations, track shipments, manage inventory, and optimize delivery routes for efficient logistics operations.",
      techStack: [{ name: "Java", icon: FaJava, color: "#007396" }],
      github: "https://github.com/nethumnenula/Menu_Driven_Logistic_Management_System",
      demo: "https://github.com/nethumnenula/Menu_Driven_Logistic_Management_System",
      image: project1, 
      details: {
        date: "Aug 2025",
        role: "Software Developer",
        status: "Completed",
        category: "Desktop Application",
        features: [
          "Shipment Tracking",
          "Inventory Management",
          "Route Optimization",
          "Real-time Analytics",
        ],
      },
    },
    {
      id: 2,
      title: "Sales Management System",
      description:
        "A powerful sales management system built with Java and MySQL, featuring real-time inventory tracking, sales analytics, customer management, and comprehensive reporting tools.",
      techStack: [
        { name: "Java", icon: FaJava, color: "#007396" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "JavaFX", icon: FaDesktop, color: "#FF6B00" },
      ],
      github: "https://github.com/nethumnenula/Sales_Management_System",
      demo: "https://github.com/nethumnenula/Sales_Management_System",
      image: project2, 
      details: {
        date: "Mar 2026",
        role: "Software Developer",
        status: "Completed",
        category: "Enterprise Application",
        features: [
          "Sales Analytics",
          "Customer Management",
          "Inventory Tracking",
          "Report Generation",
        ],
      },
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with React, showcasing my skills, projects, and experience with a sleek dark theme and smooth animations.",
      techStack: [
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "CSS", icon: FaCss3, color: "#1572B6" },
        { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
      ],
      github: "https://github.com/nethumnenula/portfolio_1",
      demo: "https://nethumnenula.github.io/portfolio_1/",
      image: project3, 
      details: {
        date: "Jun 2026",
        role: "Frontend Developer",
        status: "Live",
        category: "Web Application",
        features: [
          "Responsive Design",
          "Dark Theme",
          "Smooth Animations",
          "Contact Form",
        ],
      },
    },
  ];

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>My Projects</h2>
        <p className={styles.sectionSubtitle}>
          Some of the projects I've worked on
        </p>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              {/* Image Section */}
              <div className={styles.projectImage}>
                <img src={project.image} alt={project.title} />
                <div className={styles.projectOverlay}>
                  <span className={styles.projectNumber}>0{project.id}</span>
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
                    const TechIcon = tech.icon;
                    return (
                      <span key={index} className={styles.techTag}>
                        <TechIcon style={{ color: tech.color }} />
                        {tech.name}
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
                    href="#"                 
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