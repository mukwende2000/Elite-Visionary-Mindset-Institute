import { Link } from "react-router-dom";
import styles from "./CourseRow.module.css";

function CourseRow({
    course,
    onView,
    onEdit,
    onDelete,
}) {
    return (
        <tr className={styles.row}>
            {/* Course */}
            <td className={styles.cell}>
                <div className={styles.course}>
                    <img
                        className={styles.image}
                        src={course.image_url}
                        alt={course.title}
                    />

                    <div className={styles.courseInfo}>
                        <div className={styles.title}>
                            {course.title}
                        </div>

                        {course.short_title && (
                            <div className={styles.shortTitle}>
                                {course.short_title}
                            </div>
                        )}
                    </div>
                </div>
            </td>

            {/* Category */}
            <td className={styles.cell}>
                {course.category || "—"}
            </td>

            {/* Duration */}
            <td className={styles.cell}>
                {course.duration || "—"}
            </td>

            {/* Mode */}
            <td className={styles.cell}>
                {course.study_mode || "—"}
            </td>

            {/* Credits */}
            <td className={styles.cell}>
                {course.credits ?? "—"}
            </td>

            {/* Fee */}
            <td className={styles.cell}>
                {course.fee != null
                    ? `$${Number(course.fee).toLocaleString()}`
                    : "—"}
            </td>

            {/* Status */}
            <td className={styles.cell}>
                <span
                    className={`${styles.status} ${course.is_active
                        ? styles.active
                        : styles.inactive
                        }`}
                >
                    {course.is_active ? "Active" : "Inactive"}
                </span>
            </td>

            {/* Actions */}
            <td className={`${styles.cell} ${styles.actionsCell}`}>
                <div className={styles.actions}>
                    <Link
                        to={`/admin/courses/${course.id}`}
                        className={styles.viewButton}
                    >
                        View
                    </Link>

                    <button
                        type="button"
                        className={styles.moreButton}
                        onClick={() => onEdit(course)}
                        aria-label={`Manage ${course.title}`}
                    >
                        <span className="material-symbols-outlined">
                            more_vert
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default CourseRow;