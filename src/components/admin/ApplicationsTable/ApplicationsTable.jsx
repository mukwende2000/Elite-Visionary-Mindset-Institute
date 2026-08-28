import { useNavigate } from "react-router-dom";
import styles from "./ApplicationsTable.module.css";

function ApplicationsTable({
    applications,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    intakeFilter,
    setIntakeFilter,
}) {
    console.log(applications)
    const navigate = useNavigate()
    const filteredApplications = applications.filter((application) => {
        const matchesSearch =
            application?.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            application?.email
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            application?.status.toLowerCase() === statusFilter;

        const matchesIntake =
            intakeFilter === "all" ||
            application?.intake === intakeFilter;

        return matchesSearch && matchesStatus && matchesIntake;
    });

    return (
        <section className={styles.tableCard}>
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <span className="material-symbols-outlined">
                        search
                    </span>

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search applicants..."
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
                        <option value="submitted">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <select
                        value={intakeFilter}
                        onChange={(event) =>
                            setIntakeFilter(event.target.value)
                        }
                    >
                        <option value="all">All Intakes</option>

                        {[...new Set(
                            applications
                                .map((application) => application.intake)
                                .filter(Boolean)
                        )].map((intake) => (
                            <option key={intake} value={intake}>
                                {intake}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Programme</th>
                            <th>Intake</th>
                            <th>Submitted</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredApplications.map((application) => (
                            <tr key={application.id}>
                                <td className={styles.applicantName}>
                                    {application.name}
                                </td>

                                <td className={styles.muted}>
                                    {application.email}
                                </td>

                                <td>{application.programme}</td>

                                <td>{application.intake}</td>

                                <td className={styles.muted}>
                                    {application.submitted}
                                </td>

                                <td>
                                    <span
                                        className={`${styles.status} ${styles[
                                            application.status.toLowerCase()
                                        ]
                                            }`}
                                    >
                                        {application.status}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        className={styles.viewButton}
                                        onClick={() => navigate(`/admin/applications/${application.id}`)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                <span>
                    Showing {filteredApplications.length} of{" "}
                    {applications.length} entries
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

export default ApplicationsTable;