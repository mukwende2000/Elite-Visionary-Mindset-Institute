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
                rejection_reason:
                    newStatus === "rejected"
                        ? rejectionReason.trim()
                        : null,
            };

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

    const showDecisionActions = paymentVerified;

    return (
        <section
            className={`${styles.card} ${styles.decisionCard}`}
        >
            <SectionTitle
                icon="gavel"
                title="Application Decision"
            />

            {application.status === "submitted" && (
                <div className={styles.pendingContent}>
                    {!showDecisionActions ? (
                        <PaymentActionMessage
                            paymentStatus={paymentStatus}
                        />
                    ) : (
                        <>
                            <div
                                className={
                                    styles.approvalSection
                                }
                            >
                                <div
                                    className={
                                        styles.actionHeader
                                    }
                                >
                                    <div>
                                        <h3>
                                            Admission Decision
                                        </h3>

                                        <p>
                                            Payment has been
                                            verified. Admission
                                            actions are now
                                            available.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className={
                                        styles.approveButton
                                    }
                                    onClick={() =>
                                        updateStatus(
                                            "approved"
                                        )
                                    }
                                    disabled={submitting}
                                >
                                    <span className="material-symbols-outlined">
                                        check_circle
                                    </span>

                                    {submitting
                                        ? "Processing..."
                                        : "Approve Admission"}
                                </button>
                            </div>

                            <div
                                className={
                                    styles.rejectionSection
                                }
                            >
                                <div
                                    className={
                                        styles.actionHeader
                                    }
                                >
                                    <div>
                                        <h3>
                                            Reject Application
                                        </h3>

                                        <p>
                                            Provide a reason
                                            before rejecting
                                            this application.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={
                                        styles.rejectionBox
                                    }
                                >
                                    <label htmlFor="rejectionReason">
                                        Reason for Rejection
                                    </label>

                                    <textarea
                                        id="rejectionReason"
                                        value={
                                            rejectionReason
                                        }
                                        onChange={(event) =>
                                            setRejectionReason(
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Explain why this application is being rejected..."
                                        rows={4}
                                        disabled={submitting}
                                    />

                                    <button
                                        type="button"
                                        className={
                                            styles.rejectButton
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                "rejected"
                                            )
                                        }
                                        disabled={
                                            submitting
                                        }
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
                        </>
                    )}
                </div>
            )}

            {application.status === "approved" && (
                <DecisionResult
                    type="approved"
                    title="Application Approved"
                    message="This applicant has been approved for admission."
                    date={application.updated_at}
                />
            )}

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

function PaymentActionMessage({ paymentStatus }) {
    const config = {
        none: {
            icon: "payments",
            title: "Awaiting Payment",
            message:
                "Actions will be available after payment is made.",
            className: styles.paymentMissing,
        },
        pending: {
            icon: "schedule",
            title: "Awaiting Payment Verification",
            message:
                "The payment is being processed and admission actions will be available once payment verification is complete.",
            className: styles.paymentPending,
        },

        pending_verification: {
            icon: "schedule",
            title: "Awaiting Payment Verification",
            message:
                "The payment has been submitted and admission actions will be available once it has been verified.",
            className: styles.paymentPending,
        },

        rejected: {
            icon: "error",
            title: "Payment Rejected",
            message:
                "This Application's payment has been rejected.",
            className: styles.paymentRejected,
        },

        failed: {
            icon: "error",
            title: "Payment Failed",
            message:
                "A successful payment is required before admission actions are available.",
            className: styles.paymentRejected,
        },
    };

    const fallback = {
        icon: "payments",
        title: "Payment Required",
        message:
            "Admission actions will be available once a valid payment has been verified.",
        className: styles.paymentMissing,
    };

    const configToUse =
        config[paymentStatus] || fallback;

    return (
        <div className={configToUse.className}>
            <div className={styles.paymentIcon}>
                <span className="material-symbols-outlined">
                    {configToUse.icon}
                </span>
            </div>

            <div className={styles.paymentInfo}>
                <strong>{configToUse.title}</strong>
                <p>{configToUse.message}</p>
            </div>
        </div>
    );
}

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
                <div
                    className={
                        styles.rejectionStatement
                    }
                >
                    <span className="material-symbols-outlined">
                        info
                    </span>

                    <div>
                        <span>
                            Reason for rejection
                        </span>

                        <strong>{reason}</strong>
                    </div>
                </div>
            )}
        </div>
    );
}

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
