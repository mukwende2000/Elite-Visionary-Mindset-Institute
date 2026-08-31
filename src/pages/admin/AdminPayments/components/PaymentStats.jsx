import styles from "./PaymentStats.module.css";

function PaymentStats({ cards }) {
    return (
        <section className={styles.grid}>
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={styles.card}
                >
                    <div className={styles.iconWrapper}>
                        <span className="material-symbols-outlined">
                            {card.icon}
                        </span>
                    </div>

                    <div className={styles.value}>
                        {card.value}
                    </div>

                    <div
                        className={`${styles.label} ${styles[card.type]
                            }`}
                    >
                        {card.label}
                    </div>

                    <div className={styles.description}>
                        {card.description}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default PaymentStats;