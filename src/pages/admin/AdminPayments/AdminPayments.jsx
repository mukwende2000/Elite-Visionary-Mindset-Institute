import { useState } from "react";
import styles from "./AdminPayments.module.css";
import PaymentStats from "../../../components/admin/PaymentStats/PaymentStats"
import PaymentsTable from "../../../components/admin/PaymentsTable/PaymentsTable";

function AdminPayments() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");

    const payments = [
        {
            applicant: "Alexander Hamilton",
            applicationId: "APP-2023-8942",
            method: "Bank Transfer",
            icon: "account_balance",
            amount: "$150.00",
            reference: "TRX-8921A",
            submitted: "Oct 24, 2023",
            status: "Pending Verification",
        },
        {
            applicant: "Eleanor Vance",
            applicationId: "APP-2023-8938",
            method: "Mobile Money",
            icon: "phone_android",
            amount: "$150.00",
            reference: "MM-48291",
            submitted: "Oct 23, 2023",
            status: "Verified",
        },
        {
            applicant: "Marcus Sterling",
            applicationId: "APP-2023-8931",
            method: "Bank Transfer",
            icon: "account_balance",
            amount: "$250.00",
            reference: "TRX-8917B",
            submitted: "Oct 22, 2023",
            status: "Verified",
        },
        {
            applicant: "Sophia Chen",
            applicationId: "APP-2023-8924",
            method: "Card",
            icon: "credit_card",
            amount: "$150.00",
            reference: "CARD-7721",
            submitted: "Oct 21, 2023",
            status: "Pending Verification",
        },
        {
            applicant: "Julian Bates",
            applicationId: "APP-2023-8918",
            method: "Bank Transfer",
            icon: "account_balance",
            amount: "$150.00",
            reference: "TRX-8904C",
            submitted: "Oct 20, 2023",
            status: "Rejected",
        },
    ];

    const summaryCards = [
        {
            label: "Total Payments",
            value: "$284,750.00",
            description: "All recorded payments",
            icon: "payments",
            type: "total",
        },
        {
            label: "Pending Verification",
            value: "$18,450.00",
            description: "42 payments awaiting review",
            icon: "pending_actions",
            type: "pending",
        },
        {
            label: "Verified",
            value: "$251,300.00",
            description: "Verified payments",
            icon: "verified",
            type: "verified",
        },
        {
            label: "Failed / Rejected",
            value: "$15,000.00",
            description: "Payments requiring attention",
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
        </main>
    );
}

export default AdminPayments;