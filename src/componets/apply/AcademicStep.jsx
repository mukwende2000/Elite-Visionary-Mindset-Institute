import courses from "../../data/courses";
import styles from "./AcademicStep.module.css";

function AcademicStep({ register, errors }) {
    return (
        <div className={styles.container}>

            <div className={styles.form}>
                <div className={styles.grid}>

                    {/* Highest Level of Education */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="highestQualification">
                            Highest Level of Education
                            <span className={styles.required}>*</span>
                        </label>

                        <select
                            id="highestQualification"
                            {...register("highestQualification", {
                                required: "This field is required",
                            })}
                        >
                            <option value="">Select Education Level</option>
                            <option value="secondary">
                                Secondary School
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
                            <option value="other">
                                Other
                            </option>
                        </select>

                        {errors.highestQualification && (
                            <p className={styles.errors}>
                                {errors.highestQualification.message}
                            </p>
                        )}
                    </div>

                    {/* Current Occupation */}
                    <div className={styles.field}>
                        <label htmlFor="currentOccupation">
                            Current Occupation
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            id="currentOccupation"
                            type="text"
                            placeholder="e.g. Software Developer"
                            {...register("currentOccupation", {
                                required: "This field is required",
                            })}
                        />

                        {errors.currentOccupation && (
                            <p className={styles.errors}>
                                {errors.currentOccupation.message}
                            </p>
                        )}
                    </div>

                    {/* Institution */}
                    <div className={styles.field}>
                        <label htmlFor="institution">
                            Name of School/College/University
                            <span>(if applicable)</span>
                        </label>

                        <input
                            id="institution"
                            type="text"
                            placeholder="Name of institution"
                            {...register("institution")}
                        />
                    </div>

                    {/* Programme */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label htmlFor="programme">
                            Choose a Programme
                            <span className={styles.required}>*</span>
                        </label>

                        <select
                            id="programme"
                            {...register("programme", {
                                required: "This field is required",
                            })}
                        >
                            <option value="">Select Programme</option>
                            {courses.map((course) => {
                                return <option value={course.id}>{course.title}</option>
                            })}
                        </select>

                        {errors.programme && (
                            <p className={styles.errors}>
                                {errors.programme.message}
                            </p>
                        )}
                    </div>

                    {/* Preferred Study Mode */}
                    <div className={styles.field}>
                        <label htmlFor="studyMode">
                            Preferred Study Mode
                            <span className={styles.required}>*</span>
                        </label>

                        <select
                            id="studyMode"
                            {...register("studyMode", {
                                required: "This field is required",
                            })}
                        >
                            <option value="">Select Study Mode</option>
                            <option value="online">Online</option>
                            <option value="physical">Physical</option>
                            <option value="hybrid">Hybrid</option>
                        </select>

                        {errors.studyMode && (
                            <p className={styles.errors}>
                                {errors.studyMode.message}
                            </p>
                        )}
                    </div>

                    {/* Preferred Intake */}
                    <div className={styles.field}>
                        <label htmlFor="intake">
                            Preferred Intake
                            <span className={styles.required}>*</span>
                        </label>

                        <input
                            id="intake"
                            type="text"
                            placeholder="e.g. September 2026"
                            {...register("intake", {
                                required: "This field is required",
                            })}
                        />

                        {errors.intake && (
                            <p className={styles.errors}>
                                {errors.intake.message}
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AcademicStep;