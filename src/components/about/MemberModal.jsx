import styles from './MemberModal.module.css'

function MemberModal({ setSelectedMember, selectedMember }) {
    return (
        <div
            className={styles.modalOverlay}
            onClick={() => setSelectedMember(null)}
        >
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={() => setSelectedMember(null)}
                    aria-label="Close biography"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className={styles.modalContent}>
                    <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                    />

                    <div className={styles.modalText}>
                        <div>
                            <h2>{selectedMember.name}</h2>
                            <p>{selectedMember.role}</p>
                        </div>

                        <p>{selectedMember.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberModal
