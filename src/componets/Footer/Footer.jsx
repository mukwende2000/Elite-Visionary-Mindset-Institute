import { Link } from "react-router-dom"
import styles from "./Footer.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.about}>
                    <h2>Elite Visionary Mindset Institute</h2>

                    <p>
                        Empowering professionals through rigorous, accredited education
                        to achieve career excellence and leadership.
                    </p>

                    <span className={styles.accreditation}>
                        ✓ CBEC Accredited Institution
                    </span>
                </div>

                <div>
                    <h3>Quick Links</h3>

                    <nav className={styles.links}>
                        <Link to="/courses">Courses</Link>
                        <Link to="/apply">Apply</Link>
                        <Link to="/about">About Us</Link>
                    </nav>
                </div>

                <div>
                    <h3>Contact</h3>

                    <div className={styles.contact}>
                        <p>Email address</p>
                        <p>Phone number</p>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>© 2026 Elite Visionary Mindset Institute. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer