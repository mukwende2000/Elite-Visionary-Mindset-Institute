import { useMemo, useState } from "react";
import styles from "./AdminProfiles.module.css";
import { useNavigate } from "react-router-dom";

function AdminProfiles() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all"); const navigate = useNavigate();

    const users = [];

    const filteredUsers = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        return users.filter((user) => {
            const matchesSearch =
                !searchValue ||
                user.name
                    ?.toLowerCase()
                    .includes(searchValue) ||
                user.email
                    ?.toLowerCase()
                    .includes(searchValue) ||
                user.job_title
                    ?.toLowerCase()
                    .includes(searchValue);

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
                    onClick={() =>
                        navigate("/admin/create_user")
                    }
                >
                    <span className="material-symbols-outlined">
                        add
                    </span>

                    Create User
                </button>
            </div>

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
                        <strong>
                            {deactivatedUsers}
                        </strong>
                    </div>
                </div>
            </div>

            <section className={styles.usersCard}>
                <div className={styles.toolbar}>
                    <div className={styles.searchBox}>
                        <span className="material-symbols-outlined">
                            search
                        </span>

                        <input
                            type="text"
                            placeholder="Search profiles..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />
                    </div>

                    <div className={styles.filters}>
                        <div
                            className={
                                styles.selectWrapper
                            }
                        >
                            <select
                                value={roleFilter}
                                onChange={(event) =>
                                    setRoleFilter(
                                        event.target.value
                                    )
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

                        <div
                            className={
                                styles.selectWrapper
                            }
                        >
                            <select
                                value={statusFilter}
                                onChange={(event) =>
                                    setStatusFilter(
                                        event.target.value
                                    )
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

                <div className={styles.resultsInfo}>
                    Showing {filteredUsers.length} of{" "}
                    {users.length} users
                </div>

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
                                        <td>
                                            <div
                                                className={
                                                    styles.userCell
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.avatar
                                                    }
                                                >
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

                                        <td>
                                            <span
                                                className={
                                                    styles.roleBadge
                                                }
                                            >
                                                {user.job_title}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    styles.accessLevel
                                                }
                                            >
                                                {user.access_level}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    styles.lastActive
                                                }
                                            >
                                                {user.last_active}
                                            </span>
                                        </td>

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

                                        <td>
                                            <div
                                                className={
                                                    styles.actions
                                                }
                                            >
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
                                            No users to display
                                        </strong>

                                        <p>
                                            There are currently no
                                            administrator profiles
                                            available.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

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
                            className={
                                styles.currentPage
                            }
                        >
                            1
                        </button>

                        <button
                            type="button"
                            disabled
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminProfiles;