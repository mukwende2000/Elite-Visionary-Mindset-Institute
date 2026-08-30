import { useEffect, useState } from "react";
import CourseCard from "../../components/courses/CourseCard";
import styles from "./Courses.module.css";
import enroll from '../../assets/images/enroll.jpeg'
import { Link } from "react-router-dom";
import CourseModal from "../../components/courses/CourseModal";
import { supabase } from "../../lib/supabase";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const openModal = (course) => {
        setSelectedCourse(course);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError("");

            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .eq("is_active", true)
                .order("id", { ascending: true });

            if (error) {
                console.error("Failed to load courses:", error);
                setError("Unable to load courses. Please try again.");
                setCourses([]);
            } else {
                setCourses(data);
            }

            setLoading(false);
        };

        fetchCourses();
    }, []);

    const closeModal = () => {
        setSelectedCourse(null);
    };

    // Prevent background scrolling while the modal is open
    useEffect(() => {
        if (selectedCourse) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedCourse]);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroContainer}>

                    <div className={styles.heroContent}>
                        <h1>
                            Build the expertise
                            <span> that moves you forward.</span>
                        </h1>

                        <p>
                            Develop practical leadership, business, and professional
                            capabilities through certificate programmes designed for
                            ambitious professionals and emerging leaders.
                        </p>

                        <div className={styles.heroActions}>
                            <Link to="/apply" className={styles.heroPrimaryButton}>
                                Apply Now
                                <span className="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </Link>

                            <a href="#programmes" className={styles.heroSecondaryButton}>
                                Explore Programmes
                            </a>
                        </div>

                    </div>

                    <div className={styles.heroVisual}>
                        <img
                            src={enroll}
                            alt="Professionals engaged in a modern academic learning environment"
                        />

                        <div className={styles.heroImageCard}>
                            <span className="material-symbols-outlined">
                                school
                            </span>

                            <div>
                                <strong>Learn. Apply. Lead.</strong>
                                <span>Professional education built for impact.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section id="programmes" className={styles.courseSection}>
                <div className={styles.container}>
                    <div className={styles.courseGrid}>
                        {loading && (
                            <p>Loading programmes...</p>
                        )}

                        {!loading && error && (
                            <p>{error}</p>
                        )}

                        {!loading && !error && courses.length === 0 && (
                            <p>No programmes are currently available.</p>
                        )}

                        {!loading && !error &&
                            courses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    onViewDetails={openModal}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Courses;