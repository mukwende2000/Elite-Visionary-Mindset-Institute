import { useEffect, useState } from "react";
import styles from "./AdminPayments.module.css";
import PaymentStats from "../../../components/admin/PaymentStats/PaymentStats";
import PaymentsTable from "../../../components/admin/PaymentsTable/PaymentsTable";
import { supabase } from "../../../lib/supabase";

function AdminPayments() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPayments = async () => {
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
                    applications (
                        id,
                        first_name,
                        other_names,
                        surname,
                        email,
                        programme,
                        intake
                    )
                `)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Failed to load payments:", error);
                setError("Could not load payments.");
                setPayments([]);
                setLoading(false);
                return;
            }

            const formattedPayments = (data || []).map((payment) => {
                const application = payment.applications;

                const applicantName = [
                    application?.first_name,
                    application?.other_names,
                    application?.surname,
                ]
                    .filter(Boolean)
                    .join(" ");

                const methodMap = {
                    bank_transfer: {
                        label: "Bank Transfer",
                        icon: "account_balance",
                    },
                    mobile_money: {
                        label: "Mobile Money",
                        icon: "phone_android",
                    },
                    card: {
                        label: "Card",
                        icon: "credit_card",
                    },
                };

                const method =
                    methodMap[payment.payment_method] || {
                        label: payment.payment_method || "—",
                        icon: "payments",
                    };

                const statusMap = {
                    pending: "Pending",
                    pending_verification: "Pending Verification",
                    paid: "Verified",
                    failed: "Failed",
                    rejected: "Rejected",
                };

                return {
                    id: payment.id,
                    applicant: applicantName || "Unknown Applicant",
                    applicationId: application?.id || payment.application_id,
                    method: method.label,
                    methodValue: payment.payment_method,
                    icon: method.icon,
                    amount: Number(payment.amount || 0),
                    reference: payment.payment_reference || "—",
                    submitted: payment.created_at,
                    status:
                        statusMap[payment.status] ||
                        payment.status ||
                        "Unknown",
                    statusValue: payment.status,
                    proofFilePath: payment.proof_file_path,
                    email: application?.email,
                    programme: application?.programme,
                    intake: application?.intake,
                };
            });

            setPayments(formattedPayments);
            setLoading(false);
        };

        loadPayments();
    }, []);

    const totalAmount = payments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const pendingPayments = payments.filter(
        (payment) =>
            payment.statusValue === "pending" ||
            payment.statusValue === "pending_verification"
    );

    const verifiedPayments = payments.filter(
        (payment) => payment.statusValue === "paid"
    );

    const rejectedPayments = payments.filter(
        (payment) =>
            payment.statusValue === "failed" ||
            payment.statusValue === "rejected"
    );

    const pendingAmount = pendingPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const verifiedAmount = verifiedPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const rejectedAmount = rejectedPayments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const summaryCards = [
        {
            label: "Total Payments",
            value: formatCurrency(totalAmount),
            description: `${payments.length} recorded payments`,
            icon: "payments",
            type: "total",
        },
        {
            label: "Pending Verification",
            value: formatCurrency(pendingAmount),
            description: `${pendingPayments.length} payments awaiting review`,
            icon: "pending_actions",
            type: "pending",
        },
        {
            label: "Verified",
            value: formatCurrency(verifiedAmount),
            description: `${verifiedPayments.length} verified payments`,
            icon: "verified",
            type: "verified",
        },
        {
            label: "Failed / Rejected",
            value: formatCurrency(rejectedAmount),
            description: `${rejectedPayments.length} payments requiring attention`,
            icon: "error",
            type: "rejected",
        },
    ];

    return (
        <main className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Payments</h1>
                    <p>
                        Review, verify, and manage application payments.
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.recordButton}
                >
                    <span className="material-symbols-outlined">
                        payments
                    </span>
                    Record Payment
                </button>
            </div>

            {loading && (
                <div className={styles.message}>
                    Loading payments...
                </div>
            )}

            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <PaymentStats cards={summaryCards} />

                    <PaymentsTable
                        payments={payments}
                        search={search}
                        setSearch={setSearch}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        methodFilter={methodFilter}
                        setMethodFilter={setMethodFilter}
                    />
                </>
            )}
        </main>
    );
}

export default AdminPayments;