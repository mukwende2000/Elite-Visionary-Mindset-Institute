import styles from "./EmergencyStep.module.css";
import FormField from "../../pages/Apply/component/FormFields";

function EmergencyStep({ register, errors }) {
    return (
        <div className={styles.container}>
            <p className={styles.intro}>
                Please provide the details of someone we can contact in case
                of an emergency.
            </p>

            <div className={styles.grid}>

                <FormField
                    label="First Name"
                    required
                    error={errors.emergencyName?.message}
                    className={styles.fullWidth}
                    formElement="input"
                    type="text"
                    placeholder="Full name"
                    fieldProps={register("emergencyName", {
                        required: "First name is required",
                        minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters",
                        },
                        maxLength: {
                            value: 50,
                            message: "First name cannot exceed 50 characters",
                        },
                        pattern: {
                            value: /^[A-Za-z\s'-]+$/,
                            message:
                                "First name can only contain letters, spaces, hyphens or apostrophes",
                        },
                    })}
                />

                <FormField
                    label="Last Name"
                    required
                    error={errors.emergencySurname?.message}
                    className={styles.fullWidth}
                    formElement="input"
                    type="text"
                    placeholder="Full legal name"
                    fieldProps={register("emergencySurname", {
                        required: "Last name is required",
                        minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters",
                        },
                        maxLength: {
                            value: 50,
                            message: "Last name cannot exceed 50 characters",
                        },
                        pattern: {
                            value: /^[A-Za-z\s'-]+$/,
                            message:
                                "Last name can only contain letters, spaces, hyphens or apostrophes",
                        },
                    })}
                />

                <FormField
                    label="Relationship"
                    required
                    error={errors.relationship?.message}
                    formElement="select"
                    fieldProps={register("relationship", {
                        required: "Please select a relationship",
                    })}
                >
                    <option value="">Select Relationship</option>
                    <option value="parent">Parent</option>
                    <option value="guardian">Guardian</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="relative">Other Relative</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                </FormField>

                <FormField
                    label="Phone Number"
                    required
                    error={errors.emergencyPhone?.message}
                    formElement="input"
                    type="tel"
                    placeholder="+260 97 000 0000"
                    fieldProps={register("emergencyPhone", {
                        required: "Emergency phone number is required",
                        pattern: {
                            value: /^\+?[0-9\s()-]{7,20}$/,
                            message: "Please enter a valid phone number",
                        },
                    })}
                />

                <FormField
                    label="Email Address"
                    error={errors.emergencyEmail?.message}
                    formElement="input"
                    type="email"
                    placeholder="contact@email.com"
                    fieldProps={register("emergencyEmail", {
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        },
                    })}
                />

                <FormField
                    label="Occupation"
                    error={errors.emergencyOccupation?.message}
                    formElement="input"
                    type="text"
                    placeholder="Occupation / Profession"
                    fieldProps={register("emergencyOccupation", {
                        maxLength: {
                            value: 100,
                            message: "Occupation cannot exceed 100 characters",
                        },
                    })}
                />

                <FormField
                    label="Residential Address"
                    required
                    error={errors.emergencyAddress?.message}
                    className={styles.fullWidth}
                    formElement="textarea"
                    placeholder="Street Address, City, Province, Country"
                    fieldProps={register("emergencyAddress", {
                        required: "Residential address is required",
                        minLength: {
                            value: 5,
                            message: "Please enter a complete address",
                        },
                        maxLength: {
                            value: 250,
                            message: "Address cannot exceed 250 characters",
                        },
                    })}
                />

                <FormField
                    label="Additional Emergency Information"
                    error={errors.additionalContact?.message}
                    className={styles.fullWidth}
                    formElement="textarea"
                    placeholder="Any additional information we should know..."
                    fieldProps={register("additionalContact", {
                        maxLength: {
                            value: 500,
                            message:
                                "Additional information cannot exceed 500 characters",
                        },
                    })}
                />

            </div>
        </div>
    );
}

export default EmergencyStep;
