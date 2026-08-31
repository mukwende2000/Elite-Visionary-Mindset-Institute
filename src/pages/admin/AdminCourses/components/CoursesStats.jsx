import styles from "./CoursesStats.module.css";

function CoursesStats({ total, active, inactive }) {
    return (
        <div className={styles.stats}>
            <div className={styles.stat}>
                <span className={styles.label}>
                    Total Courses:
                </span>

                <span className={styles.value}>
                    {total}
                </span>
            </div>

            <div className={styles.divider} />

            <div className={styles.stat}>
                <span className={styles.label}>
                    Active:
                </span>

                <span className={styles.value}>
                    {active}
                </span>
            </div>

            <div className={styles.divider} />

            <div className={`${styles.stat} ${styles.inactive}`}>
                <span className={styles.label}>
                    Inactive:
                </span>

                <span className={styles.value}>
                    {inactive}
                </span>
            </div>
        </div>
    );
}

export default CoursesStats;