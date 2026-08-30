import styles from "./CourseDetailsContent.module.css";

function CourseDetailsContent({ course }) {
    return (
        <section className={styles.content}>
            <div className={styles.card}>
                <h2>Course Information</h2>

                <div className={styles.grid}>
                    <div className={styles.item}>
                        <span>Category</span>
                        <strong>
                            {course.category || "—"}
                        </strong>
                    </div>

                    <div className={styles.item}>
                        <span>Duration</span>
                        <strong>
                            {course.duration || "—"}
                        </strong>
                    </div>

                    <div className={styles.item}>
                        <span>Mode</span>
                        <strong>
                            {course.mode || "—"}
                        </strong>
                    </div>

                    <div className={styles.item}>
                        <span>Credits</span>
                        <strong>
                            {course.credits ?? "—"}
                        </strong>
                    </div>

                    <div className={styles.item}>
                        <span>Fee</span>
                        <strong>
                            {course.fee
                                ? `$${Number(
                                    course.fee
                                ).toLocaleString()}`
                                : "—"}
                        </strong>
                    </div>

                    <div className={styles.item}>
                        <span>Course ID</span>
                        <strong>{course.id}</strong>
                    </div>
                </div>
            </div>

            {course.description && (
                <div className={styles.card}>
                    <h2>Description</h2>

                    <p className={styles.description}>
                        {course.description}
                    </p>
                </div>
            )}
        </section>
    );
}

export default CourseDetailsContent;