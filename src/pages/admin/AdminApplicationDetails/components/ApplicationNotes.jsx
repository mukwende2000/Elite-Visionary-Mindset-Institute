import styles from "./ApplicationNotes.module.css";

function ApplicationNotes({ applicationId }) {
    return (
        <section
            className={`${styles.card} ${styles.notesCard}`}
        >
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

export default ApplicationNotes;