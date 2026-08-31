import styles from './AdminSidebar.module.css'
import { NavLink } from 'react-router-dom'

function AdminSidebar({ handleLogout }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                EVMI Admin
            </div>

            <nav className={styles.nav}>
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        dashboard
                    </span>

                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin/applications"
                    className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        folder_open
                    </span>

                    <span>Applications</span>
                </NavLink>

                <NavLink
                    to="/admin/payments"
                    className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        payments
                    </span>

                    <span>Payments</span>
                </NavLink>
                <NavLink
                    to="/admin/courses"
                    className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`
                    }
                >
                    <span className="material-symbols-outlined">
                        school
                    </span>

                    <span>courses</span>
                </NavLink>
            </nav>

            <div className={styles.logoutContainer}>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    <span className="material-symbols-outlined">
                        logout
                    </span>

                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    )
}

export default AdminSidebar
