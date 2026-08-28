import styles from "./AdditionalStep.module.css";

function AdditionalStep({ register, errors }) {
    return (
        <section className={styles.step}>
            <div className={styles.header}>
                <p>
                    Tell us a little more about your professional background and
                    programme interests.
                </p>
            </div>

            <div className={styles.formGrid}>

                {/* Employment Status */}
                <div className={styles.field}>
                    <label htmlFor="employmentStatus">
                        Employment Status
                        <span className={styles.required}>*</span>
                    </label>

                    <select
                        defaultValue={"student"}
                        id="employmentStatus"
                        {...register("employmentStatus", {
                            required: "Please select your employment status",
                        })}
                    >
                        <option value="">Select employment status</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-employed</option>
                        <option value="student">Student</option>
                        <option value="unemployed">
                            Not currently employed
                        </option>
                    </select>

                    {errors.employmentStatus && (
                        <p className={styles.error}>
                            {errors.employmentStatus.message}
                        </p>
                    )}
                </div>

                {/* Organisation */}
                <div className={styles.field}>
                    <label htmlFor="organisation">
                        Organisation / Company
                    </label>

                    <input
                        id="organisation"
                        type="text"
                        placeholder="Enter organisation name"
                        {...register("organisation", {
                            maxLength: {
                                value: 100,
                                message:
                                    "Organisation name cannot exceed 100 characters",
                            },
                        })}
                    />

                    {errors.organisation && (
                        <p className={styles.error}>
                            {errors.organisation.message}
                        </p>
                    )}
                </div>

                {/* Job Title */}
                <div className={styles.field}>
                    <label htmlFor="jobTitle">
                        Current Job Title
                    </label>

                    <input
                        id="jobTitle"
                        type="text"
                        placeholder="e.g. Marketing Manager"
                        {...register("jobTitle", {
                            maxLength: {
                                value: 100,
                                message:
                                    "Job title cannot exceed 100 characters",
                            },
                        })}
                    />

                    {errors.jobTitle && (
                        <p className={styles.error}>
                            {errors.jobTitle.message}
                        </p>
                    )}
                </div>

                {/* Years of Experience */}
                <div className={styles.field}>
                    <label htmlFor="experience">
                        Years of Professional Experience
                    </label>

                    <select
                        id="experience"
                        {...register("experience")}
                    >
                        <option value="">Select experience</option>
                        <option value="none">No experience</option>
                        <option value="1-2">1–2 years</option>
                        <option value="3-5">3–5 years</option>
                        <option value="6-10">6–10 years</option>
                        <option value="10+">
                            More than 10 years
                        </option>
                    </select>

                    {errors.experience && (
                        <p className={styles.error}>
                            {errors.experience.message}
                        </p>
                    )}
                </div>

                {/* Motivation */}
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label htmlFor="motivation">
                        Why are you interested in this programme?
                    </label>

                    <textarea
                        id="motivation"
                        rows="5"
                        placeholder="Briefly describe your goals and what you hope to gain from the programme."
                        {...register("motivation", {
                            maxLength: {
                                value: 1000,
                                message:
                                    "Motivation cannot exceed 1000 characters",
                            },
                        })}
                    />

                    {errors.motivation && (
                        <p className={styles.error}>
                            {errors.motivation.message}
                        </p>
                    )}
                </div>

                {/* Referral */}
                <div className={styles.field}>
                    <label htmlFor="referral">
                        How did you hear about EVMI?
                        <span className={styles.required}>*</span>
                    </label>

                    <select
                        id="referral"
                        {...register("referral", {
                            required:
                                "Please select how you heard about EVMI",
                        })}
                    >
                        <option value="">Select an option</option>
                        <option value="social-media">
                            Social Media
                        </option>
                        <option value="website">
                            EVMI Website
                        </option>
                        <option value="friend">
                            Friend / Colleague
                        </option>
                        <option value="event">
                            Event / Workshop
                        </option>
                        <option value="search">
                            Search Engine
                        </option>
                        <option value="other">
                            Other
                        </option>
                    </select>

                    {errors.referral && (
                        <p className={styles.error}>
                            {errors.referral.message}
                        </p>
                    )}
                </div>

                {/* Additional Information */}
                <div className={styles.field}>
                    <label htmlFor="additionalInfo">
                        Additional Information
                    </label>

                    <input
                        id="additionalInfo"
                        type="text"
                        placeholder="Anything else you would like us to know?"
                        {...register("additionalInfo", {
                            maxLength: {
                                value: 500,
                                message:
                                    "Additional information cannot exceed 500 characters",
                            },
                        })}
                    />

                    {errors.additionalInfo && (
                        <p className={styles.error}>
                            {errors.additionalInfo.message}
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}

export default AdditionalStep;

