import styles from "./Education.module.css";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

function Education() {
  const educationData = [
    {
      id: 1,
      period: "2025 — 2028",
      title: "BSc. Information & Communication Technology",
      institution: "University of Sri Jayewardenepura",
      icon: FaGraduationCap,
      description:
        "Currently pursuing a degree in ICT, focusing on Software Development, Database Management, Machine Learning, DevOps Engineering, and modern web technologies.",
      details: [
        "Specializing in Software Engineering",
        "Database Management Systems",
        "Web Application Development",
        "Network Security Fundamentals",
      ],
    },
    {
      id: 2,
      period: "2022 — 2024",
      title: "G.C.E. Advanced Level (Mathematics Stream)",
      institution: "Mahinda Rajapaksha College",
      icon: MdSchool,
      description:
        "Successfully completed Advanced Level Examinations in the Mathematics stream with excellent results across all three subjects.",
      details: [
        "Subject 1: Combined Mathematics",
        "Subject 2: Physics",
        "Subject 3: ICT",
      ],
    },
    {
      id: 3,
      period: "2020 — 2022",
      title: "G.C.E. Ordinary Level",
      institution: "Mahinda Rajapaksha College",
      icon: MdSchool,
      description:
        "Completed Ordinary Level examinations with outstanding results across all nine subjects, building a strong academic foundation.",
      details: [
        "9 Subjects with Good Results",
        "Strong Foundation in Sciences",
        "Excellence in Mathematics",
      ],
    },
  ];

  return (
    <section className={styles.education} id="education">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <p className={styles.sectionSubtitle}>
          My academic journey and qualifications
        </p>

        <div className={styles.timeline}>
          {educationData.map((item, index) => (
            <div key={item.id} className={styles.timelineItem}>
              {/* Timeline Line */}
              {index < educationData.length - 1 && (
                <div className={styles.timelineLine}></div>
              )}

              {/* Timeline Dot */}
              <div className={styles.timelineDot}>
                <item.icon className={styles.timelineIcon} />
              </div>

              {/* Content */}
              <div className={styles.timelineContent}>
                <div className={styles.contentHeader}>
                  <span className={styles.period}>
                    <FaCalendarAlt className={styles.periodIcon} />
                    {item.period}
                  </span>
                </div>

                <h3 className={styles.eduTitle}>{item.title}</h3>
                <p className={styles.institution}>
                  <FaMapMarkerAlt className={styles.institutionIcon} />
                  {item.institution}
                </p>

                <p className={styles.eduDescription}>{item.description}</p>

                <div className={styles.eduDetails}>
                  {item.details.map((detail, idx) => (
                    <span key={idx} className={styles.detailTag}>
                      • {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
