import styles from "./EmergencyStep.module.css";

function EmergencyStep({ register, errors }) {
    return (
        <div className={styles.container}>
            <p className={styles.intro}>
                Please provide the details of someone we can contact in case
                of an emergency.
            </p>

            <div className={styles.form}>
                <div className={styles.grid}>

                    {/* First Name */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="emergencyName">
                            First Name
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            defaultValue={"Charles"}
                            id="emergencyName"
                            type="text"
                            placeholder="Full name"
                            {...register("emergencyName", {
                                required: "First name is required",
                                minLength: {
                                    value: 2,
                                    message:
                                        "First name must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "First name cannot exceed 50 characters",
                                },
                                pattern: {
                                    value: /^[A-Za-z\s'-]+$/,
                                    message:
                                        "First name can only contain letters, spaces, hyphens or apostrophes",
                                },
                            })}
                        />

                        {errors.emergencyName && (
                            <p className={styles.error}>
                                {errors.emergencyName.message}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="emergencySurname">
                            Last Name
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            defaultValue={"Libimba"}
                            id="emergencySurname"
                            type="text"
                            placeholder="Full legal name"
                            {...register("emergencySurname", {
                                required: "Last name is required",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Last name must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        "Last name cannot exceed 50 characters",
                                },
                                pattern: {
                                    value: /^[A-Za-z\s'-]+$/,
                                    message:
                                        "Last name can only contain letters, spaces, hyphens or apostrophes",
                                },
                            })}
                        />

                        {errors.emergencySurname && (
                            <p className={styles.error}>
                                {errors.emergencySurname.message}
                            </p>
                        )}
                    </div>

                    {/* Relationship */}
                    <div className={styles.field}>
                        <label htmlFor="relationship">
                            Relationship
                            <span className={styles.required}>*</span>
                        </label>

                        <select
                            defaultValue={"parent"}
                            id="relationship"
                            {...register("relationship", {
                                required: "Please select a relationship",
                            })}
                        >
                            <option value="">
                                Select Relationship
                            </option>

                            <option value="parent">
                                Parent
                            </option>

                            <option value="guardian">
                                Guardian
                            </option>

                            <option value="spouse">
                                Spouse
                            </option>

                            <option value="sibling">
                                Sibling
                            </option>

                            <option value="relative">
                                Other Relative
                            </option>

                            <option value="friend">
                                Friend
                            </option>

                            <option value="other">
                                Other
                            </option>
                        </select>

                        {errors.relationship && (
                            <p className={styles.error}>
                                {errors.relationship.message}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className={styles.field}>
                        <label htmlFor="emergencyPhone">
                            Phone Number
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            defaultValue={"0976123212"}
                            id="emergencyPhone"
                            type="tel"
                            placeholder="+260 97 000 0000"
                            {...register("emergencyPhone", {
                                required:
                                    "Emergency phone number is required",
                                pattern: {
                                    value: /^\+?[0-9\s()-]{7,20}$/,
                                    message:
                                        "Please enter a valid phone number",
                                },
                            })}
                        />

                        {errors.emergencyPhone && (
                            <p className={styles.error}>
                                {errors.emergencyPhone.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className={styles.field}>
                        <label htmlFor="emergencyEmail">
                            Email Address
                        </label>

                        <input
                            id="emergencyEmail"
                            type="email"
                            placeholder="contact@email.com"
                            {...register("emergencyEmail", {
                                pattern: {
                                    value:
                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                        "Please enter a valid email address",
                                },
                            })}
                        />

                        {errors.emergencyEmail && (
                            <p className={styles.error}>
                                {errors.emergencyEmail.message}
                            </p>
                        )}
                    </div>

                    {/* Occupation */}
                    <div className={styles.field}>
                        <label htmlFor="emergencyOccupation">
                            Occupation
                        </label>

                        <input
                            id="emergencyOccupation"
                            type="text"
                            placeholder="Occupation / Profession"
                            {...register("emergencyOccupation", {
                                maxLength: {
                                    value: 100,
                                    message:
                                        "Occupation cannot exceed 100 characters",
                                },
                            })}
                        />

                        {errors.emergencyOccupation && (
                            <p className={styles.error}>
                                {errors.emergencyOccupation.message}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="emergencyAddress">
                            Residential Address
                            <span className={styles.required}>*</span>
                        </label>

                        <textarea
                            id="emergencyAddress"
                            rows="3"
                            placeholder="Street Address, City, Province, Country"
                            {...register("emergencyAddress", {
                                required:
                                    "Residential address is required",
                                minLength: {
                                    value: 5,
                                    message:
                                        "Please enter a complete address",
                                },
                                maxLength: {
                                    value: 250,
                                    message:
                                        "Address cannot exceed 250 characters",
                                },
                            })}
                        />

                        {errors.emergencyAddress && (
                            <p className={styles.error}>
                                {errors.emergencyAddress.message}
                            </p>
                        )}
                    </div>

                    {/* Additional Contact */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="additionalContact">
                            Additional Emergency Information
                        </label>

                        <textarea
                            id="additionalContact"
                            rows="3"
                            placeholder="Any additional information we should know..."
                            {...register("additionalContact", {
                                maxLength: {
                                    value: 500,
                                    message:
                                        "Additional information cannot exceed 500 characters",
                                },
                            })}
                        />

                        {errors.additionalContact && (
                            <p className={styles.error}>
                                {errors.additionalContact.message}
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EmergencyStep;
