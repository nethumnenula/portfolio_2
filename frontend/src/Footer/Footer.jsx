import styles from './Footer.module.css'
import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

function Footer() {
    const currentYear = new Date().getFullYear()

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Contact', href: '#contact' }
    ]

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault()
        const target = document.getElementById(targetId.replace('#', ''))
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Section */}
                <div className={styles.footerTop}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <h2>&lt;/Nethum&gt;</h2>
                        <p>Building digital experiences with code & creativity</p>
                    </div>

                    {/* Navigation Links */}
                    <div className={styles.footerNav}>
                        <h4>Quick Links</h4>
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href} 
                                        onClick={(e) => handleSmoothScroll(e, link.href)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className={styles.footerSocial}>
                        <h4>Connect</h4>
                        <div className={styles.socialLinks}>
                            <a href="https://github.com/nethumnenula" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/nethum-nenula-72a051315/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="https://www.instagram.com/zo_m.b_ie/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="mailto:nethumnenula2004@gmail.com" aria-label="Email">
                                <MdEmail />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className={styles.footerBottom}>
                    <p>
                        &copy; {currentYear} Nethum Nenula. All rights reserved.
                    </p>
                    <p className={styles.madeWith}>
                        Made with <FaHeart className={styles.heartIcon} /> using React
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer