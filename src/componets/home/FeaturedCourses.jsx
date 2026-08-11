import styles from "./FeaturedCourses.module.css";

const courses = {
    business: {
        title: "Certificate in Business Management",
        description:
            "Develop practical business knowledge and management skills for today's competitive professional environment.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB7vDY3Zj-zIUyLwwXDOK4c_EOo448s23X9oYQ9uP9LnAIlSfPuEhVpOHLHBCy5CpQtn7RPbcE2GMMsdLT-vb31ucV9PONEZIbwuEOdlAYwXrbwjYYQ5w-AOd0z4nC2tZXm-qPgR3cgzUCwxly4pQGPK7NnPmJsEimzg9la5sBZafY7IxU3effRraVclFVtJ4f7eOsEZVsCteM4c6x1iOoGrMxdRsX6H8a2X_ZykIdfVduLaa-aK0Y",
    },

    ai: {
        title: "Certificate in Artificial Intelligence (AI) & Prompt Engineering",
        description:
            "Build practical AI skills and learn how to use prompt engineering to improve productivity and innovation.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA_4qCCW-mOHHTnrC4jkbkCkUlmDk4iea8ci8BXqvev4zOKfL1zNXU1UxqQuKGHb4h1LktrAVjjlJUfNCovG2SQ5coSaZIAmRnyb9urmm3glzhkDxTW8B6vxGZxjyYau3zf_sK9IYsXDSzBMkkw_wP0Ksa6lDh3zTEfb40SClHkHAXZhsrM76hQps0ywa538oXj7LnbdnWpW8DWXpavYOqUiedYvR3lTJ3P8Ga48XgIDKeuNv_3Ecw",
    },

    marketing: {
        title: "Certificate in Digital Marketing & Social Media Management",
        description:
            "Learn modern digital marketing strategies and how to build and manage effective social media campaigns.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA96jd0dkaaw4TOLm_L9IZ84nQddwHPj8UpLy43CIY9EizH3QmxzoSMQH5xWZKn7sfF7BlRysVaI4crKW3_pgFuRehbYOBPWNaw-uPlA5Vi_Z4eM9_DFgVnuZiCNCrAxOoTTUNM3VUNN8-YVxTRtCBhezXX08VY8Rqu-3AI-tupxzR3TddmQsESHuL-6tApMSO_IkLUNpApiLbMUiU4Oe6ZICXg0T5VMV65u7SZSgz3P4JzAPOZcAY",
    },

    leadership: {
        title: "Certificate in Leadership and Management",
        description:
            "Develop the leadership, decision-making and management capabilities needed to lead teams and organisations effectively.",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBR5uQh5xhy48KZf7qahuYshZRtn039tNJ68C_e2kT0AkhLqY5y_-ZQW-zhNTZDE_1HPXsQ5OLXbW5HNbXCeIUBblePUT9fLkLuQ2Gbpq6MQPdyOBor_-uuMji-wNxgU-3B5ze-cHhZtOby_gn4fIS2tf-C3Ky1knY2VLTgmiXp2htcj-xKZ42pJkDoUjrtr1O8e0o-fQpyIxq92_1slW0pKZp-VJg6hbH6IIkWgV7jcBL1KUk_Hk8",
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