import styles from "./ApplicationPersonalInfo.module.css";

function ApplicationPersonalInfo({ application }) {
    const fullName = [
        application.first_name,
        application.other_names,
        application.surname,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section className={styles.card}>
            <SectionTitle
                icon="person"
                title="Personal Information"
            />

            <div className={styles.infoGrid}>
                <InfoItem
                    label="Full Legal Name"
                    value={fullName}
                />

                <InfoItem
                    label="Date of Birth"
                    value={application.date_of_birth}
                />

                <InfoItem
                    label="Gender"
                    value={application.gender}
                />

                <InfoItem
                    label="Nationality"
                    value={application.nationality}
                />

                <div className={styles.fullWidth}>
                    <p className={styles.label}>Email Address</p>

                    <a
                        href={`mailto:${application.email}`}
                        className={styles.link}
                    >
                        {application.email}
                    </a>
                </div>

                <InfoItem
                    label="Phone Number"
                    value={application.phone}
                />

                <InfoItem
                    label="Alternative Phone"
                    value={application.alternative_phone}
                />

                <div className={styles.fullWidth}>
                    <p className={styles.label}>
                        Residential Address
                    </p>

                    <p className={styles.value}>
                        {application.address}
                        <br />
                        {application.town_city}, {application.province}
                    </p>
                </div>

                <InfoItem
                    label="ID Number"
                    value={application.id_number}
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

function InfoItem({ label, value }) {
    return (
        <div>
            <p className={styles.label}>{label}</p>
            <p className={styles.value}>{value || "—"}</p>
        </div>
    );
}

export default ApplicationPersonalInfo;