import styles from "./PaymentsTable.module.css";

function PaymentsTable({
    payments,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    methodFilter,
    setMethodFilter,
}) {
    const filteredPayments = payments.filter((payment) => {
        const searchTerm = search.toLowerCase();

        const matchesSearch =
            payment.applicant.toLowerCase().includes(searchTerm) ||
            payment.reference.toLowerCase().includes(searchTerm) ||
            payment.applicationId.toLowerCase().includes(searchTerm);

        const matchesStatus =
            statusFilter === "all" ||
            payment.status.toLowerCase().includes(statusFilter);

        const matchesMethod =
            methodFilter === "all" ||
            payment.method.toLowerCase().includes(methodFilter);

        return matchesSearch && matchesStatus && matchesMethod;
    });

    return (
        <section className={styles.card}>
            <div className={styles.toolbar}>
                <div className={styles.searchWrapper}>
                    <span className="material-symbols-outlined">
                        search
                    </span>

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search applicant or reference..."
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                    >
                        <option value="all">All Statuses</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <select
                        value={methodFilter}
                        onChange={(event) =>
                            setMethodFilter(event.target.value)
                        }
                    >
                        <option value="all">
                            All Payment Methods
                        </option>
                        <option value="bank">Bank Transfer</option>
                        <option value="mobile">Mobile Money</option>
                        <option value="card">Card</option>
                    </select>
                </div>
            </div>

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
                        {filteredPayments.map((payment) => (
                            <tr key={payment.reference}>
                                <td className={styles.applicant}>
                                    {payment.applicant}
                                </td>

                                <td className={styles.muted}>
                                    {payment.applicationId}
                                </td>

                                <td>
                                    <div className={styles.method}>
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

                        {filteredPayments.length === 0 && (
                            <tr>
                                <td
                                    colSpan="8"
                                    className={styles.empty}
                                >
                                    No payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                <span>
                    Showing {filteredPayments.length} of{" "}
                    {payments.length} payments
                </span>

                <div className={styles.paginationButtons}>
                    <button type="button" disabled>
                        Previous
                    </button>

                    <button
                        type="button"
                        className={styles.activePage}
                    >
                        1
                    </button>

                    <button type="button">2</button>
                    <button type="button">3</button>
                    <button type="button">Next</button>
                </div>
            </div>
        </section>
    );
}

export default PaymentsTable;