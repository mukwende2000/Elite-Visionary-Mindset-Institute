import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.css";
import { supabase } from "../lib/supabase";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout failed:", error);
            return;
        }

        navigate("/admin/login");
    };

    useEffect(() => {
        const loadProfile = async () => {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (!user) {
                navigate("/admin/login");
                return;
            }

            const { data, error } = await supabase
                .from("admin_profiles")
                .select("*")
                .eq("id", user.id)
                .single()

            if (error) {
                console.error(
                    "Failed to load admin profile:",
                    error
                );
                return;
            }

            setProfile(data);
        };

        loadProfile();
    }, [navigate]);

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <div className={styles.layout}>

            {/* Sidebar */}
            <AdminSidebar handleLogout={handleLogout} />

            {/* Main */}
            <div className={styles.main}>

                {/* Header */}
                <header className={styles.header}>

                    {/* Mobile Header */}
                    <div className={styles.mobileHeader}>
                        <button
                            type="button"
                            className={styles.menuButton}
                        >
                            <span className="material-symbols-outlined">
                                menu
                            </span>
                        </button>

                        <span className={styles.mobileLogo}>
                            EVMI Admin
                        </span>
                    </div>

                    {/* Page Title */}
                    <div className={styles.headerTitle}>
                        <h1>Admissions Overview</h1>
                    </div>

                    {/* Header Actions */}
                    <div className={styles.headerActions}>

                        {/* Notifications */}
                        <button
                            type="button"
                            className={
                                styles.notificationButton
                            }
                        >
                            <span className="material-symbols-outlined">
                                notifications
                            </span>

                            <span
                                className={
                                    styles.notificationDot
                                }
                            />
                        </button>

                        {/* Profile */}
                        <div className={styles.profile}>

                            <button
                                type="button"
                                className={styles.profileButton}
                                onClick={() =>
                                    setProfileOpen(
                                        (open) => !open
                                    )
                                }
                            >
                                {/* Profile Information */}
                                <div
                                    className={
                                        styles.profileInfo
                                    }
                                >
                                    <p>
                                        {profile?.full_name ||
                                            "Administrator"}
                                    </p>

                                    <span>
                                        {profile?.job_title ||
                                            "Administrator"}
                                    </span>
                                </div>

                                {/* Profile Image / Initials */}
                                {profile?.avatar_url ? (
                                    <img
                                        src={profile.avatar_url}
                                        alt={
                                            profile.full_name ||
                                            "Administrator"
                                        }
                                        className={
                                            styles.avatarImage
                                        }
                                    />
                                ) : (
                                    <div
                                        className={
                                            styles.avatar
                                        }
                                    >
                                        {getInitials(
                                            profile?.full_name
                                        )}
                                    </div>
                                )}

                                {/* Dropdown Arrow */}
                                <span
                                    className={`material-symbols-outlined ${styles.profileArrow}`}
                                >
                                    {profileOpen
                                        ? "expand_less"
                                        : "expand_more"}
                                </span>
                            </button>

                            {/* Profile Dropdown */}
                            {profileOpen && (
                                <div
                                    className={
                                        styles.profileDropdown
                                    }
                                >

                                    {/* Dropdown Profile Header */}
                                    <div
                                        className={
                                            styles.dropdownHeader
                                        }
                                    >

                                        {profile?.avatar_url ? (
                                            <img
                                                src={
                                                    profile.avatar_url
                                                }
                                                alt={
                                                    profile.full_name ||
                                                    "Administrator"
                                                }
                                                className={
                                                    styles.dropdownAvatarImage
                                                }
                                            />
                                        ) : (
                                            <div
                                                className={
                                                    styles.dropdownAvatar
                                                }
                                            >
                                                {getInitials(
                                                    profile?.full_name
                                                )}
                                            </div>
                                        )}

                                        <div>
                                            <strong>
                                                {profile?.full_name ||
                                                    "Administrator"}
                                            </strong>

                                            <span>
                                                {profile?.job_title ||
                                                    "Administrator"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div
                                        className={
                                            styles.dropdownDivider
                                        }
                                    />

                                    {/* My Profile */}
                                    <button
                                        type="button"
                                        className={
                                            styles.profileItem
                                        }
                                        onClick={() => {
                                            setProfileOpen(
                                                false
                                            );

                                            navigate(
                                                "/admin/profile"
                                            );
                                        }}
                                    >
                                        <span className="material-symbols-outlined">
                                            person
                                        </span>

                                        <span>
                                            My Profile
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.profileItem}
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate("/admin/profiles");
                                        }}
                                    >
                                        <span className="material-symbols-outlined">
                                            manage_accounts
                                        </span>

                                        <span>
                                            Manage Profiles
                                        </span>
                                    </button>

                                    {/* Sign Out */}
                                    <button
                                        type="button"
                                        className={`${styles.profileItem} ${styles.signOutItem}`}
                                        onClick={() => {
                                            setProfileOpen(false);
                                            handleLogout();
                                        }}
                                    >
                                        <span className="material-symbols-outlined">
                                            logout
                                        </span>

                                        <span>
                                            Sign Out
                                        </span>
                                    </button>
                                </div>
                            )}

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

