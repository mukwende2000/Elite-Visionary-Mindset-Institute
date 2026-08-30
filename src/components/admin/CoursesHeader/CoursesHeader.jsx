import { Link } from "react-router-dom";
import styles from "./CoursesHeader.module.css";

function CoursesHeader({ onAddCourse }) {
    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <h1 className={styles.title}>Courses</h1>

                <p className={styles.description}>
                    Manage and organize EVMI's academic programmes
                </p>
            </div>

            <Link
                to={`/admin/add-course`}
                className={styles.addButton}
            >
                <span className={`material-symbols-outlined ${styles.icon}`}>
                    add
                </span>

                Add Course
            </Link>
        </div>
    );
}

export default CoursesHeader;