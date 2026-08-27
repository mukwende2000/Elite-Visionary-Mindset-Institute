import styles from "./RecentPayments.module.css";

function RecentPayments({ payments }) {
    return (
        <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
                <h2>Recent Payments</h2>

                <button type="button">
                    View All
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Amount</th>
                            <th>Reference</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className={styles.primaryText}>
                                        {payment.applications?.first_name}{" "}
                                        {payment.applications?.surname}
                                    </td>

                                    <td className={styles.amount}>
                                        {payment.amount}
                                    </td>

                                    <td className={styles.reference}>
                                        {payment.payment_reference}
                                    </td>

                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[payment.status]
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className={styles.empty}
                                >
                                    No recent payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentPayments;