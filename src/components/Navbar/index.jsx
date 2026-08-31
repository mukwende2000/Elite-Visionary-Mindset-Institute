import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
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

                </Link>
                <ul className={styles.desktopNav}>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? styles.navLinkActive : styles.navLink
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/courses"
                        className={({ isActive }) =>
                            isActive ? styles.navLinkActive : styles.navLink
                        }
                    >
                        Courses
                    </NavLink>

                    <NavLink
                        to="/apply"
                        className={({ isActive }) =>
                            isActive ? styles.navLinkActive : styles.navLink
                        }
                    >
                        Apply
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? styles.navLinkActive : styles.navLink
                        }
                    >
                        About
                    </NavLink>
                </ul>

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