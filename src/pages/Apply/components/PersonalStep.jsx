import styles from "./PersonalStep.module.css";
import countries from "../../../data/countries"
import FormField from "./FormField";

function PersonalStep({ register, errors }) {
    return (
        <section className={styles.step}>
            <div className={styles.formGrid}>

                <FormField
                    label="First Name"
                    required
                    error={errors.firstName?.message}
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    fieldProps={register("firstName", {
                        required: "First name is required",
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "First name can only contain letters",
                        },
                    })}
                />

                <FormField
                    label="Surname"
                    required
                    error={errors.surname?.message}
                    name="surname"
                    type="text"
                    placeholder="Surname"
                    fieldProps={register("surname", {
                        required: "Surname is required",
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Surname can only contain letters",
                        },
                    })}
                />

                <FormField
                    label="Other Name(s)"
                    className={styles.fullWidth}
                    error={errors.otherNames?.message}
                    name="otherNames"
                    type="text"
                    placeholder="Other name(s)"
                    fieldProps={register("otherNames", {
                        minLength: {
                            value: 2,
                            message: "Other names cannot be less than 3 characters",
                        },
                        pattern: {
                            value: /^[A-Za-z\s'-]+$/,
                            message:
                                "Other names can only contain letters, spaces, hyphens or apostrophes",
                        },
                    })}
                />

                <FormField
                    label="Date of Birth"
                    required
                    error={errors.dateOfBirth?.message}
                    name="dateOfBirth"
                    type="date"
                    fieldProps={register("dateOfBirth", {
                        required: "Date of birth is required",
                        validate: (value) => {
                            const today = new Date();
                            const birthDate = new Date(value);

                            let age =
                                today.getFullYear() -
                                birthDate.getFullYear();

                            const birthdayHasNotPassed =
                                today.getMonth() < birthDate.getMonth() ||
                                (today.getMonth() === birthDate.getMonth() &&
                                    today.getDate() < birthDate.getDate());

                            if (birthdayHasNotPassed) {
                                age--;
                            }

                            return (
                                age >= 15 ||
                                "Applicant must be at least 15 years old"
                            );
                        },
                    })}
                />

                <FormField
                    label="Gender"
                    name="gender"
                    formElement="select"
                    fieldProps={register("gender")}
                >
                    <option value="" disabled>
                        Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not">Prefer not to say</option>
                </FormField>

                <FormField
                    label="Nationality"
                    required
                    error={errors.nationality?.message}
                    name="nationality"
                    formElement="select"
                    fieldProps={register("nationality", {
                        required: "Nationality is required",
                        pattern: {
                            value: /^[A-Za-z\s'-]+$/,
                            message:
                                "Nationality can only contain letters, spaces, hyphens or apostrophes",
                        },
                    })}
                >
                    <option value="">
                        Select Country
                    </option>

                    {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                            {country.label}
                        </option>
                    ))}
                </FormField>

                <FormField
                    label="National ID / Passport Number"
                    name="idNumber"
                    type="text"
                    placeholder="ID or passport number"
                    fieldProps={register("idNumber")}
                />

                <FormField
                    label="Residential Address"
                    required
                    error={errors.address?.message}
                    name="address"
                    className={styles.fullWidth}
                    formElement="textarea"
                    placeholder="Street address"
                    fieldProps={register("address", {
                        required: "Residential address is required",
                    })}
                />

                <FormField
                    label="Town / City"
                    required
                    error={errors.townCity?.message}
                    name="townCity"
                    type="text"
                    placeholder="Town or city"
                    fieldProps={register("townCity", {
                        required: "Town / City is required",
                    })}
                />

                <FormField
                    label="Province"
                    required
                    error={errors.province?.message}
                    name="province"
                    type="text"
                    placeholder="Province"
                    fieldProps={register("province", {
                        required: "Province is required",
                    })}
                />

                <FormField
                    label="Email Address"
                    required
                    error={errors.email?.message}
                    name="email"
                    type="email"
                    placeholder="primary@email.com"
                    fieldProps={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        },
                    })}
                />

                <FormField
                    label="Phone Number"
                    required
                    error={errors.phone?.message}
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    fieldProps={register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^\+?[0-9\s()-]{7,20}$/,
                            message: "Please enter a valid phone number",
                        },
                    })}
                />

                <FormField
                    label="Alternative Phone Number"
                    name="alternativePhone"
                    className={styles.fullWidth}
                    error={errors.alternativePhone?.message}
                    type="tel"
                    placeholder="Alternative phone number"
                    fieldProps={register("alternativePhone")}
                />

            </div>
        </section>
    );
}

export default PersonalStep;
