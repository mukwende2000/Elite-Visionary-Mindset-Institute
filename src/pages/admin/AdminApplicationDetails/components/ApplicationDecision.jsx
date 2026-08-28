import { useState } from "react";
import { supabase } from "../../../../lib/supabase";
import styles from "./ApplicationDecision.module.css";

function ApplicationDecision({
    application,
    setApplication,
    payment,
}) {
    const [rejectionReason, setRejectionReason] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const paymentStatus = payment?.status || "none";
    const paymentVerified = paymentStatus === "paid";

    const updateStatus = async (newStatus) => {
        if (
            newStatus === "rejected" &&
            !rejectionReason.trim()
        ) {
            alert("Please provide a reason for rejection.");
            return;
        }

        setSubmitting(true);

        try {
            const updateData = {
                status: newStatus,
                updated_at: new Date().toISOString(),
            };

            if (newStatus === "rejected") {
                updateData.rejection_reason =
                    rejectionReason.trim();
            } else {
                updateData.rejection_reason = null;
            }

            const {
                data: updatedApplication,
                error: applicationError,
            } = await supabase
                .from("applications")
                .update(updateData)
                .eq("id", application.id)
                .select()
                .single();

            if (applicationError) {
                throw applicationError;
            }

            /*
             * Send approval email
             */
            if (newStatus === "approved") {
                const {
                    data: emailResult,
                    error: emailError,
                } = await supabase.functions.invoke(
                    "send-application-email",
                    {
                        body: {
                            emailType: "application_approved",
                            applicantName:
                                `${application.first_name} ${application.surname}`,
                            applicantEmail:
                                application.email,
                            applicationId:
                                application.id,
                        },
                    }
                );

                if (emailError) {
                    console.error(
                        "Approval email failed:",
                        emailError
                    );
                } else {
                    console.log(
                        "Approval email sent:",
                        emailResult
                    );
                }
            }

            setApplication(updatedApplication);

        } catch (error) {
            console.error(
                "Failed to update application:",
                error
            );

            alert(
                "Could not update the application. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            className={`${styles.card} ${styles.decisionCard}`}
        >
            <SectionTitle
                icon="gavel"
                title="Application Decision"
            />

            {/* =================================
                PENDING APPLICATION
            ================================== */}
            {application.status === "submitted" && (
                <div className={styles.pendingContent}>

                    <p className={styles.description}>
                        Review the application and payment before
                        making an admission decision.
                    </p>

                    {/* =================================
                        PAYMENT STATUS
                    ================================== */}
                    <PaymentStatus paymentStatus={paymentStatus} />

                    {/* =================================
                        APPROVAL ACTION
                    ================================== */}
                    <div className={styles.approvalSection}>
                        <div className={styles.actionHeader}>
                            <div>
                                <h3>Admission Decision</h3>

                                <p>
                                    {paymentVerified
                                        ? "Payment has been verified. This application is ready for approval."
                                        : "Verify the applicant's payment before approving admission."}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={styles.approveButton}
                            onClick={() =>
                                updateStatus("approved")
                            }
                            disabled={
                                submitting ||
                                !paymentVerified
                            }
                        >
                            <span className="material-symbols-outlined">
                                check_circle
                            </span>

                            {submitting
                                ? "Processing..."
                                : paymentVerified
                                    ? "Approve Admission"
                                    : "Approve Admission"}
                        </button>

                        {!paymentVerified && (
                            <p className={styles.disabledHint}>
                                <span className="material-symbols-outlined">
                                    lock
                                </span>

                                Approval is locked until payment
                                verification is complete.
                            </p>
                        )}
                    </div>

                    {/* =================================
                        REJECTION
                    ================================== */}
                    <div className={styles.rejectionSection}>
                        <div className={styles.actionHeader}>
                            <div>
                                <h3>Reject Application</h3>

                                <p>
                                    If the application does not meet
                                    the admission requirements, provide
                                    a reason before rejecting it.
                                </p>
                            </div>
                        </div>

                        <div className={styles.rejectionBox}>
                            <label htmlFor="rejectionReason">
                                Reason for Rejection
                            </label>

                            <textarea
                                id="rejectionReason"
                                value={rejectionReason}
                                onChange={(event) =>
                                    setRejectionReason(
                                        event.target.value
                                    )
                                }
                                placeholder="Explain why this application is being rejected..."
                                rows={4}
                                disabled={submitting}
                            />

                            <button
                                type="button"
                                className={styles.rejectButton}
                                onClick={() =>
                                    updateStatus("rejected")
                                }
                                disabled={submitting}
                            >
                                <span className="material-symbols-outlined">
                                    cancel
                                </span>

                                {submitting
                                    ? "Processing..."
                                    : "Reject Application"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* =================================
                APPROVED
            ================================== */}
            {application.status === "approved" && (
                <DecisionResult
                    type="approved"
                    title="Application Approved"
                    message="This applicant has been approved for admission."
                    date={application.updated_at}
                />
            )}

            {/* =================================
                REJECTED
            ================================== */}
            {application.status === "rejected" && (
                <DecisionResult
                    type="rejected"
                    title="Application Rejected"
                    message="This application has been rejected and is no longer awaiting review."
                    date={application.updated_at}
                    reason={application.rejection_reason}
                />
            )}
        </section>
    );
}

/*
 * ============================================
 * PAYMENT STATUS
 * ============================================
 */

function PaymentStatus({ paymentStatus }) {
    const statusConfig = {
        paid: {
            icon: "verified",
            title: "Payment Verified",
            message:
                "The applicant's payment has been verified.",
            className: styles.paymentVerified,
        },

        pending_verification: {
            icon: "schedule",
            title: "Payment Awaiting Verification",
            message:
                "The payment has been submitted and is waiting for verification.",
            className: styles.paymentPending,
        },

        rejected: {
            icon: "error",
            title: "Payment Rejected",
            message:
                "The submitted payment was rejected. A valid payment must be verified before admission can be approved.",
            className: styles.paymentRejected,
        },

        failed: {
            icon: "error",
            title: "Payment Failed",
            message:
                "The payment could not be completed. A successful payment must be verified before admission can be approved.",
            className: styles.paymentRejected,
        },

        none: {
            icon: "payments",
            title: "No Payment Recorded",
            message:
                "No payment has been recorded for this application.",
            className: styles.paymentMissing,
        },
    };

    const config =
        statusConfig[paymentStatus] ||
        statusConfig.none;

    return (
        <div className={config.className}>
            <div className={styles.paymentIcon}>
                <span className="material-symbols-outlined">
                    {config.icon}
                </span>
            </div>

            <div className={styles.paymentInfo}>
                <strong>{config.title}</strong>
                <p>{config.message}</p>
            </div>
        </div>
    );
}

function formatPaymentStatus(status) {
    return status
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) =>
            letter.toUpperCase()
        );
}

/*
 * ============================================
 * DECISION RESULT
 * ============================================
 */

function DecisionResult({
    type,
    title,
    message,
    date,
    reason,
}) {
    const isApproved = type === "approved";

    return (
        <div className={styles.decisionResult}>
            <div
                className={
                    isApproved
                        ? styles.approvedIcon
                        : styles.rejectedIcon
                }
            >
                <span className="material-symbols-outlined">
                    {isApproved
                        ? "check_circle"
                        : "cancel"}
                </span>
            </div>

            <h3>{title}</h3>

            <p>{message}</p>

            {date && (
                <p className={styles.decisionDate}>
                    Decision made:{" "}
                    {new Date(date).toLocaleString()}
                </p>
            )}

            {!isApproved && reason && (
                <div className={styles.rejectionStatement}>
                    <span className="material-symbols-outlined">
                        info
                    </span>

                    <div>
                        <span>Reason for rejection</span>
                        <strong>{reason}</strong>
                    </div>
                </div>
            )}
        </div>
    );
}

/*
 * ============================================
 * SECTION TITLE
 * ============================================
 */

function SectionTitle({ icon, title }) {
    return (
        <h2 className={styles.sectionTitle}>
            <span className="material-symbols-outlined">
                {icon}
            </span>

            {title}
        </h2>
    );
}

export default ApplicationDecision;