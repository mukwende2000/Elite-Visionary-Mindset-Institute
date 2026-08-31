import { useNavigate } from "react-router-dom";
import styles from "./CourseCard.module.css";

function CourseCard({ course }) {
    const navigate = useNavigate();

    return (
        <article className={styles.courseCard}>
            <div className={styles.cardImage}>
                <img
                    src={course.image_url}
                    alt={course.title}
                />

                <div className={styles.accreditedBadge}>
                    <span className="material-symbols-outlined">
                        workspace_premium
                    </span>
                    Accredited
                </div>
            </div>

            <div className={styles.cardContent}>
                <div className={styles.category}>
                    {course.category}
                </div>

                <h2>{course.title}</h2>

                <p className={styles.description}>
                    {course.description}
                </p>

                <div className={styles.metadata}>
                    <div className={styles.metadataItem}>
                        <span className="material-symbols-outlined">
                            schedule
                        </span>

                        {course.duration}
                    </div>

                    <div className={styles.metadataItem}>
                        <span className="material-symbols-outlined">
                            menu_book
                        </span>

                        {course.study_mode}
                    </div>
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/courses/${course.id}`)
                        }
                        className={styles.detailsButton}
                    >
                        View Details
                    </button>

                    <a
                        href="/apply"
                        className={styles.applyButton}
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </article>
    );
}

export default CourseCard;

