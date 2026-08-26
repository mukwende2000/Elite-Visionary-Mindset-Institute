import styles from "./AdminApplicationDetails.module.css";

function AdminApplicationDetails() {
    const application = {
        name: "Alexander Hamilton",
        fullName: "Alexander James Hamilton",
        applicationId: "APP-2023-8942",
        submitted: "Oct 24, 2023",
        dateOfBirth: "January 11, 1985",
        gender: "Male",
        nationality: "United States",
        email: "a.hamilton@treasury.gov",
        phone: "+1 (212) 555-0189",
        address: (
            <>
                74 Wall Street, Penthouse 4
                <br />
                New York, NY 10005
                <br />
                United States
            </>
        ),
        programme: "Executive MBA in Strategic Leadership",
        studyMode: "Online Hybrid",
        intake: "Fall 2024 Intake",
        education: "Master of Science in Finance",
        institution: "King's College (Columbia University)",
        occupation: "Chief Financial Officer",
        company: "First Bank of the United States",
        referral: "Professional Colleague Referral (George Washington)",
        motivation:
            "Seeking to solidify strategic frameworks for national-scale financial restructuring. The curriculum's focus on executive vision aligns directly with my current mandate to establish robust institutional foundations for emerging markets. I aim to leverage the cohort's collective experience to pressure-test innovative fiscal policies.",
    };

    const notes = [
        {
            author: "A. Burr (Admissions)",
            date: "Oct 25, 2:15 PM",
            content:
                "Transcripts verified. Exceptional quantitative background, though references note an abrasive leadership style.",
        },
        {
            author: "System Auto-Check",
            date: "Oct 24, 9:00 AM",
            content: "Application fee received ($150.00 USD).",
            verified: true,
        },
    ];



    return (
        <main className={styles.page}>
            <div className={styles.container}>

                {/* Back */}
                <div className={styles.backRow}>
                    <button type="button" className={styles.backButton}>
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                        Back to Applications
                    </button>
                </div>

                {/* Applicant Header */}
                <section className={styles.profileHeader}>
                    <div className={styles.accentLine} />

                    <div className={styles.profileInfo}>
                        <div className={styles.avatar}>
                            <span className="material-symbols-outlined">
                                person
                            </span>
                        </div>

                        <div>
                            <h1>{application.name}</h1>

                            <div className={styles.meta}>
                                <span>
                                    <span className="material-symbols-outlined">
                                        tag
                                    </span>
                                    {application.applicationId}
                                </span>

                                <span>
                                    <span className="material-symbols-outlined">
                                        calendar_today
                                    </span>
                                    Submitted: {application.submitted}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statusBadge}>
                        <span />
                        Pending Review
                    </div>
                </section>

                {/* Main Grid */}
                <div className={styles.contentGrid}>

                    {/* Left */}
                    <div className={styles.mainColumn}>

                        {/* Personal Information */}
                        <section className={styles.card}>
                            <SectionTitle
                                icon="person"
                                title="Personal Information"
                            />

                            <div className={styles.infoGrid}>
                                <InfoItem
                                    label="Full Legal Name"
                                    value={application.fullName}
                                />

                                <InfoItem
                                    label="Date of Birth"
                                    value={application.dateOfBirth}
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
                                    <p className={styles.label}>
                                        Email Address
                                    </p>

                                    <a
                                        href={`mailto:${application.email}`}
                                        className={styles.link}
                                    >
                                        {application.email}
                                    </a>
                                </div>

                                <div className={styles.fullWidth}>
                                    <p className={styles.label}>
                                        Phone Number
                                    </p>
                                    <p className={styles.value}>
                                        {application.phone}
                                    </p>
                                </div>

                                <div className={styles.fullWidth}>
                                    <p className={styles.label}>
                                        Residential Address
                                    </p>

                                    <p className={styles.value}>
                                        {application.address}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Academic Information */}
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
                                        {application.programme}
                                    </p>

                                    <div className={styles.tags}>
                                        <span>
                                            <span className="material-symbols-outlined">
                                                laptop_mac
                                            </span>
                                            {application.studyMode}
                                        </span>

                                        <span>
                                            <span className="material-symbols-outlined">
                                                event
                                            </span>
                                            {application.intake}
                                        </span>
                                    </div>
                                </div>

                                <InfoItem
                                    label="Highest Education Level"
                                    value={application.education}
                                    secondary={application.institution}
                                />

                                <InfoItem
                                    label="Current Occupation"
                                    value={application.occupation}
                                    secondary={application.company}
                                />
                            </div>
                        </section>

                        {/* Additional Information */}
                        <section className={styles.card}>
                            <SectionTitle
                                icon="info"
                                title="Additional Information"
                            />

                            <div className={styles.additionalInfo}>

                                <div>
                                    <p className={styles.label}>
                                        How did you hear about EVMI?
                                    </p>

                                    <div className={styles.answer}>
                                        {application.referral}
                                    </div>
                                </div>

                                <div>
                                    <p className={styles.label}>
                                        Why are you enrolling in this program?
                                    </p>

                                    <div className={styles.longAnswer}>
                                        {application.motivation}
                                    </div>
                                </div>

                            </div>
                        </section>

                    </div>

                    {/* Right */}
                    <aside className={styles.sidebar}>

                        {/* Decision */}
                        <section className={`${styles.card} ${styles.decisionCard}`}>
                            <SectionTitle
                                icon="gavel"
                                title="Application Decision"
                            />

                            <p className={styles.description}>
                                Review applicant credentials thoroughly before
                                making a final determination.
                            </p>

                            <div className={styles.actions}>
                                <button
                                    type="button"
                                    className={styles.approveButton}
                                >
                                    <span className="material-symbols-outlined">
                                        check_circle
                                    </span>
                                    Approve Admission
                                </button>

                                <button
                                    type="button"
                                    className={styles.rejectButton}
                                >
                                    <span className="material-symbols-outlined">
                                        cancel
                                    </span>
                                    Reject Application
                                </button>
                            </div>
                        </section>

                        {/* Internal Notes */}
                        <section className={`${styles.card} ${styles.notesCard}`}>
                            <SectionTitle
                                icon="speaker_notes"
                                title="Internal Notes"
                            />

                            <div className={styles.noteInput}>
                                <textarea
                                    placeholder="Add an administrative note..."
                                />

                                <div className={styles.noteButtonRow}>
                                    <button
                                        type="button"
                                        className={styles.addNoteButton}
                                    >
                                        Add Note
                                    </button>
                                </div>
                            </div>

                            <div className={styles.noteHistory}>
                                {notes.map((note, index) => (
                                    <div
                                        key={`${note.author}-${index}`}
                                        className={styles.note}
                                    >
                                        <div className={styles.noteHeader}>
                                            <strong>{note.author}</strong>
                                            <span>{note.date}</span>
                                        </div>

                                        <p>
                                            {note.verified && (
                                                <span
                                                    className={`material-symbols-outlined ${styles.verified}`}
                                                >
                                                    verified
                                                </span>
                                            )}

                                            {note.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </aside>
                </div>

                <div className={styles.bottomSpace} />
            </div>
        </main>
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

            <p className={styles.value}>{value}</p>

            {secondary && (
                <p className={styles.secondary}>
                    {secondary}
                </p>
            )}
        </div>
    );
}

export default AdminApplicationDetails;