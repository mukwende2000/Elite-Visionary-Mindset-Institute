import { useEffect, useState } from "react";
import courses from "../../data/courses";
import CourseCard from "../../componets/courses/CourseCard";
import styles from "./Courses.module.css";

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
                        <h1>Our Certificate Programmes</h1>

                        <p>
                            Elevate your career with our industry-aligned certificate
                            programmes. Designed for ambitious professionals seeking
                            rigorous academic foundations and practical expertise.
                        </p>
                    </div>

                    <div className={styles.heroImageWrapper}>
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyroRu6DQLTf80KCDrPVlniXGlTYvxbcBkDTE5kfAVIcRG3kK_uiV8OYnBNcFhVfHDCGTdGqo9YHX3gBXlvlQQW2gq1lGWrw94fnO8ZfT8iZQch630X_epeOU5z4lw1hn1o0WgWcib0ljjLYYYA_niDgqQ6h_-O996YiamYuM7l0yjY52X86y-fNWTZNHxMpz5kZH4wAzZbNmdHzxwIjNVwQfWqxFCtWdYVU5xplb_b0-V6mXuiJ4"
                            alt="Professionals engaged in a modern academic learning environment"
                        />
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
                        <div className={styles.modalBody}>
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