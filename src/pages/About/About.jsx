import { useState } from "react";
import styles from "./About.module.css";
import team from "../../data/teamMembers";
import aboutImage from '../../assets/images/JAME4133.jpg'
import TeamMember from "../../components/about/TeamMember";
import MemberModal from "../../components/about/MemberModal";

export default function About() {
    const [selectedMember, setSelectedMember] = useState(null);

    return (
        <main className={styles.aboutPage}>
            {/* Hero */}
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
                <div className={`${styles.glassPanel} ${styles.whoWeAre}`}>
                    <div>
                        <h2>Who We Are</h2>

                        <p>
                            The Visionary Mindset is a Leadership and
                            entreprenurial movement built for bold thinkers,
                            disciplined builders, and futuer focused leaders.
                        </p>
                    </div>

                    <img
                        src={aboutImage}
                        alt="EVMI learning environment"
                    />
                </div>

                <div className={styles.missionVision}>
                    <div
                        className={`${styles.glassPanel} ${styles.infoCard} ${styles.mission}`}
                    >
                        <div className={styles.infoHeading}>
                            <span className="material-symbols-outlined">flag</span>
                            <h3>Our Mission</h3>
                        </div>

                        <p>
                            To develop a generations of strategic, emotionally intelligent,
                            and execution-driven leaders who turn ideas into measureable impact.
                        </p>
                    </div>

                    <div
                        className={`${styles.glassPanel} ${styles.infoCard} ${styles.vision}`}
                    >
                        <div className={styles.infoHeading}>
                            <span className="material-symbols-outlined">visibility</span>
                            <h3>Our Vision</h3>
                        </div>

                        <p>
                            To foster a global community of visionary leaders committed to
                            lifelong learning, continuous innovation, and ethical professional
                            practices that shape the future of business.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>What We Offer</h2>

                <div className={styles.offerGrid}>
                    <div className={styles.glassPanel}>
                        <div className={styles.iconBox}>
                            <span className="material-symbols-outlined">laptop_mac</span>
                        </div>

                        <h3>Flexible Learning Modes</h3>

                        <p>
                            Choose between fully online, hybrid, or intensive on-campus
                            modules designed to fit the demanding schedules of working
                            professionals.
                        </p>
                    </div>

                    <div className={styles.glassPanel}>
                        <div className={styles.iconBox}>
                            <span className="material-symbols-outlined">work</span>
                        </div>

                        <h3>Professional Development</h3>

                        <p>
                            Gain practical skills through case studies, industry-led
                            workshops, and capstone projects that solve real-world business
                            challenges.
                        </p>
                    </div>

                    <div className={styles.glassPanel}>
                        <div className={styles.iconBox}>
                            <span className="material-symbols-outlined">group</span>
                        </div>

                        <h3>Global Network</h3>

                        <p>
                            Connect with a prestigious alumni network and industry experts
                            through exclusive symposiums and continuous learning platforms.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className={styles.teamSection}>
                <h2 className={styles.sectionTitle}>Meet Our Team</h2>

                <div className={styles.teamGrid}>
                    {team.map((member) => {
                        return <TeamMember setSelectedMember={setSelectedMember} member={member} />
                    })}
                </div>
            </section>

            {/* Accreditation */}
            <section className={styles.accreditation}>
                <div>
                    <h2>Academic Excellence & Accreditation</h2>

                    <p>
                        EVMI maintains rigorous academic standards and is proud to be
                        accredited by the Certification Board for Executive Competencies
                        (CBEC). This globally recognized accreditation ensures that our
                        curriculum meets the highest benchmarks for professional education
                        and leadership training.
                    </p>
                </div>

                <div className={styles.accreditationBadge}>
                    <span className="material-symbols-outlined">verified</span>

                    <strong>CBEC Accredited</strong>
                </div>
            </section>

            {/* Bio Modal */}
            {selectedMember && (
                <MemberModal setSelectedMember={setSelectedMember} selectedMember={selectedMember} />
            )}
        </main>
    );
}