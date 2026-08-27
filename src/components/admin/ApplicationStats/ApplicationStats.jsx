import styles from "./ApplicationStats.module.css";

function ApplicationStats({ stats }) {
    return (
        <section className={styles.statsGrid}>
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={styles.statCard}
                >
                    <div>
                        <p>{stat.label}</p>
                        <h2>{stat.value}</h2>
                    </div>

                    <div
                        className={`${styles.statIcon} ${styles[stat.type]}`}
                    >
                        <span className="material-symbols-outlined">
                            {stat.icon}
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default ApplicationStats;