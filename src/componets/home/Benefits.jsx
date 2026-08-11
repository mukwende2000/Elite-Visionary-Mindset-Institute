import styles from "./Benefits.module.css"

const benefits = [
    {
        icon: "◈",
        title: "Practical Learning",
        description:
            "Apply theoretical concepts immediately to real-world business scenarios.",
    },
    {
        icon: "◷",
        title: "Flexible Study",
        description:
            "Designed to accommodate the schedules of working professionals.",
    },
    {
        icon: "↗",
        title: "Career-Focused",
        description:
            "Build practical skills that can help you progress in today's workplace.",
    },
    {
        icon: "◆",
        title: "Professional Development",
        description:
            "Develop valuable skills while earning recognized professional credentials.",
    },
]

function Benefits() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2>Learning That Moves You Forward</h2>

                <div className={styles.grid}>
                    {benefits.map((benefit) => (
                        <article className={styles.card} key={benefit.title}>
                            <span className={styles.icon}>{benefit.icon}</span>

                            <h3>{benefit.title}</h3>

                            <p>{benefit.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Benefits