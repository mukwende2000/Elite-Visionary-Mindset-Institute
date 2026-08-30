import styles from "./CourseOverview.module.css";

function CourseOverview({ course }) {
    return (
        <section className={styles.card}>
            <div className={styles.imageWrapper}>
                {course.image_url ? (
                    <img
                        src={course.image_url}
                        alt={course.title}
                    />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        <span className="material-symbols-outlined">
                            school
                        </span>
                    </div>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.top}>
                    <span
                        className={`${styles.status} ${course.is_active
                                ? styles.active
                                : styles.inactive
                            }`}
                    >
                        {course.is_active
                            ? "Active"
                            : "Inactive"}
                    </span>

                    {course.is_featured && (
                        <span className={styles.featured}>
                            Featured
                        </span>
                    )}
                </div>

                <h2>{course.title}</h2>

                {course.description && (
                    <p>{course.description}</p>
                )}
            </div>
        </section>
    );
}

export default CourseOverview;