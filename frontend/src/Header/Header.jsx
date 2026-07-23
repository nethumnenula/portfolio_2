import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "education", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Education", id: "education" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className={styles.wrapper}>
      <header
        className={`${styles.headerContainer} ${scrolled ? styles.scrolled : ""}`}
      >
        {/* Logo */}
        <div className={styles.leftSection}>
          <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>
            <h1>&lt;Nethum&gt;</h1>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.navButtons}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? styles.active : ""}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className={styles.rightSection}>
          <div className={styles.profileButtons}>
            <ul>
              <li>
                <a
                  href="https://github.com/nethumnenula"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className={styles.icon} />
                  <span className={styles.profileIconName}>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nethum-nenula-72a051315/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className={styles.icon} />
                  <span className={styles.profileIconName}>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/zo_m.b_ie/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className={styles.icon} />
                  <span className={styles.profileIconName}>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          className={`${styles.menuBtn} ${open ? styles.opened : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.show : ""}`}>
        <div className={styles.mobileMenuContent}>
          <ul className={styles.mobileNav}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? styles.active : ""}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "contact")}
            className={styles.contactBtn}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;