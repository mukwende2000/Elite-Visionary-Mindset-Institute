import { useEffect, useState } from "react";
import courses from "../../data/courses";
import CourseCard from "../../componets/courses/CourseCard";
import styles from "./Courses.module.css";
import enroll from '../../assets/images/enroll.jpeg'

function Courses() {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const openModal = (course) => {
        setSelectedCourse(course);
    };

    const closeModal = () => {
        setSelectedCourse(null);
    };

    // Prevent background scrolling while the modal is open
    useEffect(() => {
        if (selectedCourse) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedCourse]);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroContainer}>

                    <div className={styles.heroContent}>
                        <span className={styles.heroEyebrow}>
                            ELITE VISIONARY MINDSET INSTITUTE
                        </span>

                        <h1>
                            Build the expertise
                            <span> that moves you forward.</span>
                        </h1>

                        <p>
                            Develop practical leadership, business, and professional
                            capabilities through certificate programmes designed for
                            ambitious professionals and emerging leaders.
                        </p>

                        <div className={styles.heroActions}>
                            <a href="/apply" className={styles.heroPrimaryButton}>
                                Apply Now
                                <span className="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </a>

                            <a href="#programmes" className={styles.heroSecondaryButton}>
                                Explore Programmes
                            </a>
                        </div>

                        <div className={styles.heroStats}>
                            <div>
                                <strong>Industry-led</strong>
                                <span>Practical learning</span>
                            </div>

                            <div>
                                <strong>Flexible</strong>
                                <span>Learning modes</span>
                            </div>

                            <div>
                                <strong>Career-focused</strong>
                                <span>Professional growth</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.heroVisual}>
                        <img
                            src={enroll}
                            alt="Professionals engaged in a modern academic learning environment"
                        />

                        <div className={styles.heroImageCard}>
                            <span className="material-symbols-outlined">
                                school
                            </span>

                            <div>
                                <strong>Learn. Apply. Lead.</strong>
                                <span>Professional education built for impact.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className={styles.courseSection}>
                <div className={styles.container}>
                    <div className={styles.courseGrid}>
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onViewDetails={openModal}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {selectedCourse && (
                <div className={styles.modal}>
                    {/* Backdrop */}
                    <button
                        type="button"
                        aria-label="Close modal"
                        onClick={closeModal}
                        className={styles.modalBackdrop}
                    />

                    {/* Modal */}
                    <div
                        className={styles.modalContent}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="course-modal-title"
                    >
                        {/* Modal Header */}
                        <div className={styles.modalHeader}>
                            <div>
                                <div className={styles.modalEyebrow}>
                                    Programme Details
                                </div>

                                <h2 id="course-modal-title">
                                    {selectedCourse.title}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className={styles.closeButton}
                                aria-label="Close course details"
                            >
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        {/* Modal Body */}
                        <div className={styles.modalBody}>
                            {/* Left Content */}
                            <div className={styles.modalMain}>
                                {/* Course Stats */}
                                <div className={styles.modalStats}>
                                    <ModalStat
                                        icon="schedule"
                                        label="Duration"
                                        value={selectedCourse.duration}
                                    />

                                    <ModalStat
                                        icon="computer"
                                        label="Mode"
                                        value={selectedCourse.mode}
                                    />

                                    <ModalStat
                                        icon="verified"
                                        label="Credits"
                                        value={selectedCourse.credits}
                                    />

                                    <ModalStat
                                        icon="payments"
                                        label="Fee"
                                        value={selectedCourse.fee}
                                    />
                                </div>

                                {/* Programme Overview */}
                                <div className={styles.overview}>
                                    <h3>Programme Overview</h3>

                                    <p>{selectedCourse.overview}</p>
                                </div>

                                {/* Entry Requirements */}
                                <div className={styles.requirements}>
                                    <h4>
                                        <span className="material-symbols-outlined">
                                            fact_check
                                        </span>

                                        Entry Requirements
                                    </h4>

                                    <ul>
                                        {selectedCourse.requirements.map((requirement) => (
                                            <li key={requirement}>{requirement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className={styles.modalImage}>
                                <img
                                    src={selectedCourse.image}
                                    alt={selectedCourse.title}
                                />
                            </div>
                        </div>
                        {/* Modal Footer */}
                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                onClick={closeModal}
                                className={styles.modalCloseButton}
                            >
                                Close
                            </button>

                            <a
                                href="/apply"
                                className={styles.modalApplyButton}
                            >
                                Apply for Programme
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ModalStat({ icon, label, value }) {
    return (
        <div className={styles.modalStat}>
            <span className="material-symbols-outlined">
                {icon}
            </span>

            <div className={styles.modalStatLabel}>
                {label}
            </div>

            <div className={styles.modalStatValue}>
                {value}
            </div>
        </div>
    );
}

export default Courses;