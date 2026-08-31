import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import styles from "./FeaturedCourses.module.css";

function FeaturedCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .eq("is_active", true)
                .eq("is_featured", true)
                .order("id");

            if (error) {
                console.error("Failed to load featured courses:", error);
                setLoading(false);
                return;
            }

            setCourses(data || []);
            setLoading(false);
        };

        fetchFeaturedCourses();
    }, []);

    if (loading) {
        return (
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.heading}>
                        <h2>Featured Certificate Programmes</h2>
                    </div>

                    <p>Loading programmes...</p>
                </div>
            </section>
        );
    }

    if (!courses.length) {
        return null;
    }

    // Match courses by their database ID,
    // not by their position in the returned array.
    const business = courses.find((course) => course.id === 1);
    const tourism = courses.find((course) => course.id === 2);
    const publicSpeaking = courses.find((course) => course.id === 3);
    const ai = courses.find((course) => course.id === 4);

    return (
        <section className={styles.section}>
            <div className={styles.container}>

                <div className={styles.heading}>
                    <h2>Featured Certificate Programmes</h2>

                    <Link to="/courses">
                        View All Courses →
                    </Link>
                </div>

                <div className={styles.grid}>

                    {/* Business Management */}
                    {business && (
                        <article
                            className={`${styles.card} ${styles.featuredCard}`}
                        >
                            <img
                                src={business.image_url}
                                alt={business.title}
                            />

                            <div className={styles.overlay} />

                            <div className={styles.featuredContent}>
                                <span className={styles.badge}>
                                    In High Demand
                                </span>

                                <h3>{business.title}</h3>

                                <p>{business.description}</p>

                                <Link className={styles.featuredButton} to={`/courses/${business.id}`}>
                                    View Programme
                                    <span className="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </Link>
                            </div>
                        </article>
                    )}

                    {/* AI */}
                    {ai && (
                        <article
                            className={`${styles.card} ${styles.smallCard}`}
                        >
                            <div className={styles.cardImage}>
                                <img
                                    src={ai.image_url}
                                    alt={ai.title}
                                />
                            </div>

                            <div className={styles.cardContent}>
                                <div>
                                    <h3>{ai.title}</h3>

                                    <p>{ai.description}</p>
                                </div>

                                <Link to={`/courses/${ai.id}`}>
                                    Learn More
                                    <span className="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </Link>
                            </div>
                        </article>
                    )}

                    {/* Tourism */}
                    {tourism && (
                        <article
                            className={`${styles.card} ${styles.smallCard}`}
                        >
                            <div className={styles.cardImage}>
                                <img
                                    src={tourism.image_url}
                                    alt={tourism.title}
                                />
                            </div>

                            <div className={styles.cardContent}>
                                <div>
                                    <h3>{tourism.title}</h3>

                                    <p>{tourism.description}</p>
                                </div>

                                <Link to={`/courses/${tourism.id}`}>
                                    Learn More
                                    <span className="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </Link>
                            </div>
                        </article>
                    )}

                    {/* Public Speaking */}
                    {publicSpeaking && (
                        <article
                            className={`${styles.card} ${styles.wideCard}`}
                        >
                            <div className={styles.wideContent}>
                                <span className={styles.outlineBadge}>
                                    Featured Programme
                                </span>

                                <h3>{publicSpeaking.title}</h3>

                                <p>{publicSpeaking.description}</p>

                                <Link to={`/courses/${publicSpeaking.id}`}>
                                    View Curriculum
                                </Link>
                            </div>

                            <div className={styles.wideImage}>
                                <img
                                    src={publicSpeaking.image_url}
                                    alt={publicSpeaking.title}
                                />
                            </div>
                        </article>
                    )}

                </div>

                <div className={styles.mobileLink}>
                    <Link to="/courses">
                        View All Courses →
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default FeaturedCourses;
