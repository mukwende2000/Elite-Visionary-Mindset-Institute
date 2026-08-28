import styles from "./ApplicationAdditionalInfo.module.css";

function ApplicationAdditionalInfo({ application }) {
    return (
        <section className={styles.card}>
            <SectionTitle
                icon="info"
                title="Additional Information"
            />

            <div className={styles.additionalInfo}>

                <InfoBlock
                    label="Employment Status"
                    value={application.employment_status}
                />

                <InfoBlock
                    label="Organisation / Company"
                    value={application.organisation}
                />

                <InfoBlock
                    label="Current Job Title"
                    value={application.job_title}
                />

                <InfoBlock
                    label="Years of Professional Experience"
                    value={application.experience}
                />

                <InfoBlock
                    label="How did you hear about EVMI?"
                    value={application.referral}
                />

                <InfoBlock
                    label="Why are you interested in this programme?"
                    value={application.motivation}
                />

                <InfoBlock
                    label="Additional Information"
                    value={application.additional_info}
                />

            </div>
        </section>
    );
}

function InfoBlock({ label, value }) {
    return (
        <div>
            <p className={styles.label}>{label}</p>

            <div className={styles.longAnswer}>
                {value || "—"}
            </div>
        </div>
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

export default ApplicationAdditionalInfo;