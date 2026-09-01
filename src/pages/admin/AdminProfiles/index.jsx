import { useMemo, useState } from "react";
import styles from "./AdminProfiles.module.css";

function AdminProfiles() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Replace this with your Supabase data later.
    const users = [
        {
            id: 1,
            name: "Mukwende Libimba",
            email: "mukwende2000@gmail.com",
            job_title: "Chief Administrator",
            access_level: "Super Admin",
            status: "active",
            last_active: "Now",
            initials: "ML",
        },
        {
            id: 2,
            name: "David Chen",
            email: "d.chen@evmi.edu",
            job_title: "Admissions Officer",
            access_level: "Standard",
            status: "active",
            last_active: "1 day ago",
            initials: "DC",
        },
        {
            id: 3,
            name: "Marcus Reid",
            email: "m.reid@evmi.edu",
            job_title: "Finance Auditor",
            access_level: "Read-Only",
            status: "deactivated",
            last_active: "2 weeks ago",
            initials: "MR",
        },
        {
            id: 4,
            name: "Sarah Jenkins",
            email: "s.jenkins@evmi.edu",
            job_title: "Admissions Officer",
            access_level: "Standard",
            status: "inactive",
            last_active: "5 days ago",
            initials: "SJ",
        },
    ];

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                !searchValue ||
                user.name.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue) ||
                user.job_title.toLowerCase().includes(searchValue);

            const matchesRole =
                roleFilter === "all" ||
                user.job_title === roleFilter;

            const matchesStatus =
                statusFilter === "all" ||
                user.status === statusFilter;

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    }, [search, roleFilter, statusFilter]);

    const activeUsers = users.filter(
        (user) => user.status === "active"
    ).length;

    const inactiveUsers = users.filter(
        (user) => user.status === "inactive"
    ).length;

    const deactivatedUsers = users.filter(
        (user) => user.status === "deactivated"
    ).length;

    const getStatusLabel = (status) => {
        switch (status) {
            case "active":
                return "Active";

            case "inactive":
                return "Inactive";

            case "deactivated":
                return "Deactivated";

            default:
                return status;
        }
    };

    return (
        <div className={styles.page}>

            {/* Page Header */}
            <div className={styles.pageHeader}>
                <div>
                    <h1>User Management</h1>

                    <p>
                        Manage institutional access, assign roles,
                        and control administrator account status.
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.createButton}
                >
                    <span className="material-symbols-outlined">
                        add
                    </span>

                    Create User
                </button>
            </div>

            {/* Statistics */}
            <div className={styles.statsGrid}>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <span className="material-symbols-outlined">
                            group
                        </span>
                    </div>

                    <div>
                        <span>Total Users</span>
                        <strong>{users.length}</strong>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <span className="material-symbols-outlined">
                            verified_user
                        </span>
                    </div>

                    <div>
                        <span>Active Admins</span>
                        <strong>{activeUsers}</strong>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <span className="material-symbols-outlined">
                            pause_circle
                        </span>
                    </div>

                    <div>
                        <span>Inactive</span>
                        <strong>{inactiveUsers}</strong>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <span className="material-symbols-outlined">
                            block
                        </span>
                    </div>

                    <div>
                        <span>Deactivated</span>
                        <strong>{deactivatedUsers}</strong>
                    </div>
                </div>

            </div>

            {/* Users Card */}
            <section className={styles.usersCard}>

                {/* Toolbar */}
                <div className={styles.toolbar}>

                    <div className={styles.searchBox}>
                        <span className="material-symbols-outlined">
                            search
                        </span>

                        <input
                            type="text"
                            placeholder="Search profiles..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.filters}>

                        {/* Role */}
                        <div className={styles.selectWrapper}>
                            <select
                                value={roleFilter}
                                onChange={(e) =>
                                    setRoleFilter(e.target.value)
                                }
                            >
                                <option value="all">
                                    All Roles
                                </option>

                                <option value="Chief Administrator">
                                    Chief Administrator
                                </option>

                                <option value="Admissions Officer">
                                    Admissions Officer
                                </option>

                                <option value="Finance Auditor">
                                    Finance Auditor
                                </option>

                                <option value="Administrator">
                                    Administrator
                                </option>
                            </select>

                            <span className="material-symbols-outlined">
                                expand_more
                            </span>
                        </div>

                        {/* Status */}
                        <div className={styles.selectWrapper}>
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <option value="all">
                                    All Statuses
                                </option>

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                                <option value="deactivated">
                                    Deactivated
                                </option>
                            </select>

                            <span className="material-symbols-outlined">
                                expand_more
                            </span>
                        </div>

                    </div>
                </div>

                {/* Results */}
                <div className={styles.resultsInfo}>
                    Showing {filteredUsers.length} of{" "}
                    {users.length} users
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>

                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Access Level</th>
                                <th>Last Active</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>

                                        {/* User */}
                                        <td>
                                            <div className={styles.userCell}>

                                                <div className={styles.avatar}>
                                                    {user.initials}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {user.name}
                                                    </strong>

                                                    <span>
                                                        {user.email}
                                                    </span>
                                                </div>

                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td>
                                            <span
                                                className={
                                                    styles.roleBadge
                                                }
                                            >
                                                {user.job_title}
                                            </span>
                                        </td>

                                        {/* Access */}
                                        <td>
                                            <span
                                                className={
                                                    styles.accessLevel
                                                }
                                            >
                                                {user.access_level}
                                            </span>
                                        </td>

                                        {/* Last Active */}
                                        <td>
                                            <span
                                                className={
                                                    styles.lastActive
                                                }
                                            >
                                                {user.last_active}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <span
                                                className={`${styles.statusBadge} ${styles[user.status]}`}
                                            >
                                                <span
                                                    className={
                                                        styles.statusDot
                                                    }
                                                />

                                                {getStatusLabel(
                                                    user.status
                                                )}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td>
                                            <div
                                                className={
                                                    styles.actions
                                                }
                                            >

                                                {user.status ===
                                                    "deactivated" ? (
                                                    <button
                                                        type="button"
                                                        title="Restore"
                                                    >
                                                        <span className="material-symbols-outlined">
                                                            restore
                                                        </span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        title={
                                                            user.status ===
                                                                "active"
                                                                ? "Deactivate"
                                                                : "Activate"
                                                        }
                                                    >
                                                        <span className="material-symbols-outlined">
                                                            {user.status ===
                                                                "active"
                                                                ? "block"
                                                                : "check_circle"}
                                                        </span>
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    title="Edit User"
                                                >
                                                    <span className="material-symbols-outlined">
                                                        edit
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    title="More Options"
                                                >
                                                    <span className="material-symbols-outlined">
                                                        more_vert
                                                    </span>
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className={
                                            styles.emptyState
                                        }
                                    >
                                        <span className="material-symbols-outlined">
                                            person_search
                                        </span>

                                        <strong>
                                            No users found
                                        </strong>

                                        <p>
                                            Try changing your search
                                            or filter options.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                {/* Pagination */}
                <div className={styles.pagination}>

                    <span>
                        Showing {filteredUsers.length} of{" "}
                        {users.length} entries
                    </span>

                    <div>
                        <button
                            type="button"
                            disabled
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            className={styles.currentPage}
                        >
                            1
                        </button>

                        <button type="button">
                            Next
                        </button>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default AdminProfiles;
