import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import { supabase } from "../lib/supabase";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout failed:", error);
            return;
        }

        navigate("/admin/login");
    };
    return (
        <div className={styles.layout}>

            {/* Sidebar */}
            <AdminSidebar handleLogout={handleLogout} />

            {/* Main */}
            <div className={styles.main}>

                {/* Header */}
                <header className={styles.header}>

                    <div className={styles.mobileHeader}>
                        <button className={styles.menuButton}>
                            <span className="material-symbols-outlined">
                                menu
                            </span>
                        </button>

                        <span className={styles.mobileLogo}>
                            EVMI Admin
                        </span>
                    </div>

                    <div className={styles.headerTitle}>
                        <h1>Admissions Overview</h1>
                    </div>

                    <div className={styles.headerActions}>

                        <button className={styles.notificationButton}>
                            <span className="material-symbols-outlined">
                                notifications
                            </span>

                            <span className={styles.notificationDot}></span>
                        </button>

                        <div className={styles.profile}>
                            <div className={styles.profileInfo}>
                                <p>Dr. A. Sterling</p>
                                <span>Chief Administrator</span>
                            </div>

                            <div className={styles.avatar}>
                                AS
                            </div>
                        </div>

                    </div>
                </header>

                {/* Page Content */}
                <main className={styles.content}>
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default AdminLayout;