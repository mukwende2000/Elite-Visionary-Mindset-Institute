import styles from "./About.module.css";

function About() {
    return (
        <main className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1>About Elite Visionary Mindset Institute</h1>

                <p>
                    Empowering ambitious professionals through rigorous academic
                    excellence, practical skill development, and a commitment to
                    lifelong learning.
                </p>
            </section>

            {/* Who We Are / Mission / Vision */}
            <section className={styles.bentoGrid}>
                {/* Who We Are */}
                <div className={`${styles.glassPanel} ${styles.whoWeAre}`}>
                    <h2>Who We Are</h2>

                    <p>
                        The Elite Visionary Mindset Institute (EVMI) is a premier
                        educational institution dedicated to transforming
                        high-potential individuals into industry leaders. We blend
                        traditional academic rigor with modern, practical applications
                        to deliver an educational experience that is both
                        intellectually stimulating and immediately applicable in the
                        professional world.
                    </p>

                    <div className={styles.whoWeAreImage}>
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFyhTiE6Iycs99qoYEOMyRrxCPDUy9kBl61nalo2t4d7O_b14Lc7zS443Cm17AkZ9XNp1YsAwj3D8073x0XtYtXlPN-bxJmJkUkU2aqV9CegbzzMjOqMLTOhv8pPOExiHv_KvbXhRIKEcXIYfEx6yR7SVZp-9DU_-3T-77QXizHoVSL3yDTAT_QfSH1WhxFJvuvi9q5Jyx1efIr588UL9kH9a3G3YZwaIQjHCziku3B6zWnLXRwFA"
                            alt="Students engaging in a collaborative academic discussion"
                        />
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className={styles.missionVision}>
                    <div
                        className={`${styles.glassPanel} ${styles.missionCard}`}
                    >
                        <div className={styles.iconHeading}>
                            <span className="material-symbols-outlined">
                                flag
                            </span>

                            <h3>Our Mission</h3>
                        </div>

                        <p>
                            To equip professionals with practical, cutting-edge
                            skills and actionable knowledge that drive immediate
                            impact and sustainable career growth in rapidly evolving
                            global markets.
                        </p>
                    </div>

                    <div
                        className={`${styles.glassPanel} ${styles.visionCard}`}
                    >
                        <div className={styles.iconHeading}>
                            <span className="material-symbols-outlined">
                                visibility
                            </span>

                            <h3>Our Vision</h3>
                        </div>

                        <p>
                            To foster a global community of visionary leaders
                            committed to lifelong learning, continuous innovation,
                            and ethical professional practices that shape the future
                            of business.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className={styles.offerSection}>
                <h2>What We Offer</h2>

                <div className={styles.offerGrid}>
                    {/* Offer Card 1 */}
                    <div className={styles.offerCard}>
                        <div className={styles.offerIcon}>
                            <span className="material-symbols-outlined">
                                laptop_mac
                            </span>
                        </div>

                        <h3>Flexible Learning Modes</h3>

                        <p>
                            Choose between fully online, hybrid, or intensive
                            on-campus modules designed to fit the demanding schedules
                            of working professionals.
                        </p>
                    </div>

                    {/* Offer Card 2 */}
                    <div className={styles.offerCard}>
                        <div className={styles.offerIcon}>
                            <span className="material-symbols-outlined">
                                work
                            </span>
                        </div>

                        <h3>Professional Development</h3>

                        <p>
                            Gain practical skills through case studies, industry-led
                            workshops, and capstone projects that solve real-world
                            business challenges.
                        </p>
                    </div>

                    {/* Offer Card 3 */}
                    <div className={styles.offerCard}>
                        <div className={styles.offerIcon}>
                            <span className="material-symbols-outlined">
                                group
                            </span>
                        </div>

                        <h3>Global Network</h3>

                        <p>
                            Connect with a prestigious alumni network and industry
                            experts through exclusive symposiums and continuous
                            learning platforms.
                        </p>
                    </div>
                </div>
            </section>

            {/* Accreditation */}
            <section className={styles.accreditation}>
                <div className={styles.accreditationContent}>
                    <h2>Academic Excellence &amp; Accreditation</h2>

                    <p>
                        EVMI maintains rigorous academic standards and is proud to be
                        accredited by the Certification Board for Executive
                        Competencies (CBEC). This globally recognized accreditation
                        ensures that our curriculum meets the highest benchmarks for
                        professional education and leadership training.
                    </p>
                </div>

                <div className={styles.accreditationBadge}>
                    <div>
                        <span className="material-symbols-outlined">
                            verified
                        </span>

                        <div>CBEC Accredited</div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default About;