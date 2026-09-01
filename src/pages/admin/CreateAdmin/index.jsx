import { useState } from "react";
import styles from "./CreateAdmin.module.css";

const permissions = [
    {
        id: "applications",
        icon: "assignment",
        title: "Can manage applications",
        description: "Review, approve, or reject student enrollments.",
    },
    {
        id: "financial",
        icon: "account_balance",
        title: "Can view financial data",
        description: "Access tuition records and institutional budgets.",
    },
    {
        id: "courses",
        icon: "library_books",
        title: "Can edit course catalog",
        description: "Add, modify, or retire academic programs.",
    },
];

export default function CreateAdmin() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        primaryRole: "",
        accessLevel: "",
    });

    const [permissionState, setPermissionState] = useState({
        applications: false,
        financial: false,
        courses: false,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const togglePermission = (id) => {
        setPermissionState((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            ...formData,
            permissions: permissionState,
        };

        console.log("Creating user:", payload);
    };

    return (
        <div className={styles.page}>
            <div className={styles.panel}>
                {/* Header */}
                <div className={styles.panelHeader}>
                    <div>
                        <h1 className={styles.title}>Create New User</h1>

                        <p className={styles.subtitle}>
                            Configure profile, roles, and system permissions.
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.closeButton}
                        aria-label="Close panel"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Personal Details */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className="material-symbols-outlined">
                                    person
                                </span>

                                Personal Details
                            </h2>

                            <div className={styles.formGrid}>
                                <div className={styles.field}>
                                    <label htmlFor="firstName">First Name</label>

                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="lastName">Last Name</label>

                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <label htmlFor="email">
                                        Email (Institutional)
                                    </label>

                                    <div className={styles.inputWithIcon}>
                                        <span className="material-symbols-outlined">
                                            mail
                                        </span>

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="e.g., jane.doe@evmi.edu"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Role Assignment */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className="material-symbols-outlined">
                                    shield_person
                                </span>

                                Role Assignment
                            </h2>

                            <div className={styles.formGrid}>
                                <div className={styles.field}>
                                    <label htmlFor="primaryRole">
                                        Primary Role
                                    </label>

                                    <div className={styles.selectWrapper}>
                                        <select
                                            id="primaryRole"
                                            name="primaryRole"
                                            value={formData.primaryRole}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Select Role
                                            </option>
                                            <option value="admin">Admin</option>
                                            <option value="admissions">Admissions</option>
                                            <option value="finance">Finance</option>
                                            <option value="faculty">Faculty</option>
                                        </select>

                                        <span className="material-symbols-outlined">
                                            expand_more
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="accessLevel">
                                        Access Level
                                    </label>

                                    <div className={styles.selectWrapper}>
                                        <select
                                            id="accessLevel"
                                            name="accessLevel"
                                            value={formData.accessLevel}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Select Level
                                            </option>
                                            <option value="restricted">
                                                Restricted
                                            </option>
                                            <option value="standard">
                                                Standard
                                            </option>
                                            <option value="super_admin">
                                                Super Admin
                                            </option>
                                        </select>

                                        <span className="material-symbols-outlined">
                                            expand_more
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Permissions */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className="material-symbols-outlined">
                                    key
                                </span>

                                Specific Permissions
                            </h2>

                            <div className={styles.permissionsBox}>
                                {permissions.map((permission) => {
                                    const enabled = permissionState[permission.id];

                                    return (
                                        <div
                                            key={permission.id}
                                            className={styles.permission}
                                        >
                                            <div className={styles.permissionInfo}>
                                                <div className={styles.permissionIcon}>
                                                    <span className="material-symbols-outlined">
                                                        {permission.icon}
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className={styles.permissionTitle}>
                                                        {permission.title}
                                                    </span>

                                                    <span className={styles.permissionDescription}>
                                                        {permission.description}
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={enabled}
                                                aria-label={permission.title}
                                                className={`${styles.toggle} ${enabled ? styles.toggleActive : ""
                                                    }`}
                                                onClick={() =>
                                                    togglePermission(permission.id)
                                                }
                                            >
                                                <span className={styles.toggleThumb} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Footer */}
                        <div className={styles.actions}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={styles.createButton}
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}