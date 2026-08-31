import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { supabase } from "../../../lib/supabase";
import styles from "./AddCourse.module.css";
import Swal from "sweetalert2";

const COURSE_IMAGE_BUCKET = "course-images";

function AddCourse() {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [imageError, setImageError] = useState("");

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            short_title: "",
            category: "",
            description: "",
            image_url: "",
            duration: "",
            mode: "",
            credits: "",
            fee: "",
            entry_requirements: [""],
            is_active: true,
            is_featured: false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "entry_requirements",
    });

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        setImageError("");

        if (!file) {
            setImageFile(null);
            setImagePreview("");
            return;
        }

        if (!file.type.startsWith("image/")) {
            setImageError("Please select a valid image.");
            event.target.value = "";
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setImageError("Image must be smaller than 5MB.");
            event.target.value = "";
            return;
        }

        setImageFile(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
        setImageError("");

        const input = document.getElementById("course-image");

        if (input) {
            input.value = "";
        }
    };

    const uploadCourseImage = async () => {
        if (!imageFile) {
            throw new Error("Please select a course image.");
        }

        const fileExtension =
            imageFile.name.split(".").pop()?.toLowerCase() || "jpg";

        const fileName = `${crypto.randomUUID()}.${fileExtension}`;

        const filePath = `courses/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(COURSE_IMAGE_BUCKET)
            .upload(filePath, imageFile, {
                cacheControl: "3600",
                upsert: false,
                contentType: imageFile.type,
            });

        if (uploadError) {
            throw uploadError;
        }

        const {
            data: { publicUrl },
        } = supabase.storage
            .from(COURSE_IMAGE_BUCKET)
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const onSubmit = async (formData) => {
        try {
            setImageError("");

            if (!imageFile) {
                setImageError("Please select a course image.");

                await Swal.fire({
                    title: "Course Image Required",
                    text: "Please select an image for this course before saving.",
                    icon: "warning",
                    confirmButtonText: "Okay",
                    confirmButtonColor: "#041632",
                });

                return;
            }

            /*
             * Show loading dialog.
             */
            Swal.fire({
                title: "Creating Course...",
                text: "Uploading the course image and saving the programme.",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,

                didOpen: () => {
                    Swal.showLoading();
                },
            });

            /*
             * Upload image first.
             */
            const imageUrl = await uploadCourseImage();

            /*
             * Clean entry requirements.
             */
            const entryRequirements = formData.entry_requirements
                .map((requirement) => requirement.trim())
                .filter(Boolean);

            /*
             * Build course payload.
             */
            const payload = {
                title: formData.title.trim(),
                short_title: formData.short_title.trim(),
                category: formData.category,
                description: formData.description.trim(),

                image_url: imageUrl,

                duration: formData.duration.trim(),
                study_mode: formData.mode,
                credits: Number(formData.credits),
                fee: Number(formData.fee),

                requirements: entryRequirements,

                is_active: formData.is_active,
                is_featured: formData.is_featured,
            };

            /*
             * Insert course.
             */
            const { error: insertError } = await supabase
                .from("courses")
                .insert([payload]);

            if (insertError) {
                console.error(
                    "Failed to create course:",
                    insertError
                );

                /*
                 * Remove uploaded image if database insert fails.
                 */
                const uploadedPath =
                    imageUrl.split(
                        `/storage/v1/object/public/${COURSE_IMAGE_BUCKET}/`
                    )[1];

                if (uploadedPath) {
                    const { error: removeError } =
                        await supabase.storage
                            .from(COURSE_IMAGE_BUCKET)
                            .remove([uploadedPath]);

                    if (removeError) {
                        console.error(
                            "Failed to clean up uploaded image:",
                            removeError
                        );
                    }
                }

                await Swal.fire({
                    title: "Failed to Create Course",
                    text:
                        insertError.message ||
                        "The course could not be saved. Please try again.",
                    icon: "error",
                    confirmButtonText: "Close",
                    confirmButtonColor: "#041632",
                });

                return;
            }

            /*
             * Success.
             */
            await Swal.fire({
                title: "Course Created",
                text: `"${formData.title.trim()}" has been successfully created.`,
                icon: "success",
                confirmButtonText: "Continue",
                confirmButtonColor: "#041632",
            });

            /*
             * Navigate only after successful creation.
             */
            navigate("/admin/courses");
        } catch (error) {
            console.error(
                "Failed to save course:",
                error
            );

            await Swal.fire({
                title: "Something Went Wrong",
                text:
                    error?.message ||
                    "Something went wrong while saving the course.",
                icon: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#041632",
            });
        }
    };

    return (
        <main className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1>Add Course</h1>

                    <p>
                        Create a new academic programme.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Course Information */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h2>Course Information</h2>

                            <p>
                                Basic information about the academic
                                programme.
                            </p>
                        </div>
                    </div>

                    <div className={styles.formGrid}>
                        {/* Title */}
                        <div
                            className={`${styles.field} ${styles.full}`}
                        >
                            <label htmlFor="title">
                                Course Title
                            </label>

                            <input
                                id="title"
                                type="text"
                                placeholder="e.g. Certificate in Business Management"
                                {...register("title", {
                                    required:
                                        "Course title is required.",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Course title must be at least 3 characters.",
                                    },
                                })}
                            />

                            {errors.title && (
                                <span className={styles.error}>
                                    {errors.title.message}
                                </span>
                            )}
                        </div>

                        {/* Short Title */}
                        <div className={styles.field}>
                            <label htmlFor="short_title">
                                Short Title
                            </label>

                            <input
                                id="short_title"
                                type="text"
                                placeholder="e.g. CBM"
                                {...register("short_title", {
                                    required:
                                        "Short title is required.",
                                })}
                            />

                            {errors.short_title && (
                                <span className={styles.error}>
                                    {
                                        errors.short_title
                                            .message
                                    }
                                </span>
                            )}
                        </div>

                        {/* Category */}
                        <div className={styles.field}>
                            <label htmlFor="category">
                                Category
                            </label>

                            <select
                                id="category"
                                {...register("category", {
                                    required:
                                        "Please select a category.",
                                })}
                            >
                                <option value="">
                                    Select category
                                </option>

                                <option value="Business & Management">
                                    Business & Management
                                </option>

                                <option value="Hospitality">
                                    Hospitality
                                </option>

                                <option value="Education">
                                    Education
                                </option>

                                <option value="Technology">
                                    Technology
                                </option>
                            </select>

                            {errors.category && (
                                <span className={styles.error}>
                                    {errors.category.message}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div
                            className={`${styles.field} ${styles.full}`}
                        >
                            <label htmlFor="description">
                                Description
                            </label>

                            <textarea
                                id="description"
                                rows="5"
                                placeholder="Describe the course and what students will learn..."
                                {...register("description", {
                                    required:
                                        "Description is required.",
                                    minLength: {
                                        value: 20,
                                        message:
                                            "Description must be at least 20 characters.",
                                    },
                                })}
                            />

                            {errors.description && (
                                <span className={styles.error}>
                                    {
                                        errors.description
                                            .message
                                    }
                                </span>
                            )}
                        </div>

                        {/* Course Image */}
                        <div
                            className={`${styles.field} ${styles.full}`}
                        >
                            <label htmlFor="course-image">
                                Course Image
                            </label>

                            <div className={styles.imageUpload}>
                                {imagePreview ? (
                                    <div
                                        className={
                                            styles.imagePreview
                                        }
                                    >
                                        <img
                                            src={imagePreview}
                                            alt="Course preview"
                                        />

                                        <button
                                            type="button"
                                            className={
                                                styles.removeImage
                                            }
                                            onClick={removeImage}
                                        >
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>

                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="course-image"
                                        className={
                                            styles.uploadBox
                                        }
                                    >
                                        <span className="material-symbols-outlined">
                                            cloud_upload
                                        </span>

                                        <strong>
                                            Select course image
                                        </strong>

                                        <span>
                                            PNG, JPG or WEBP up
                                            to 5MB
                                        </span>
                                    </label>
                                )}

                                <input
                                    id="course-image"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={
                                        handleImageChange
                                    }
                                    className={
                                        styles.fileInput
                                    }
                                />
                            </div>

                            {imageError && (
                                <span className={styles.error}>
                                    {imageError}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Course Structure */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h2>Course Structure</h2>

                            <p>
                                Define how the programme is
                                delivered.
                            </p>
                        </div>
                    </div>

                    <div className={styles.formGrid}>
                        {/* Duration */}
                        <div className={styles.field}>
                            <label htmlFor="duration">
                                Duration
                            </label>

                            <input
                                id="duration"
                                type="text"
                                placeholder="e.g. 12 Weeks"
                                {...register("duration", {
                                    required:
                                        "Duration is required.",
                                })}
                            />

                            {errors.duration && (
                                <span className={styles.error}>
                                    {
                                        errors.duration
                                            .message
                                    }
                                </span>
                            )}
                        </div>

                        {/* Mode */}
                        <div className={styles.field}>
                            <label htmlFor="mode">
                                Mode of Study
                            </label>

                            <select
                                id="mode"
                                {...register("mode", {
                                    required:
                                        "Please select a mode of study.",
                                })}
                            >
                                <option value="">
                                    Select mode
                                </option>

                                <option value="Online">
                                    Online
                                </option>

                                <option value="Campus">
                                    Campus
                                </option>

                                <option value="Online / Campus">
                                    Online / Campus
                                </option>
                            </select>

                            {errors.mode && (
                                <span className={styles.error}>
                                    {errors.mode.message}
                                </span>
                            )}
                        </div>

                        {/* Credits */}
                        <div className={styles.field}>
                            <label htmlFor="credits">
                                Credits
                            </label>

                            <input
                                id="credits"
                                type="number"
                                min="0"
                                placeholder="30"
                                {...register("credits", {
                                    required:
                                        "Credits are required.",
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message:
                                            "Credits cannot be negative.",
                                    },
                                })}
                            />

                            {errors.credits && (
                                <span className={styles.error}>
                                    {
                                        errors.credits
                                            .message
                                    }
                                </span>
                            )}
                        </div>

                        {/* Fee */}
                        <div className={styles.field}>
                            <label htmlFor="fee">
                                Course Fee
                            </label>

                            <input
                                id="fee"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="1200"
                                {...register("fee", {
                                    required:
                                        "Course fee is required.",
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message:
                                            "Course fee cannot be negative.",
                                    },
                                })}
                            />

                            {errors.fee && (
                                <span className={styles.error}>
                                    {errors.fee.message}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Entry Requirements */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h2>Entry Requirements</h2>

                            <p>
                                Add the requirements applicants
                                must meet.
                            </p>
                        </div>
                    </div>

                    <div className={styles.requirements}>
                        {fields.map((field, index) => (
                            <div
                                className={
                                    styles.requirementRow
                                }
                                key={field.id}
                            >
                                <span
                                    className={
                                        styles.requirementNumber
                                    }
                                >
                                    {index + 1}
                                </span>

                                <div
                                    className={
                                        styles.requirementField
                                    }
                                >
                                    <input
                                        type="text"
                                        placeholder="e.g. Grade 12 certificate or equivalent"
                                        {...register(
                                            `entry_requirements.${index}`,
                                            {
                                                required:
                                                    "Requirement cannot be empty.",
                                            }
                                        )}
                                    />

                                    {errors
                                        .entry_requirements?.[
                                        index
                                    ] && (
                                            <span
                                                className={
                                                    styles.error
                                                }
                                            >
                                                {
                                                    errors
                                                        .entry_requirements[
                                                        index
                                                    ].message
                                                }
                                            </span>
                                        )}
                                </div>

                                <button
                                    type="button"
                                    className={
                                        styles.removeButton
                                    }
                                    onClick={() =>
                                        remove(index)
                                    }
                                    disabled={
                                        fields.length === 1
                                    }
                                    aria-label="Remove requirement"
                                >
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            className={styles.addRequirement}
                            onClick={() => append("")}
                        >
                            <span className="material-symbols-outlined">
                                add
                            </span>

                            Add Requirement
                        </button>
                    </div>
                </section>

                {/* Course Settings */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h2>Course Settings</h2>

                            <p>
                                Control the visibility and
                                presentation of this programme.
                            </p>
                        </div>
                    </div>

                    <div className={styles.settings}>
                        <label
                            className={styles.checkboxRow}
                        >
                            <input
                                type="checkbox"
                                {...register("is_active")}
                            />

                            <span>
                                <strong>
                                    Active Course
                                </strong>

                                <small>
                                    Make this course available
                                    on the website.
                                </small>
                            </span>
                        </label>

                        <label
                            className={styles.checkboxRow}
                        >
                            <input
                                type="checkbox"
                                {...register("is_featured")}
                            />

                            <span>
                                <strong>
                                    Featured Course
                                </strong>

                                <small>
                                    Display this course in the
                                    featured programmes
                                    section.
                                </small>
                            </span>
                        </label>
                    </div>
                </section>

                {/* Actions */}
                <div className={styles.actions}>
                    <Link
                        to="/admin/courses"
                        className={styles.cancelButton}
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className={styles.saveButton}
                        disabled={isSubmitting}
                    >
                        <span className="material-symbols-outlined">
                            {isSubmitting
                                ? "progress_activity"
                                : "save"}
                        </span>

                        {isSubmitting
                            ? "Saving Course..."
                            : "Save Course"}
                    </button>
                </div>
            </form>
        </main>
    );
}

export default AddCourse;