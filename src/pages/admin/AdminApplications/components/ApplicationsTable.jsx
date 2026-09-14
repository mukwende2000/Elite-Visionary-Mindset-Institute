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
    intakeOptions,
}) {
    const navigate = useNavigate();

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
                        <option value="">
                            All Statuses
                        </option>

                        <option value="submitted">
                            Pending
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>
                    </select>

                    <select
                        value={intakeFilter}
                        onChange={(event) =>
                            setIntakeFilter(event.target.value)
                        }
                    >
                        <option value="">
                            All Intakes
                        </option>

                        {intakeOptions.map((intake) => (
                            <option
                                key={intake}
                                value={intake}
                            >
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
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <tr key={application.id}>
                                    <td
                                        className={
                                            styles.applicantName
                                        }
                                    >
                                        {application.name}
                                    </td>

                                    <td className={styles.muted}>
                                        {application.email}
                                    </td>

                                    <td>
                                        {application.programme}
                                    </td>

                                    <td>
                                        {application.intake}
                                    </td>

                                    <td className={styles.muted}>
                                        {application.submitted}
                                    </td>

                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[
                                                application?.status
                                                    ?.toLowerCase()
                                            ] || ""
                                                }`}
                                        >
                                            {application.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className={
                                                styles.viewButton
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/admin/applications/${application.id}`
                                                )
                                            }
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className={
                                        styles.emptyState
                                    }
                                >
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ApplicationsTable;