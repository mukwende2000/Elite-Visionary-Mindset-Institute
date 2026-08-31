import styles from "./CoursesTable.module.css";
import CourseRow from "./CourseRow"

function CoursesTable({
    courses,
    onView,
    onEdit,
    onDelete,
}) {
    if (!courses.length) {
        return (
            <div className={styles.tableContainer}>
                <div className={styles.empty}>
                    <span
                        className={`material-symbols-outlined ${styles.emptyIcon}`}
                    >
                        school
                    </span>

                    <p>No courses found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.headerRow}>
                            <th className={styles.headerCell}>
                                Course
                            </th>

                            <th className={styles.headerCell}>
                                Category
                            </th>

                            <th className={styles.headerCell}>
                                Duration
                            </th>

                            <th className={styles.headerCell}>
                                Mode
                            </th>

                            <th className={styles.headerCell}>
                                Credits
                            </th>

                            <th className={styles.headerCell}>
                                Fee
                            </th>

                            <th className={styles.headerCell}>
                                Status
                            </th>

                            <th
                                className={`${styles.headerCell} ${styles.actionsHeader}`}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className={styles.body}>
                        {courses.map((course) => (
                            <CourseRow
                                key={course.id}
                                course={course}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CoursesTable;