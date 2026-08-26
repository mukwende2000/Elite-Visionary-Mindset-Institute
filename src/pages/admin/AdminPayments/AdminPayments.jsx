import styles from "./AdminPayments.module.css";

function AdminPayments() {
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
            label: "Total AdminP",
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
        <main className={styles.payments}>
            {/* Page Header */}
            <div className={styles.pageHeader}>
                <div>
                    <h1>Payments</h1>
                    <p>
                        Review, verify, and manage application payments.
                    </p>
                </div>

                <button className={styles.recordButton}>
                    <span className="material-symbols-outlined">
                        payments
                    </span>
                    Record Payment
                </button>
            </div>

            {/* Summary Cards */}
            <section className={styles.summaryGrid}>
                {summaryCards.map((card) => (
                    <div
                        key={card.label}
                        className={`${styles.summaryCard} ${styles[card.type]}`}
                    >
                        <div className={styles.summaryIcon}>
                            <span className="material-symbols-outlined">
                                {card.icon}
                            </span>
                        </div>

                        <div className={styles.summaryValue}>
                            {card.value}
                        </div>

                        <div className={styles.summaryLabel}>
                            {card.label}
                        </div>

                        <div className={styles.summaryDescription}>
                            {card.description}
                        </div>
                    </div>
                ))}
            </section>

            {/* Payments Table */}
            <section className={styles.tableCard}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.searchWrapper}>
                        <span className="material-symbols-outlined">
                            search
                        </span>

                        <input
                            type="text"
                            placeholder="Search applicant or reference..."
                        />
                    </div>

                    <div className={styles.filters}>
                        <select defaultValue="all">
                            <option value="all">All Statuses</option>
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <select defaultValue="all">
                            <option value="all">
                                All Payment Methods
                            </option>
                            <option value="bank">
                                Bank Transfer
                            </option>
                            <option value="mobile">
                                Mobile Money
                            </option>
                            <option value="card">Card</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>Applicant</th>
                                <th>Application ID</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                                <th>Reference</th>
                                <th>Submitted</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.reference}>
                                    <td className={styles.applicant}>
                                        {payment.applicant}
                                    </td>

                                    <td className={styles.muted}>
                                        {payment.applicationId}
                                    </td>

                                    <td>
                                        <div className={styles.paymentMethod}>
                                            <span className="material-symbols-outlined">
                                                {payment.icon}
                                            </span>

                                            {payment.method}
                                        </div>
                                    </td>

                                    <td className={styles.amount}>
                                        {payment.amount}
                                    </td>

                                    <td>
                                        <div className={styles.reference}>
                                            {payment.reference}

                                            {payment.method ===
                                                "Bank Transfer" && (
                                                    <span className="material-symbols-outlined">
                                                        attachment
                                                    </span>
                                                )}
                                        </div>
                                    </td>

                                    <td className={styles.muted}>
                                        {payment.submitted}
                                    </td>

                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[
                                                payment.status
                                                    .toLowerCase()
                                                    .replaceAll(" ", "-")
                                            ]
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>

                                    <td className={styles.action}>
                                        <button type="button">
                                            <span className="material-symbols-outlined">
                                                more_vert
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={styles.pagination}>
                    <span>
                        Showing 1 to 5 of 42 payments
                    </span>

                    <div className={styles.paginationButtons}>
                        <button disabled>
                            Previous
                        </button>

                        <button className={styles.activePage}>
                            1
                        </button>

                        <button>2</button>
                        <button>3</button>
                        <button>Next</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AdminPayments;