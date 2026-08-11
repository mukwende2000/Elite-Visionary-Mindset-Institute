import styles from "./Accreditation.module.css";

function AccreditationSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <span className={styles.icon}>workspace_premium</span>

                <h2>
                    Accredited by the Central Board of Education Canada (CBEC)
                </h2>

                <p>
                    The Elite Visionary Mindset Institute is officially accredited by
                    CBEC, ensuring that our certificate programmes meet rigorous
                    international standards for academic excellence and professional
                    relevance. This accreditation reflects our commitment to providing
                    students with quality education that is recognised and respected by
                    employers and professional bodies.
                </p>

                <button className={styles.button}>
                    Learn More About Our Standards
                </button>
            </div>
        </section>
    );
}

export default AccreditationSection;