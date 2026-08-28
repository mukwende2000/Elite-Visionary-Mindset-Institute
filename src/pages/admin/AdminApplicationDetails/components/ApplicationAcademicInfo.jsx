import styles from "./ApplicationAcademicInfo.module.css";

function ApplicationAcademicInfo({ application }) {
    return (
        <section className={styles.card}>
            <SectionTitle
                icon="school"
                title="Academic & Professional Profile"
            />

            <div className={styles.infoGrid}>

                <div className={styles.programmeBox}>
                    <p className={styles.label}>
                        Selected Programme
                    </p>

                    <p className={styles.programmeName}>
                        {application.programme || "—"}
                    </p>

                    <div className={styles.tags}>
                        <span>
                            <span className="material-symbols-outlined">
                                laptop_mac
                            </span>
                            {application.study_mode || "—"}
                        </span>

                        <span>
                            <span className="material-symbols-outlined">
                                event
                            </span>
                            {application.intake || "—"}
                        </span>
                    </div>
                </div>

                <InfoItem
                    label="Highest Qualification"
                    value={application.highest_qualification}
                    secondary={application.institution}
                />

                <InfoItem
                    label="Current Occupation"
                    value={application.current_occupation}
                    secondary={application.organisation}
                />

                <InfoItem
                    label="Job Title"
                    value={application.job_title}
                />

                <InfoItem
                    label="Employment Status"
                    value={application.employment_status}
                />

                <InfoItem
                    label="Experience"
                    value={application.experience}
                />
            </div>
        </section>
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

function InfoItem({ label, value, secondary }) {
    return (
        <div>
            <p className={styles.label}>{label}</p>

            <p className={styles.value}>
                {value || "—"}
            </p>

            {secondary && (
                <p className={styles.secondary}>
                    {secondary}
                </p>
            )}
        </div>
    );
}

export default ApplicationAcademicInfo;