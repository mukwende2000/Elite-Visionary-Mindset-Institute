import styles from './TeamMember.module.css'

function TeamMember({ member, setSelectedMember }) {
    return (
        <article className={styles.teamCard} key={member.id}>
            <img src={member.image} alt={member.name} />

            <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
            </div>

            <button
                type="button"
                onClick={() => setSelectedMember(member)}
            >
                View Bio
            </button>
        </article>
    )
}

export default TeamMember
