import styles from './Contact.module.css'
import { 
    FaEnvelope, FaPhone, FaMapMarkerAlt, 
    FaGithub, FaLinkedin, FaInstagram,
    FaPaperPlane, FaUser, FaComment
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Get in Touch</h2>
                <p className={styles.sectionSubtitle}>Let's work together</p>

                <div className={styles.contactWrapper}>
                    {/* Left Side - Contact Info */}
                    <div className={styles.contactInfo}>
                        <h3>Send me a message</h3>
                        <p className={styles.infoDescription}>
                            Fill out the form and I'll get back to you shortly.
                        </p>
                        <p className={styles.infoDescription}>
                            Have a project in mind or want to discuss an opportunity? I'm 
                            always open to new connections and collaborations.
                        </p>

                        <div className={styles.contactDetails}>
                            <div className={styles.contactItem}>
                                <div className={styles.iconWrapper}>
                                    <MdEmail className={styles.contactIcon} />
                                </div>
                                <div>
                                    <div className={styles.infoLabel}>EMAIL</div>
                                    <a href="mailto:nethumnenula2004@gmail.com" className={styles.infoValue}>
                                        nethumnenula2004@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconWrapper}>
                                    <FaPhone className={styles.contactPhoneIcon} />
                                </div>
                                <div>
                                    <div className={styles.infoLabel}>PHONE</div>
                                    <a href="tel:+94765526902" className={styles.infoValue}>
                                        +94 76 552 6902
                                    </a>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.iconWrapper}>
                                    <FaMapMarkerAlt className={styles.contactIcon} />
                                </div>
                                <div>
                                    <div className={styles.infoLabel}>LOCATION</div>
                                    <span className={styles.infoValue}>
                                        Meegoda, Sri Lanka
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.socialLinks}>
                            <a href="https://github.com/nethumnenula" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/nethum-nenula-72a051315/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaLinkedin />
                            </a>
                            <a href="https://www.instagram.com/zo_m.b_ie/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className={styles.contactForm}>
                        <h3 className={styles.formTitle}>Send me a message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <div className={styles.inputWrapper}>
                                    <FaUser className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.inputWrapper}>
                                    <FaEnvelope className={styles.inputIcon} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.inputWrapper}>
                                    <FaComment className={styles.inputIcon} />
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact