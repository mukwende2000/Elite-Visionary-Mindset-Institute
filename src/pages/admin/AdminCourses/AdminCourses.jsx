import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabase";
import styles from "./AdminCourses.module.css";

import CoursesHeader from "../../../components/admin/CoursesHeader/CoursesHeader";
import CoursesStats from "../../../components/admin/CoursesStats/CoursesStats";
import CoursesToolbar from "../../../components/admin/CoursesToolbar/CoursesToolbar";
import CoursesTable from "../../../components/admin/CoursesTable/CoursesTable";
import CoursesPagination from "../../../components/admin/CoursesPagination/CoursesPagination";

function AdminCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");

    const [page, setPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError("");

            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .order("id", { ascending: true });

            if (error) {
                console.error("Failed to load courses:", error);
                setError("Unable to load courses.");
                setCourses([]);
            } else {
                setCourses(data || []);
            }

            setLoading(false);
        };

        fetchCourses();
    }, []);

    const categories = useMemo(() => {
        return [
            ...new Set(
                courses
                    .map((course) => course.category)
                    .filter(Boolean)
            ),
        ];
    }, [courses]);

    const filteredCourses = useMemo(() => {
        const query = search.trim().toLowerCase();

        return courses.filter((course) => {
            const matchesSearch =
                !query ||
                course.title?.toLowerCase().includes(query) ||
                course.short_title?.toLowerCase().includes(query) ||
                course.category?.toLowerCase().includes(query);

            const matchesStatus =
                status === "" ||
                (status === "active" && course.is_active) ||
                (status === "inactive" && !course.is_active);

            const matchesCategory =
                category === "" ||
                course.category === category;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory
            );
        });
    }, [courses, search, status, category]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredCourses.length / itemsPerPage)
    );

    const paginatedCourses = useMemo(() => {
        const start = (page - 1) * itemsPerPage;

        return filteredCourses.slice(
            start,
            start + itemsPerPage
        );
    }, [filteredCourses, page]);

    useEffect(() => {
        setPage(1);
    }, [search, status, category]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const stats = useMemo(() => {
        const active = courses.filter(
            (course) => course.is_active
        ).length;

        return {
            total: courses.length,
            active,
            inactive: courses.length - active,
        };
    }, [courses]);

    return (
        <main className={styles.page}>
            <CoursesHeader />

            <CoursesStats
                total={stats.total}
                active={stats.active}
                inactive={stats.inactive}
            />

            <CoursesToolbar
                search={search}
                onSearchChange={setSearch}
                status={status}
                onStatusChange={setStatus}
                category={category}
                onCategoryChange={setCategory}
            />

            {loading && (
                <div className={styles.message}>
                    Loading courses...
                </div>
            )}

            {!loading && error && (
                <div className={`${styles.message} ${styles.error}`}>
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <CoursesTable courses={paginatedCourses} />

                    <CoursesPagination
                        page={page}
                        totalPages={totalPages}
                        totalItems={filteredCourses.length}
                        itemsPerPage={itemsPerPage}
                        setPage={setPage}
                    />
                </>
            )}
        </main>
    );
}

export default AdminCourses;