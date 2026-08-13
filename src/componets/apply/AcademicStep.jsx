import styles from "./AcademicStep.module.css";

function AcademicStep({ onNext, onBack }) {

    return (
        <div className={styles.container}>

            <form className={styles.form}>
                <div className={styles.grid}>

                    {/* Highest Qualification */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="highestQualification">
                            Highest Academic Qualification
                            <span className={styles.required}>*</span>
                        </label>

                        <select
                            id="highestQualification"
                            name="highestQualification"
                        // onChange={handleChange}
                        >
                            <option value="">Select Qualification</option>
                            <option value="secondary">
                                Secondary School Certificate
                            </option>
                            <option value="certificate">
                                Certificate
                            </option>
                            <option value="diploma">
                                Diploma
                            </option>
                            <option value="degree">
                                Bachelor's Degree
                            </option>
                            <option value="masters">
                                Master's Degree
                            </option>
                            <option value="doctorate">
                                Doctorate
                            </option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Institution */}
                    <div className={styles.field}>
                        <label htmlFor="institution">
                            Institution Attended
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            id="institution"
                            name="institution"
                            type="text"
                            placeholder="Name of institution"
                        // onChange={handleChange}
                        />
                    </div>

                    {/* Field of Study */}
                    <div className={styles.field}>
                        <label htmlFor="fieldOfStudy">
                            Field of Study
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            id="fieldOfStudy"
                            name="fieldOfStudy"
                            type="text"
                            placeholder="e.g. Business Administration"
                        // onChange={handleChange}
                        />
                    </div>

                    {/* Graduation Year */}
                    <div className={styles.field}>
                        <label htmlFor="graduationYear">
                            Year Completed
                            <span className={styles.required}>*</span>
                        </label>

                        <select
                            id="graduationYear"
                            name="graduationYear"
                        // onChange={handleChange}
                        >
                            <option value="">Select Year</option>

                            {Array.from(
                                { length: 50 },
                                (_, index) => {
                                    const year =
                                        new Date().getFullYear() - index;

                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                }
                            )}
                        </select>
                    </div>

                    {/* Student / Professional Status */}
                    <div className={styles.field}>
                        <label htmlFor="currentStatus">
                            Current Status
                            <span className={styles.required}>*</span>
                        </label>

                        <select
                            id="currentStatus"
                            name="currentStatus"
                        // onChange={handleChange}
                        >
                            <option value="">Select Status</option>
                            <option value="student">Student</option>
                            <option value="employed">Employed</option>
                            <option value="self-employed">
                                Self-employed
                            </option>
                            <option value="job-seeking">
                                Currently seeking employment
                            </option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Employer */}
                    <div className={styles.field}>
                        <label htmlFor="employer">
                            Current Employer
                        </label>

                        <input
                            id="employer"
                            name="employer"
                            type="text"
                            placeholder="Company / Organisation"
                        // onChange={handleChange}  
                        />
                    </div>

                    {/* Job Title */}
                    <div className={styles.field}>
                        <label htmlFor="jobTitle">
                            Current Job Title
                        </label>

                        <input
                            id="jobTitle"
                            name="jobTitle"
                            type="text"
                            placeholder="Your current position"
                        // onChange={handleChange}
                        />
                    </div>

                    {/* Work Experience */}
                    <div className={styles.field}>
                        <label htmlFor="workExperience">
                            Years of Work Experience
                        </label>

                        <select
                            id="workExperience"
                            name="workExperience"
                        // onChange={handleChange}
                        >
                            <option value="">Select Experience</option>
                            <option value="none">No experience</option>
                            <option value="less-than-1">
                                Less than 1 year
                            </option>
                            <option value="1-3">1–3 years</option>
                            <option value="4-6">4–6 years</option>
                            <option value="7-10">7–10 years</option>
                            <option value="10-plus">
                                More than 10 years
                            </option>
                        </select>
                    </div>

                    {/* Academic Background */}
                    <div
                        className={`${styles.field} ${styles.fullWidth}`}
                    >
                        <label htmlFor="academicBackground">
                            Academic Background
                        </label>

                        <textarea
                            id="academicBackground"
                            name="academicBackground"
                            rows="4"
                            placeholder="Briefly describe your academic background, qualifications, or relevant training."
                        // onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AcademicStep;