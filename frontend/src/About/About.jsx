import styles from "./About.module.css";
import profilePic from "../assets/profile.jpg";
import { FaPython, FaJava, FaCode, FaShieldAlt } from "react-icons/fa";

function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>About Me</h2>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageBorder}>
              <img src={profilePic} alt="Nethum Nenula" />
            </div>
            <div className={styles.experienceBadge}>
              <span className={styles.badgeNumber}>1+</span>
              <span className={styles.badgeText}>
                Years
                <br />
                Learning
              </span>
            </div>
          </div>

          <div className={styles.textContent}>
            <h3>Crafting digital experiences with code & creativity</h3>

            <p className={styles.bio}>
              I'm Nethum Nenula, a passionate Full Stack Developer and Software Developer with a love for
              creating beautiful and functional digital experiences. I believe
              in writing clean, efficient code and continuously learning new
              technologies to stay ahead in the ever-evolving tech landscape.
            </p>

            <p className={styles.bioSecond}>
              My journey in programming started with a curiosity for how
              websites, softwares work and most important thing was how they
              combine & execute all of the logics that written in different
              locations, and that curiosity has grown into a full-fledged
              passion for building applications that make a difference.
            </p>

            <div className={styles.skillTags}>
              <span className={styles.tag}>
                <FaPython /> Python Development
              </span>
              <span className={styles.tag}>
                <FaJava /> Java & JavaFX
              </span>
              <span className={styles.tag}>
                <FaCode /> Web Technologies
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
