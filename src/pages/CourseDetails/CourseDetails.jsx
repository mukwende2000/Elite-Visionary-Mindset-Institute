import { Link, useParams } from "react-router-dom";
import courses from "../../data/courses";
import styles from "./CourseDetails.module.css";

function CourseDetails() {
    const { courseId } = useParams();

    const course = courses.find(
        (course) => course.id === Number(courseId)
    );

    if (!course) {
        return (
            <main className={styles.notFound}>
                <span className="material-symbols-outlined">
                    school
                </span>

                <h1>Programme Not Found</h1>

                <p>
                    The programme you are looking for could not be found.
                </p>

                <Link to="/courses" className={styles.backButton}>
                    View All Programmes
                </Link>
            </main>
        );
    }

    return (
        <main className={styles.page}>

            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>

                    <div className={styles.heroContent}>

                        <Link
                            to="/courses"
                            className={styles.backLink}
                        >
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>
                            All Programmes
                        </Link>

                        <span className={styles.category}>
                            {course.category}
                        </span>

                        <h1>{course.title}</h1>

                        <p className={styles.description}>
                            {course.description}
                        </p>

                        <div className={styles.heroActions}>
                            <Link
                                to={`/apply?course=${course.id}`}
                                className={styles.applyButton}
                            >
                                Apply for this programme
                                <span className="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>

                    </div>

                    <div className={styles.heroImage}>
                        <img
                            src={course.image}
                            alt={course.title}
                        />
                    </div>

                </div>
            </section>

            {/* PROGRAMME DETAILS */}
            <section className={styles.detailsSection}>
                <div className={styles.container}>

                    <div className={styles.detailsGrid}>

                        <div className={styles.mainContent}>

                            <section className={styles.contentBlock}>
                                <span className={styles.eyebrow}>
                                    Programme Overview
                                </span>

                                <h2>
                                    Develop practical skills that
                                    move your career forward.
                                </h2>

                                <p>
                                    {course.overview}
                                </p>
                            </section>

                            <section className={styles.contentBlock}>
                                <span className={styles.eyebrow}>
                                    Entry Requirements
                                </span>

                                <h2>
                                    What you need to apply
                                </h2>

                                <ul className={styles.requirements}>
                                    {course.requirements.map(
                                        (requirement, index) => (
                                            <li key={index}>
                                                <span className="material-symbols-outlined">
                                                    check_circle
                                                </span>

                                                <span>
                                                    {requirement}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </section>

                        </div>

                        {/* SIDEBAR */}
                        <aside className={styles.sidebar}>

                            <div className={styles.infoCard}>

                                <h3>
                                    Programme Information
                                </h3>

                                <div className={styles.infoItem}>
                                    <span className="material-symbols-outlined">
                                        schedule
                                    </span>

                                    <div>
                                        <span>Duration</span>
                                        <strong>
                                            {course.duration}
                                        </strong>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className="material-symbols-outlined">
                                        laptop
                                    </span>

                                    <div>
                                        <span>Study Mode</span>
                                        <strong>
                                            {course.mode}
                                        </strong>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className="material-symbols-outlined">
                                        school
                                    </span>

                                    <div>
                                        <span>Credits</span>
                                        <strong>
                                            {course.credits}
                                        </strong>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <span className="material-symbols-outlined">
                                        payments
                                    </span>

                                    <div>
                                        <span>Programme Fee</span>
                                        <strong>
                                            {course.fee}
                                        </strong>
                                    </div>
                                </div>

                                <Link
                                    to={`/apply?course=${course.id}`}
                                    className={styles.sidebarButton}
                                >
                                    Apply Now
                                    <span className="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </Link>

                            </div>

                        </aside>

                    </div>
                </div>
            </section>

        </main>
    );
}

export default CourseDetails;