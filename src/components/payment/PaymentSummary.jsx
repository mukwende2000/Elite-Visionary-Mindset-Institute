import styles from "./PaymentSummary.module.css";

function PaymentSummary({
    application,
    applicationFee = 150,
    tuitionDeposit = 4850,
    paymentMethod,
    submitting,
    onManualPayment,
}) {
    const total = applicationFee + tuitionDeposit;

    const applicantName =
        `${application.first_name || ""} ${application.surname || ""}`.trim();

    return (
        <div className={`${styles.card} ${styles.summary}`}>

            <div className={styles.summaryHeader}>
                <h2>Order Summary</h2>

                <span className="material-symbols-outlined">
                    receipt_long
                </span>
            </div>

            <div className={styles.summaryBody}>

                <div className={styles.summaryRow}>
                    <span>Applicant</span>

                    <strong>
                        {applicantName || "Applicant Name"}
                    </strong>
                </div>

                <div className={styles.summaryRow}>
                    <span>Programme</span>

                    <strong>
                        {application.programme || "Selected Programme"}
                    </strong>
                </div>

                <div className={styles.summaryRow}>
                    <span>Intake</span>

                    <strong>
                        {application.intake || "Selected Intake"}
                    </strong>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.summaryRow}>
                    <span>Application Fee</span>

                    <strong>
                        ${applicationFee.toLocaleString()}
                    </strong>
                </div>

                <div className={styles.summaryRow}>
                    <span>Tuition Deposit</span>

                    <strong>
                        ${tuitionDeposit.toLocaleString()}
                    </strong>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.totalRow}>
                    <span>Total</span>

                    <strong>
                        ${total.toLocaleString()}
                    </strong>
                </div>

                {paymentMethod === "manual" ? (
                    <button
                        type="button"
                        className={styles.payButton}
                        onClick={onManualPayment}
                        disabled={submitting}
                    >
                        <span className="material-symbols-outlined">
                            upload
                        </span>

                        {submitting
                            ? "Submitting..."
                            : "Submit Payment Proof"}
                    </button>
                ) : (
                    <button
                        type="button"
                        className={styles.payButton}
                    >
                        <span className="material-symbols-outlined">
                            lock
                        </span>

                        Pay Now
                    </button>
                )}

                <p className={styles.secureText}>
                    <span className="material-symbols-outlined">
                        verified_user
                    </span>

                    Payments are secure and encrypted
                </p>

            </div>
        </div>
    );
}

export default PaymentSummary;