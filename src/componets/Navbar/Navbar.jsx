import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import logo from '../../assets/logo.jpeg'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.brand}>
                    <img
                        src={logo}
                        alt="Elite Visionary Mindset Institute"
                        className={styles.logo}
                    />
                    <span className={styles.name}>
                        Elite Visionary Mindset Institute
                    </span>
                </Link>

                <nav className={styles.desktopNav}>
                    <Link to="/">Home</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/apply">Apply</Link>
                    <Link to="/about">About Us</Link>
                </nav>

                <Link to="/apply" className={styles.applyButton}>
                    Apply Now
                </Link>

                <button
                    className={styles.menuButton}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    ☰
                </button>
            </div>

            {menuOpen && (
                <nav className={styles.mobileNav}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                    <Link to="/courses" onClick={() => setMenuOpen(false)}>
                        Courses
                    </Link>
                    <Link to="/apply" onClick={() => setMenuOpen(false)}>
                        Apply
                    </Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>
                        About Us
                    </Link>
                    <Link
                        to="/apply"
                        className={styles.mobileApply}
                        onClick={() => setMenuOpen(false)}
                    >
                        Apply Now
                    </Link>
                </nav>
            )}
        </header>
    )
}

export default Navbar