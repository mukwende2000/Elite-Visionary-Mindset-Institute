import styles from "./AdditionalStep.module.css";

function AdditionalStep({ onNext, onBack }) {
    return (
        <section className={styles.step}>
            <div className={styles.header}>
                <p>
                    Tell us a little more about your professional background and
                    programme interests.
                </p>
            </div>

            <div className={styles.formGrid}>
                {/* Current Employment */}
                <div className={styles.field}>
                    <label htmlFor="employmentStatus">Employment Status</label>

                    <select id="employmentStatus">
                        <option value="">Select employment status</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-employed</option>
                        <option value="student">Student</option>
                        <option value="unemployed">Not currently employed</option>
                    </select>
                </div>

                {/* Organisation */}
                <div className={styles.field}>
                    <label htmlFor="organisation">Organisation / Company</label>

                    <input
                        id="organisation"
                        type="text"
                        placeholder="Enter organisation name"
                    />
                </div>

                {/* Job Title */}
                <div className={styles.field}>
                    <label htmlFor="jobTitle">Current Job Title</label>

                    <input
                        id="jobTitle"
                        type="text"
                        placeholder="e.g. Marketing Manager"
                    />
                </div>

                {/* Years of Experience */}
                <div className={styles.field}>
                    <label htmlFor="experience">Years of Professional Experience</label>

                    <select id="experience">
                        <option value="">Select experience</option>
                        <option value="none">No experience</option>
                        <option value="1-2">1–2 years</option>
                        <option value="3-5">3–5 years</option>
                        <option value="6-10">6–10 years</option>
                        <option value="10+">More than 10 years</option>
                    </select>
                </div>

                {/* Programme Interest */}
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label htmlFor="programme">
                        Programme You Are Interested In
                    </label>

                    <select id="programme">
                        <option value="">Select a programme</option>
                        <option value="business-management">
                            Certificate in Business Management (CBM)
                        </option>
                        <option value="tourism-hospitality">
                            Certificate in Tourism & Hospitality Management
                        </option>
                        <option value="early-childhood">
                            Certificate in Early Childhood Care & Education
                        </option>
                        <option value="ai-prompt-engineering">
                            Certificate in Artificial Intelligence (AI) & Prompt Engineering
                        </option>
                        <option value="digital-marketing">
                            Certificate in Digital Marketing & Social Media Management
                        </option>
                        <option value="leadership-management">
                            Certificate in Leadership and Management
                        </option>
                        <option value="public-speaking">
                            Certificate in Public Speaking and Communication
                        </option>
                        <option value="personal-branding">
                            Certificate in Personal Branding and Image Management
                        </option>
                        <option value="sales-marketing">
                            Certificate in Sales and Marketing
                        </option>
                        <option value="entrepreneurship">
                            Certificate in Entrepreneurship and Business Development
                        </option>
                    </select>
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
                    />
                </div>

                {/* How did you hear about us */}
                <div className={styles.field}>
                    <label htmlFor="referral">How did you hear about EVMI?</label>

                    <select id="referral">
                        <option value="">Select an option</option>
                        <option value="social-media">Social Media</option>
                        <option value="website">EVMI Website</option>
                        <option value="friend">Friend / Colleague</option>
                        <option value="event">Event / Workshop</option>
                        <option value="search">Search Engine</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Other */}
                <div className={styles.field}>
                    <label htmlFor="additionalInfo">Additional Information</label>

                    <input
                        id="additionalInfo"
                        type="text"
                        placeholder="Anything else you would like us to know?"
                    />
                </div>
            </div>
        </section>
    );
}

export default AdditionalStep;