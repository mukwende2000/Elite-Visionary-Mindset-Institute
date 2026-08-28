import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import styles from "./AdminPaymentDetails.module.css";

function AdminPaymentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const loadPayment = async () => {
            setLoading(true);
            setError("");

            const { data, error } = await supabase
                .from("payments")
                .select(`
                    id,
                    application_id,
                    payment_method,
                    payment_reference,
                    amount,
                    proof_file_path,
                    status,
                    created_at,
                    updated_at,
                    applications (
                        id,
                        first_name,
                        other_names,
                        surname,
                        email,
                        phone,
                        programme,
                        intake,
                        status
                    )
                `)
                .eq("id", id)
                .single();

            if (error) {
                console.error("Failed to load payment:", error);
                setError("Could not load payment details.");
            } else {
                setPayment(data);
            }

            setLoading(false);
        };

        loadPayment();
    }, [id]);

    const updatePaymentStatus = async (newStatus) => {
        setProcessing(true);

        const { data, error } = await supabase
            .from("payments")
            .update({
                status: newStatus,
                updated_at: new Date().toISOString(),
            })
            .eq("id", payment.id)
            .select(`
                id,
                application_id,
                payment_method,
                payment_reference,
                amount,
                proof_file_path,
                status,
                created_at,
                updated_at,
                applications (
                    id,
                    first_name,
                    other_names,
                    surname,
                    email,
                    phone,
                    programme,
                    intake,
                    status
                )
            `)
            .single();

        if (error) {
            console.error("Payment status update failed:", error);

            alert(
                "Could not update the payment. Please check your permissions and try again."
            );

            setProcessing(false);
            return;
        }

        setPayment(data);
        setProcessing(false);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(Number(amount || 0));
    };

    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const formatMethod = (method) => {
        const methods = {
            bank_transfer: "Bank Transfer",
            mobile_money: "Mobile Money",
            card: "Card",
        };

        return methods[method] || method || "—";
    };

    const getMethodIcon = (method) => {
        const icons = {
            bank_transfer: "account_balance",
            mobile_money: "phone_android",
            card: "credit_card",
        };

        return icons[method] || "payments";
    };

    const getStatusLabel = (status) => {
        const statuses = {
            pending: "Pending",
            pending_verification: "Pending Verification",
            paid: "Verified",
            failed: "Failed",
            rejected: "Rejected",
        };

        return statuses[status] || status || "Unknown";
    };

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.loading}>
                        Loading payment details...
                    </div>
                </div>
            </main>
        );
    }

    if (error || !payment) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.errorState}>
                        <span className="material-symbols-outlined">
                            error
                        </span>

                        <h2>Payment Not Found</h2>

                        <p>
                            {error ||
                                "The requested payment could not be found."}
                        </p>

                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={() => navigate("/admin/payments")}
                        >
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>
                            Back to Payments
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    const application = payment.applications;

    const applicantName = [
        application?.first_name,
        application?.other_names,
        application?.surname,
    ]
        .filter(Boolean)
        .join(" ");

    const isPending =
        payment.status === "pending" ||
        payment.status === "pending_verification";

    return (
        <main className={styles.page}>
            <div className={styles.container}>

                <div className={styles.backRow}>
                    <button
                        type="button"
                        className={styles.backButton}
                        onClick={() => navigate("/admin/payments")}
                    >
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                        Back to Payments
                    </button>
                </div>

                <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>
                            Payment Details
                        </p>

                        <h1>
                            {applicantName || "Unknown Applicant"}
                        </h1>

                        <p className={styles.applicationId}>
                            Application ID: {payment.application_id}
                        </p>
                    </div>

                    <StatusBadge status={payment.status} />
                </header>

                <div className={styles.contentGrid}>

                    <div className={styles.mainColumn}>

                        <section className={styles.card}>
                            <SectionTitle
                                icon="person"
                                title="Applicant"
                            />

                            <div className={styles.infoGrid}>
                                <InfoItem
                                    label="Full Name"
                                    value={applicantName}
                                />

                                <InfoItem
                                    label="Email"
                                    value={application?.email}
                                />

                                <InfoItem
                                    label="Phone"
                                    value={application?.phone}
                                />

                                <InfoItem
                                    label="Application Status"
                                    value={application?.status}
                                />
                            </div>
                        </section>

                        <section className={styles.card}>
                            <SectionTitle
                                icon="school"
                                title="Application"
                            />

                            <div className={styles.infoGrid}>
                                <InfoItem
                                    label="Application ID"
                                    value={payment.application_id}
                                />

                                <InfoItem
                                    label="Programme"
                                    value={application?.programme}
                                />

                                <InfoItem
                                    label="Intake"
                                    value={application?.intake}
                                />
                            </div>
                        </section>

                        <section className={styles.card}>
                            <SectionTitle
                                icon="payments"
                                title="Payment Information"
                            />

                            <div className={styles.paymentAmount}>
                                <p>Amount Paid</p>

                                <strong>
                                    {formatCurrency(payment.amount)}
                                </strong>
                            </div>

                            <div className={styles.infoGrid}>
                                <InfoItem
                                    label="Payment Method"
                                    value={formatMethod(
                                        payment.payment_method
                                    )}
                                />

                                <InfoItem
                                    label="Payment Reference"
                                    value={payment.payment_reference}
                                />

                                <InfoItem
                                    label="Submitted"
                                    value={formatDate(
                                        payment.created_at
                                    )}
                                />

                                <InfoItem
                                    label="Last Updated"
                                    value={formatDate(
                                        payment.updated_at
                                    )}
                                />
                            </div>
                        </section>

                        <section className={styles.card}>
                            <SectionTitle
                                icon="description"
                                title="Payment Proof"
                            />

                            {payment.proof_file_path ? (
                                <div className={styles.proofBox}>
                                    <span className="material-symbols-outlined">
                                        attach_file
                                    </span>

                                    <div>
                                        <strong>
                                            Payment proof uploaded
                                        </strong>

                                        <p>
                                            Review the submitted document
                                            before verifying the payment.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className={styles.secondaryButton}
                                        onClick={() =>
                                            alert(
                                                "Proof preview will be connected to Supabase Storage."
                                            )
                                        }
                                    >
                                        View Proof
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.emptyProof}>
                                    <span className="material-symbols-outlined">
                                        description
                                    </span>

                                    <p>
                                        No payment proof was uploaded.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>

                    <aside className={styles.sidebar}>

                        <section
                            className={`${styles.card} ${styles.actionCard}`}
                        >
                            <SectionTitle
                                icon="verified"
                                title="Payment Verification"
                            />

                            {payment.status === "paid" && (
                                <div
                                    className={`${styles.result} ${styles.verified}`}
                                >
                                    <span className="material-symbols-outlined">
                                        check_circle
                                    </span>

                                    <div>
                                        <strong>
                                            Payment Verified
                                        </strong>

                                        <p>
                                            This payment has been
                                            verified successfully.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {payment.status === "rejected" && (
                                <div
                                    className={`${styles.result} ${styles.rejected}`}
                                >
                                    <span className="material-symbols-outlined">
                                        cancel
                                    </span>

                                    <div>
                                        <strong>
                                            Payment Rejected
                                        </strong>

                                        <p>
                                            This payment has been
                                            rejected.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {payment.status === "failed" && (
                                <div
                                    className={`${styles.result} ${styles.rejected}`}
                                >
                                    <span className="material-symbols-outlined">
                                        error
                                    </span>

                                    <div>
                                        <strong>
                                            Payment Failed
                                        </strong>

                                        <p>
                                            This payment is marked
                                            as failed.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {isPending && (
                                <>
                                    <p className={styles.description}>
                                        Review the payment details and
                                        supporting proof before confirming
                                        the payment.
                                    </p>

                                    <div className={styles.actions}>
                                        <button
                                            type="button"
                                            className={styles.verifyButton}
                                            onClick={() =>
                                                updatePaymentStatus("paid")
                                            }
                                            disabled={processing}
                                        >
                                            <span className="material-symbols-outlined">
                                                verified
                                            </span>

                                            {processing
                                                ? "Processing..."
                                                : "Verify Payment"}
                                        </button>

                                        <button
                                            type="button"
                                            className={styles.rejectButton}
                                            onClick={() =>
                                                updatePaymentStatus(
                                                    "rejected"
                                                )
                                            }
                                            disabled={processing}
                                        >
                                            <span className="material-symbols-outlined">
                                                cancel
                                            </span>

                                            Reject Payment
                                        </button>
                                    </div>
                                </>
                            )}
                        </section>

                        <section className={styles.card}>
                            <SectionTitle
                                icon="link"
                                title="Application"
                            />

                            <p className={styles.description}>
                                View the complete application associated
                                with this payment.
                            </p>

                            <button
                                type="button"
                                className={styles.applicationButton}
                                onClick={() =>
                                    navigate(
                                        `/admin/applications/${payment.application_id}`
                                    )
                                }
                            >
                                View Application

                                <span className="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </button>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
}

function StatusBadge({ status }) {
    const statusMap = {
        pending: {
            label: "Pending",
            className: "pending",
        },
        pending_verification: {
            label: "Pending Verification",
            className: "pending",
        },
        paid: {
            label: "Verified",
            className: "verified",
        },
        rejected: {
            label: "Rejected",
            className: "rejected",
        },
        failed: {
            label: "Failed",
            className: "failed",
        },
    };

    const current = statusMap[status] || {
        label: status || "Unknown",
        className: "pending",
    };

    return (
        <div
            className={`${styles.statusBadge} ${styles[current.className]}`}
        >
            <span />
            {current.label}
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

function InfoItem({ label, value }) {
    return (
        <div className={styles.infoItem}>
            <p className={styles.label}>{label}</p>

            <p className={styles.value}>
                {value || "—"}
            </p>
        </div>
    );
}

export default AdminPaymentDetails;