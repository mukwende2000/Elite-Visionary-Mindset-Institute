import styles from "./ApplicationHeader.module.css";

function ApplicationHeader({ application }) {
    const fullName = [
        application.first_name,
        application.other_names,
        application.surname,
    ]
        .filter(Boolean)
        .join(" ");

    const submitted = application.created_at
        ? new Date(application.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "—";

    const statusLabel = {
        submitted: "Pending Review",
        approved: "Approved",
        rejected: "Rejected",
    }[application.status] || application.status;

    const statusClass =
        application.status === "approved"
            ? styles.approvedStatus
            : application.status === "rejected"
                ? styles.rejectedStatus
                : styles.pendingStatus;

    return (
        <section className={styles.header}>
            <div className={styles.accentLine} />

            <div className={styles.profileInfo}>
                <div className={styles.avatar}>
                    <span className="material-symbols-outlined">
                        person
                    </span>
                </div>

                <div>
                    <h1>{fullName}</h1>

                    <div className={styles.meta}>
                        <span>
                            <span className="material-symbols-outlined">
                                tag
                            </span>
                            {application.id}
                        </span>

                        <span>
                            <span className="material-symbols-outlined">
                                calendar_today
                            </span>
                            Submitted: {submitted}
                        </span>
                    </div>
                </div>
            </div>

            <div className={`${styles.statusBadge} ${statusClass}`}>
                <span />
                {statusLabel}
            </div>
        </section>
    );
}

export default ApplicationHeader;