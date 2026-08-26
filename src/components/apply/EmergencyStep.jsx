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
                            {...register("emergencyName", { required: "This field is required" })}
                        />
                        {errors.emergencyName && (
                            <p className={styles.error}>
                                {errors.emergencyName.message}
                            </p>
                        )}
                    </div>
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
                            {...register("emergencySurname", { required: "This field is required" })}
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
                            {...register("relationship", { required: "This field is required" })}
                        >
                            <option value="">
                                Select Relationship
                            </option>
                            <option value="parent">Parent</option>
                            <option value="guardian">Guardian</option>
                            <option value="spouse">Spouse</option>
                            <option value="sibling">Sibling</option>
                            <option value="relative">Other Relative</option>
                            <option value="friend">Friend</option>
                            <option value="other">Other</option>
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
                            {...register("emergencyPhone", { required: "This field is required" })}
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
                            {...register("emergencyEmail")}
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
                            {...register("emergencyOccupation")}
                        />
                        {errors.emergencyOccupation && (
                            <p className={styles.errors}>
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
                            {...register("emergencyAddress", { required: "This field is required" })}
                        />
                        {errors.emergencyAddress && (
                            <p className={styles.errors}>
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
                            {...register("additionalContact")}
                        />
                        {errors.additionalContact && (
                            <p className={styles.errors}>
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
