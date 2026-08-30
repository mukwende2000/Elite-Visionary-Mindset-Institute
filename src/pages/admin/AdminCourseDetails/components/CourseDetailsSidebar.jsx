import styles from "./CourseDetailsSidebar.module.css";

function CourseDetailsSidebar({ course }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.card}>
                <h2>Programme Status</h2>

                <div className={styles.statusRow}>
                    <span>Status</span>

                    <strong
                        className={
                            course.is_active
                                ? styles.active
                                : styles.inactive
                        }
                    >
                        {course.is_active
                            ? "Active"
                            : "Inactive"}
                    </strong>
                </div>

                <div className={styles.statusRow}>
                    <span>Featured</span>

                    <strong>
                        {course.is_featured
                            ? "Yes"
                            : "No"}
                    </strong>
                </div>
            </div>

            <div className={styles.card}>
                <h2>Quick Actions</h2>

                <button type="button">
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                    Edit Course
                </button>

                <button type="button">
                    <span className="material-symbols-outlined">
                        visibility
                    </span>
                    View Public Page
                </button>
            </div>
        </aside>
    );
}

export default CourseDetailsSidebar;