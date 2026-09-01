import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Swal from "sweetalert2";
import styles from "./AdminProfile.module.css";

function AdminProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [fullName, setFullName] = useState("");
    const [jobTitle, setJobTitle] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);

            try {
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError) {
                    throw userError;
                }

                if (!user) {
                    return;
                }

                const { data, error } = await supabase
                    .from("admin_profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    throw error;
                }

                setProfile(data);
                setFullName(data.full_name || "");
                setJobTitle(data.job_title || "");
            } catch (error) {
                console.error(
                    "Failed to load admin profile:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const getInitials = (name = "") => {
        return name
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const handleSave = async () => {
        if (!fullName.trim() || !jobTitle.trim()) {
            await Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Full name and job title are required.",
                confirmButtonText: "Okay",
            });

            return;
        }

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return;
        }

        const { data, error } = await supabase
            .from("admin_profiles")
            .update({
                full_name: fullName.trim(),
                job_title: jobTitle.trim(),
            })
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            console.error(
                "Failed to update admin profile:",
                error
            );

            await Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "We could not update your profile.",
                confirmButtonText: "Okay",
            });

            return;
        }

        setProfile(data);
        setFullName(data.full_name || "");
        setJobTitle(data.job_title || "");
        setEditing(false);

        await Swal.fire({
            icon: "success",
            title: "Profile Updated",
            text: "Your profile information has been updated successfully.",
            confirmButtonText: "Done",
        });
    };

    const handleCancelEdit = () => {
        setFullName(profile?.full_name || "");
        setJobTitle(profile?.job_title || "");
        setEditing(false);
    };

    const resetPasswordForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    const handleCancelPassword = () => {
        resetPasswordForm();
        setChangingPassword(false);
    };

    const handleChangePassword = async () => {
        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            await Swal.fire({
                icon: "warning",
                title: "Complete All Fields",
                text: "Please enter your current password, new password, and confirm your new password.",
                confirmButtonText: "Okay",
            });

            return;
        }

        if (newPassword.length < 8) {
            await Swal.fire({
                icon: "warning",
                title: "Password Too Short",
                text: "Your new password must contain at least 8 characters.",
                confirmButtonText: "Okay",
            });

            return;
        }

        if (newPassword !== confirmPassword) {
            await Swal.fire({
                icon: "warning",
                title: "Passwords Do Not Match",
                text: "The new password and confirmation password must match.",
                confirmButtonText: "Okay",
            });

            return;
        }

        if (currentPassword === newPassword) {
            await Swal.fire({
                icon: "warning",
                title: "Choose a New Password",
                text: "Your new password must be different from your current password.",
                confirmButtonText: "Okay",
            });

            return;
        }

        setSavingPassword(true);

        try {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError) {
                throw userError;
            }

            if (!user?.email) {
                throw new Error("Authenticated user not found.");
            }

            /*
             * First verify the current password by
             * signing in again with the existing credentials.
             */
            const { error: verifyError } =
                await supabase.auth.signInWithPassword({
                    email: user.email,
                    password: currentPassword,
                });

            if (verifyError) {
                await Swal.fire({
                    icon: "error",
                    title: "Incorrect Current Password",
                    text: "The current password you entered is incorrect.",
                    confirmButtonText: "Try Again",
                });

                return;
            }

            /*
             * Current password is correct.
             * Now update the password.
             */
            const { error: updateError } =
                await supabase.auth.updateUser({
                    password: newPassword,
                });

            if (updateError) {
                throw updateError;
            }

            resetPasswordForm();
            setChangingPassword(false);

            await Swal.fire({
                icon: "success",
                title: "Password Changed",
                text: "Your administrator password has been updated successfully.",
                confirmButtonText: "Done",
            });
        } catch (error) {
            console.error(
                "Failed to change password:",
                error
            );

            await Swal.fire({
                icon: "error",
                title: "Password Change Failed",
                text: "We could not change your password. Please try again.",
                confirmButtonText: "Okay",
            });
        } finally {
            setSavingPassword(false);
        }
    };

    if (loading) {
        return (
            <section className={styles.page}>
                <div className={styles.loading}>
                    Loading profile...
                </div>
            </section>
        );
    }

    if (!profile) {
        return (
            <section className={styles.page}>
                <div className={styles.emptyState}>
                    <span className="material-symbols-outlined">
                        account_circle
                    </span>

                    <h2>Profile Not Found</h2>

                    <p>
                        We could not load your administrator profile.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.page}>

            {/* Page Header */}
            <div className={styles.pageHeader}>
                <h1>My Profile</h1>

                <p>
                    Manage your administrator account information
                    and profile settings.
                </p>
            </div>

            <div className={styles.profileGrid}>

                {/* Profile Overview */}
                <div className={styles.overviewColumn}>
                    <div className={styles.overviewCard}>

                        <div className={styles.avatarWrapper}>
                            {profile.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.full_name}
                                    className={styles.avatarImage}
                                />
                            ) : (
                                <div className={styles.avatar}>
                                    {getInitials(
                                        profile.full_name
                                    )}
                                </div>
                            )}

                            <button
                                type="button"
                                className={styles.photoButton}
                                title="Edit Photo"
                            >
                                <span className="material-symbols-outlined">
                                    photo_camera
                                </span>
                            </button>
                        </div>

                        <div className={styles.overviewInfo}>
                            <h2>{profile.full_name}</h2>

                            <p className={styles.jobTitle}>
                                {profile.job_title}
                            </p>

                            <p className={styles.email}>
                                {profile.email}
                            </p>
                        </div>

                        <div className={styles.adminBadge}>
                            <span className="material-symbols-outlined">
                                verified_user
                            </span>

                            <span>Administrator</span>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className={styles.detailsColumn}>

                    {/* Personal Information */}
                    <div className={styles.card}>

                        <div className={styles.cardHeader}>
                            <h2>Personal Information</h2>

                            {!editing && (
                                <button
                                    type="button"
                                    className={styles.editButton}
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                >
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>

                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <div className={styles.form}>

                            <div className={styles.field}>
                                <label htmlFor="fullName">
                                    Full Name
                                </label>

                                <input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(event) =>
                                        setFullName(
                                            event.target.value
                                        )
                                    }
                                    disabled={!editing}
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="jobTitle">
                                    Job Title
                                </label>

                                <input
                                    id="jobTitle"
                                    type="text"
                                    value={jobTitle}
                                    onChange={(event) =>
                                        setJobTitle(
                                            event.target.value
                                        )
                                    }
                                    disabled={!editing}
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <div className={styles.emailInput}>
                                    <span className="material-symbols-outlined">
                                        mail
                                    </span>

                                    <input
                                        id="email"
                                        type="email"
                                        value={profile.email || ""}
                                        disabled
                                    />
                                </div>

                                <p className={styles.fieldHint}>
                                    Contact IT support to change
                                    your institutional email address.
                                </p>
                            </div>

                            {editing && (
                                <div className={styles.formActions}>
                                    <button
                                        type="button"
                                        className={styles.cancelButton}
                                        onClick={
                                            handleCancelEdit
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className={styles.saveButton}
                                        onClick={handleSave}
                                    >
                                        <span className="material-symbols-outlined">
                                            save
                                        </span>

                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Security */}
                    <div className={styles.card}>

                        <div className={styles.cardHeader}>
                            <h2>
                                <span className="material-symbols-outlined">
                                    lock
                                </span>

                                Security
                            </h2>
                        </div>

                        {!changingPassword ? (
                            <div className={styles.securityRow}>
                                <div>
                                    <h3>Account Password</h3>

                                    <p>
                                        Keep your account secure by
                                        using a strong password and
                                        changing it periodically.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={
                                        styles.passwordButton
                                    }
                                    onClick={() =>
                                        setChangingPassword(true)
                                    }
                                >
                                    Change Password
                                </button>
                            </div>
                        ) : (
                            <div className={styles.passwordSection}>

                                <div className={styles.passwordIntro}>
                                    <h3>Change Password</h3>

                                    <p>
                                        Enter your current password
                                        and choose a new password
                                        for your administrator
                                        account.
                                    </p>
                                </div>

                                {/* Current Password */}
                                <div className={styles.field}>
                                    <label htmlFor="currentPassword">
                                        Current Password
                                    </label>

                                    <div
                                        className={
                                            styles.passwordInput
                                        }
                                    >
                                        <input
                                            id="currentPassword"
                                            type={
                                                showCurrentPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                currentPassword
                                            }
                                            onChange={(event) =>
                                                setCurrentPassword(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter your current password"
                                            autoComplete="current-password"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowCurrentPassword(
                                                    (value) =>
                                                        !value
                                                )
                                            }
                                            aria-label={
                                                showCurrentPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            <span className="material-symbols-outlined">
                                                {showCurrentPassword
                                                    ? "visibility_off"
                                                    : "visibility"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className={styles.field}>
                                    <label htmlFor="newPassword">
                                        New Password
                                    </label>

                                    <div
                                        className={
                                            styles.passwordInput
                                        }
                                    >
                                        <input
                                            id="newPassword"
                                            type={
                                                showNewPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={newPassword}
                                            onChange={(event) =>
                                                setNewPassword(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter your new password"
                                            autoComplete="new-password"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    (value) =>
                                                        !value
                                                )
                                            }
                                            aria-label={
                                                showNewPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            <span className="material-symbols-outlined">
                                                {showNewPassword
                                                    ? "visibility_off"
                                                    : "visibility"}
                                            </span>
                                        </button>
                                    </div>

                                    <p className={styles.fieldHint}>
                                        Password must contain at
                                        least 8 characters.
                                    </p>
                                </div>

                                {/* Confirm Password */}
                                <div className={styles.field}>
                                    <label htmlFor="confirmPassword">
                                        Confirm New Password
                                    </label>

                                    <div
                                        className={
                                            styles.passwordInput
                                        }
                                    >
                                        <input
                                            id="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                confirmPassword
                                            }
                                            onChange={(event) =>
                                                setConfirmPassword(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Confirm your new password"
                                            autoComplete="new-password"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    (value) =>
                                                        !value
                                                )
                                            }
                                            aria-label={
                                                showConfirmPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            <span className="material-symbols-outlined">
                                                {showConfirmPassword
                                                    ? "visibility_off"
                                                    : "visibility"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div
                                    className={
                                        styles.passwordActions
                                    }
                                >
                                    <button
                                        type="button"
                                        className={
                                            styles.cancelButton
                                        }
                                        onClick={
                                            handleCancelPassword
                                        }
                                        disabled={
                                            savingPassword
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            styles.saveButton
                                        }
                                        onClick={
                                            handleChangePassword
                                        }
                                        disabled={
                                            savingPassword
                                        }
                                    >
                                        <span className="material-symbols-outlined">
                                            {savingPassword
                                                ? "progress_activity"
                                                : "lock_reset"}
                                        </span>

                                        {savingPassword
                                            ? "Updating..."
                                            : "Update Password"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AdminProfile;