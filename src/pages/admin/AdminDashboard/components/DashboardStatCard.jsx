import styles from "./DashboardStatCard.module.css";

function StatsGrid({ stats }) {
    return (
        <section className={styles.statsGrid}>
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={styles.statCard}
                >
                    <div className={styles.statHeader}>
                        <p>{stat.label}</p>

                        <span
                            className={`material-symbols-outlined ${styles[stat.type]}`}
                        >
                            {stat.icon}
                        </span>
                    </div>

                    <h2>{stat.value}</h2>
                </div>
            ))}
        </section>
    );
}

export default StatsGrid;