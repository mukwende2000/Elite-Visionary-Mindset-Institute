import styles from "./PersonalStep.module.css";

function PersonalStep({ onNext }) {
    return (
        <section className={styles.step}>
            <div className={styles.formGrid}>
                <div className={styles.fullWidth}>
                    <label htmlFor="fullName">Full Legal Name *</label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="As it appears on your passport/ID"
                    />
                </div>

                <div>
                    <label htmlFor="dob">Date of Birth *</label>
                    <input id="dob" type="date" />
                </div>

                <div>
                    <label htmlFor="gender">Gender *</label>
                    <select id="gender" defaultValue="">
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not">Prefer not to say</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="nationality">Nationality *</label>
                    <input
                        id="nationality"
                        type="text"
                        placeholder="Nationality"
                    />
                </div>

                <div>
                    <label htmlFor="email">Email Address *</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="primary@email.com"
                    />
                </div>

                <div className={styles.fullWidth}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Phone number"
                    />
                </div>

                <div className={styles.fullWidth}>
                    <label htmlFor="address">Residential Address *</label>
                    <textarea
                        id="address"
                        rows="3"
                        placeholder="Street Address, City, Province, Postal Code"
                    />
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.nextButton}
                    onClick={onNext}
                >
                    Next Step
                </button>
            </div>
        </section>
    );
}

export default PersonalStep;