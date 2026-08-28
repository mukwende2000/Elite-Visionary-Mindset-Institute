import styles from "./ApplicationEmergencyInfo.module.css";

function ApplicationEmergencyInfo({ application }) {
    const emergencyName = [
        application.emergency_name,
        application.emergency_surname,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={styles.card}>
            <SectionTitle
                icon="contact_emergency"
                title="Emergency Contact"
            />

            <div className={styles.infoGrid}>

                <InfoItem
                    label="Full Name"
                    value={emergencyName}
                />

                <InfoItem
                    label="Relationship"
                    value={application.relationship}
                />

                <InfoItem
                    label="Phone Number"
                    value={application.emergency_phone}
                />

                <InfoItem
                    label="Email Address"
                    value={application.emergency_email}
                />

                <InfoItem
                    label="Occupation"
                    value={application.emergency_occupation}
                />

                <div className={styles.fullWidth}>
                    <p className={styles.label}>
                        Address
                    </p>

                    <p className={styles.value}>
                        {application.emergency_address || "—"}
                    </p>
                </div>

                <div className={styles.fullWidth}>
                    <p className={styles.label}>
                        Additional Contact
                    </p>

                    <p className={styles.value}>
                        {application.additional_contact || "—"}
                    </p>
                </div>
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

function InfoItem({ label, value }) {
    return (
        <div>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value || "—"}</p>
        </div>
    );
}

export default ApplicationEmergencyInfo;