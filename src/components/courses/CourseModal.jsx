import styles from './CourseModal.module.css'
import { Link } from 'react-router-dom';
function CourseModal({ selectedCourse, closeModal }) {
    return (
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

                    <Link
                        to="/apply"
                        className={styles.modalApplyButton}
                    >
                        Apply for Programme
                    </Link>
                </div>
            </div>
        </div>

    )
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

export default CourseModal
