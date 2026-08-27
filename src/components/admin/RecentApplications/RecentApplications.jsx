import styles from "./RecentApplications.module.css";

function RecentApplications({ applications }) {
    return (
        <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
                <h2>Recent Applications</h2>

                <button type="button">
                    View All
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Programme</th>
                            <th>Intake</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.id}>
                                <td className={styles.primaryText}>
                                    {application.first_name}{" "}
                                    {application.surname}
                                </td>

                                <td>{application.programme}</td>

                                <td>{application.intake}</td>

                                <td>
                                    <span
                                        className={`${styles.status} ${styles[application.status]
                                            }`}
                                    >
                                        {application.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentApplications;