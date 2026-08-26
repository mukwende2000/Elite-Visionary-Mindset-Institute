import styles from "./PaymentConfirmation.module.css";

function ApplicationConfirmation({ application, onReturnHome }) {
    if (!application) {
        return (
            <main className={styles.page}>
                <div className={styles.emptyState}>
                    <span className="material-symbols-outlined">error</span>
                    <h1>Application Information Unavailable</h1>
                    <p>
                        We could not load your application confirmation details.
                    </p>
                </div>
            </main>
        );
    }

    const reference = `EVMI-${application.id
        ?.replace(/-/g, "")
        .slice(0, 8)
        .toUpperCase()}`;

    return (
        <main className={styles.page}>
            {/* Application Stepper */}
            <div className={styles.stepper}>
                <div className={styles.stepLine}></div>

                {[
                    "Info",
                    "Academic",
                    "Docs",
                    "Review",
                    "Payment",
                    "Confirmation",
                ].map((step, index) => {
                    const isConfirmation = index === 5;

                    return (
                        <div
                            key={step}
                            className={`${styles.step} ${isConfirmation ? styles.activeStep : styles.completedStep
                                }`}
                        >
                            <div className={styles.stepCircle}>
                                {isConfirmation ? (
                                    "6"
                                ) : (
                                    <span className="material-symbols-outlined">
                                        check
                                    </span>
                                )}
                            </div>

                            <span>{step}</span>
                        </div>
                    );
                })}
            </div>

            {/* Success Message */}
            <section className={styles.successSection}>
                <div className={styles.successIcon}>
                    <span className="material-symbols-outlined">
                        check_circle
                    </span>
                </div>

                <h1>Application Submitted Successfully</h1>

                <p>
                    Thank you for applying to EVMI. Your application has been
                    successfully received.
                </p>
            </section>

            {/* Receipt */}
            <section className={styles.receiptCard}>
                <div className={styles.receiptAccent}></div>

                <div className={styles.receiptHeader}>
                    <h2>Official Admissions Receipt</h2>

                    <span className="material-symbols-outlined">
                        verified
                    </span>
                </div>

                <div className={styles.detailsGrid}>
                    <div className={styles.detail}>
                        <span>Application Reference #</span>
                        <strong>{reference}</strong>
                    </div>

                    <div className={styles.detail}>
                        <span>Applicant Name</span>
                        <strong>
                            {application.first_name} {application.other_names}{" "}
                            {application.surname}
                        </strong>
                    </div>

                    <div className={styles.detail}>
                        <span>Programme</span>
                        <strong>{application.programme}</strong>
                    </div>

                    <div className={styles.detail}>
                        <span>Mode of Study</span>
                        <strong>{application.study_mode}</strong>
                    </div>

                    <div className={styles.detail}>
                        <span>Intake</span>
                        <strong>{application.intake}</strong>
                    </div>

                    <div className={styles.detail}>
                        <span>Payment Status</span>

                        <span className={styles.status}>
                            <span className="material-symbols-outlined">
                                paid
                            </span>
                            Paid
                        </span>
                    </div>

                    <div className={`${styles.detail} ${styles.fullWidth}`}>
                        <span>Application Status</span>
                        <strong>
                            Submitted - Pending Review
                        </strong>
                    </div>
                </div>
            </section>

            {/* Actions */}
            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.downloadButton}
                    onClick={() => window.print()}
                >
                    <span className="material-symbols-outlined">
                        download
                    </span>
                    Download Confirmation
                </button>

                <button
                    type="button"
                    className={styles.homeButton}
                    onClick={onReturnHome}
                >
                    Return to Home
                </button>
            </div>

            <p className={styles.emailNotice}>
                <span className="material-symbols-outlined">
                    mail
                </span>
                A confirmation has been sent to your email address.
            </p>
        </main>
    );
}

export default ApplicationConfirmation;