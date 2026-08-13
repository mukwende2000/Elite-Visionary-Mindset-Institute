import styles from "./EmergencyStep.module.css";

function EmergencyStep({ onNext, onBack }) {
    return (
        <div className={styles.container}>
            <p className={styles.intro}>
                Please provide the details of someone we can contact in case
                of an emergency.
            </p>

            <form className={styles.form}>
                <div className={styles.grid}>

                    {/* Full Name */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="emergencyName">
                            Full Name
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            id="emergencyName"
                            name="emergencyName"
                            type="text"
                            placeholder="Full legal name"
                        />
                    </div>

                    {/* Relationship */}
                    <div className={styles.field}>
                        <label htmlFor="relationship">
                            Relationship
                            <span className={styles.required}>*</span>
                        </label>

                        <select id="relationship" name="relationship">
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
                    </div>

                    {/* Phone */}
                    <div className={styles.field}>
                        <label htmlFor="emergencyPhone">
                            Phone Number
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            id="emergencyPhone"
                            name="emergencyPhone"
                            type="tel"
                            placeholder="+260 97 000 0000"
                        />
                    </div>

                    {/* Email */}
                    <div className={styles.field}>
                        <label htmlFor="emergencyEmail">
                            Email Address
                        </label>

                        <input
                            id="emergencyEmail"
                            name="emergencyEmail"
                            type="email"
                            placeholder="contact@email.com"
                        />
                    </div>

                    {/* Occupation */}
                    <div className={styles.field}>
                        <label htmlFor="emergencyOccupation">
                            Occupation
                        </label>

                        <input
                            id="emergencyOccupation"
                            name="emergencyOccupation"
                            type="text"
                            placeholder="Occupation / Profession"
                        />
                    </div>

                    {/* Address */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="emergencyAddress">
                            Residential Address
                            <span className={styles.required}>*</span>
                        </label>

                        <textarea
                            id="emergencyAddress"
                            name="emergencyAddress"
                            rows="3"
                            placeholder="Street Address, City, Province, Country"
                        />
                    </div>

                    {/* Additional Contact */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="additionalContact">
                            Additional Emergency Information
                        </label>

                        <textarea
                            id="additionalContact"
                            name="additionalContact"
                            rows="3"
                            placeholder="Any additional information we should know..."
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EmergencyStep;