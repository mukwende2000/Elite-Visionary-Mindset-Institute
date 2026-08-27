import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"
import logo from '../../../assets/logo.jpeg'

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
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/courses">Courses</NavLink>
                    <NavLink to="/apply">Apply</NavLink>
                    <NavLink to="/about">About Us</NavLink>
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