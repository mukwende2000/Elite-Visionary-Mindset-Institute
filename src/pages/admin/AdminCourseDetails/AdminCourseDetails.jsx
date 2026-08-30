import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

import CourseDetailsHeader from "./components/CourseDetailsHeader";
import CourseOverview from "./components/CourseOverview";
import CourseDetailsSidebar from "./components/CourseDetailsSidebar";
import CourseDetailsContent from "./components/CourseDetailsContent";

import styles from "./AdminCourseDetails.module.css";

function AdminCourseDetails() {
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            setError("");

            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error(
                    "Failed to load course:",
                    error
                );

                setError("Unable to load this course.");
                setCourse(null);
            } else {
                setCourse(data);
            }

            setLoading(false);
        };

        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.message}>
                    Loading course...
                </div>
            </main>
        );
    }

    if (error || !course) {
        return (
            <main className={styles.page}>
                <div className={`${styles.message} ${styles.error}`}>
                    <h1>Course not found</h1>

                    <p>
                        {error ||
                            "The requested course could not be found."}
                    </p>

                    <Link
                        to="/admin/courses"
                        className={styles.backButton}
                    >
                        Back to Courses
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <CourseDetailsHeader course={course} />

            <CourseOverview course={course} />

            <div className={styles.layout}>
                <CourseDetailsContent course={course} />

                <CourseDetailsSidebar course={course} />
            </div>
        </main>
    );
}

export default AdminCourseDetails;