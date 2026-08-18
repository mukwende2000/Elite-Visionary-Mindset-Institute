import styles from "./FeaturedCourses.module.css";
import cert_in_business from '../../assets/images/cert_in_business.jpeg'
import cert_in_tourism from '../../assets/images/cert_in_tourism.jpeg'
import cert_in_public_speaking from '../../assets/images/cert_in_public_speaking.jpeg'
import cert_in_ai from '../../assets/images/cert_in_ai.jpeg'

const courses = {
    business: {
        title: "Certificate in Business Management",
        description:
            "Develop practical business knowledge and management skills for today's competitive professional environment.",
        image:
            cert_in_business,
    },

    ai: {
        title: "Certificate in Artificial Intelligence (AI) & Prompt Engineering",
        description:
            "Build practical AI skills and learn how to use prompt engineering to improve productivity and innovation.",
        image:
            cert_in_ai
    },

    marketing: {
        title: "Certificate in Digital Marketing & Social Media Management",
        description:
            "Learn modern digital marketing strategies and how to build and manage effective social media campaigns.",
        image:
            cert_in_public_speaking
    },

    leadership: {
        title: "Certificate in Leadership and Management",
        description:
            "Develop the leadership, decision-making and management capabilities needed to lead teams and organisations effectively.",
        image:
            cert_in_tourism,
    },
};

function FeaturedCourses() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h2>Featured Certificate Programmes</h2>

                    <a href="/courses">View All Courses →</a>
                </div>

                <div className={styles.grid}>
                    {/* Large feature */}
                    <article className={`${styles.card} ${styles.featuredCard}`}>
                        <img src={courses.business.image} alt="" />

                        <div className={styles.overlay} />

                        <div className={styles.featuredContent}>
                            <span className={styles.badge}>In High Demand</span>

                            <h3>{courses.business.title}</h3>

                            <p>{courses.business.description}</p>
                        </div>
                    </article>

                    {/* AI */}
                    <article className={`${styles.card} ${styles.smallCard}`}>
                        <div className={styles.cardImage}>
                            <img src={courses.ai.image} alt="" />
                        </div>

                        <div className={styles.cardContent}>
                            <div>
                                <h3>{courses.ai.title}</h3>
                                <p>{courses.ai.description}</p>
                            </div>

                            <a href="/courses">
                                Learn More
                                <span className="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                    </article>

                    {/* Digital Marketing */}
                    <article className={`${styles.card} ${styles.smallCard}`}>
                        <div className={styles.cardImage}>
                            <img src={courses.marketing.image} alt="" />
                        </div>

                        <div className={styles.cardContent}>
                            <div>
                                <h3>{courses.marketing.title}</h3>
                                <p>{courses.marketing.description}</p>
                            </div>

                            <a href="/courses">
                                Learn More
                                <span className="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                    </article>

                    {/* Leadership */}
                    <article className={`${styles.card} ${styles.wideCard}`}>
                        <div className={styles.wideContent}>
                            <span className={styles.outlineBadge}>Featured Programme</span>

                            <h3>{courses.leadership.title}</h3>

                            <p>{courses.leadership.description}</p>

                            <a href="/courses">View Curriculum</a>
                        </div>

                        <div className={styles.wideImage}>
                            <img src={courses.leadership.image} alt="" />
                        </div>
                    </article>
                </div>

                <div className={styles.mobileLink}>
                    <a href="/courses">View All Courses →</a>
                </div>
            </div>
        </section>
    );
}

export default FeaturedCourses;