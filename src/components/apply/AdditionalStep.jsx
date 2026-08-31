import styles from "./AdditionalStep.module.css";
import FormField from "../../pages/Apply/component/FormFields";

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

                <FormField
                    label="Employment Status"
                    required
                    error={errors.employmentStatus?.message}
                    formElement="select"
                    fieldProps={register("employmentStatus", {
                        required: "Please select your employment status",
                    })}
                >
                    <option value="">Select employment status</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="student">Student</option>
                    <option value="unemployed">Not currently employed</option>
                </FormField>

                <FormField
                    label="Organisation / Company"
                    error={errors.organisation?.message}
                    formElement="input"
                    type="text"
                    placeholder="Enter organisation name"
                    fieldProps={register("organisation", {
                        maxLength: {
                            value: 100,
                            message:
                                "Organisation name cannot exceed 100 characters",
                        },
                    })}
                />

                <FormField
                    label="Current Job Title"
                    error={errors.jobTitle?.message}
                    formElement="input"
                    type="text"
                    placeholder="e.g. Marketing Manager"
                    fieldProps={register("jobTitle", {
                        maxLength: {
                            value: 100,
                            message:
                                "Job title cannot exceed 100 characters",
                        },
                    })}
                />

                <FormField
                    label="Years of Professional Experience"
                    error={errors.experience?.message}
                    formElement="select"
                    fieldProps={register("experience")}
                >
                    <option value="">Select experience</option>
                    <option value="none">No experience</option>
                    <option value="1-2">1–2 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="6-10">6–10 years</option>
                    <option value="10+">More than 10 years</option>
                </FormField>

                <FormField
                    label="Why are you interested in this programme?"
                    error={errors.motivation?.message}
                    className={styles.fullWidth}
                    formElement="textarea"
                    placeholder="Briefly describe your goals and what you hope to gain from the programme."
                    fieldProps={register("motivation", {
                        maxLength: {
                            value: 1000,
                            message:
                                "Motivation cannot exceed 1000 characters",
                        },
                    })}
                />

                <FormField
                    label="How did you hear about EVMI?"
                    required
                    error={errors.referral?.message}
                    formElement="select"
                    fieldProps={register("referral", {
                        required:
                            "Please select how you heard about EVMI",
                    })}
                >
                    <option value="">Select an option</option>
                    <option value="social-media">Social Media</option>
                    <option value="website">EVMI Website</option>
                    <option value="friend">Friend / Colleague</option>
                    <option value="event">Event / Workshop</option>
                    <option value="search">Search Engine</option>
                    <option value="other">Other</option>
                </FormField>

                <FormField
                    label="Additional Information"
                    error={errors.additionalInfo?.message}
                    formElement="input"
                    type="text"
                    placeholder="Anything else you would like us to know?"
                    fieldProps={register("additionalInfo", {
                        maxLength: {
                            value: 500,
                            message:
                                "Additional information cannot exceed 500 characters",
                        },
                    })}
                />

            </div>
        </section>
    );
}

export default AdditionalStep;

