import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../../../../lib/supabase";
import styles from "./CourseDetailsHeader.module.css";

function CourseDetailsHeader({ course }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Delete Course?",
            html: `
                <p>
                    Are you sure you want to delete
                    <strong>${course.title}</strong>?
                </p>

                <p style="margin-top: 8px; color: #ba1a1a;">
                    This action cannot be undone.
                </p>
            `,
            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete Course",
            cancelButtonText: "Cancel",

            reverseButtons: true,

            focusCancel: true,

            confirmButtonColor: "#ba1a1a",
            cancelButtonColor: "#ffffff",

            customClass: {
                popup: "course-delete-popup",
                title: "course-delete-title",
                htmlContainer: "course-delete-content",
                confirmButton: "course-delete-confirm",
                cancelButton: "course-delete-cancel",
            },
        });

        if (!result.isConfirmed) {
            return;
        }

        // Show loading state while Supabase deletes
        Swal.fire({
            title: "Deleting Course...",
            text: "Please wait while the course is being removed.",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,

            didOpen: () => {
                Swal.showLoading();
            },
        });

        const { error } = await supabase
            .from("courses")
            .delete()
            .eq("id", course.id);

        if (error) {
            console.error("Failed to delete course:", error);

            await Swal.fire({
                title: "Delete Failed",
                text:
                    error.message ||
                    "Unable to delete the course. Please try again.",
                icon: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#041632",
            });

            return;
        }

        await Swal.fire({
            title: "Course Deleted",
            text: `"${course.title}" has been successfully deleted.`,
            icon: "success",
            confirmButtonText: "Continue",
            confirmButtonColor: "#041632",
        });

        navigate("/admin/courses");
    };

    return (
        <div className={styles.header}>
            <div className={styles.heading}>
                <Link
                    to="/admin/courses"
                    className={styles.backLink}
                >
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>

                    Back to Courses
                </Link>

                <h1>{course.title}</h1>

                {course.short_title && (
                    <p>{course.short_title}</p>
                )}
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={handleDelete}
                >
                    <span className="material-symbols-outlined">
                        delete
                    </span>

                    Delete
                </button>

                <button
                    type="button"
                    className={styles.primaryButton}
                >
                    <span className="material-symbols-outlined">
                        edit
                    </span>

                    Edit Course
                </button>
            </div>
        </div>
    );
}

export default CourseDetailsHeader;
