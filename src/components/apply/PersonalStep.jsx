import styles from "./PersonalStep.module.css";
import countries from "../../data/countries";

function PersonalStep({ register, errors }) {
    return (
        <section className={styles.step}>
            <div className={styles.formGrid}>

                {/* First Name */}
                <div>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                        id="firstName"
                        type="text"
                        defaultValue={"John"}
                        placeholder="First name"
                        {...register("firstName", {
                            required: "First name is required",
                            pattern: {
                                value: /^[A-Za-z]+$/,
                                message: "First name can only contain letters",
                            },
                        })}
                    />
                    {errors.firstName && (
                        <p className={styles.errors}>
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                {/* Surname */}
                <div>
                    <label htmlFor="surname">Surname *</label>
                    <input
                        defaultValue={"Lufeya"}
                        id="surname"
                        type="text"
                        placeholder="Surname"
                        {...register("surname", {
                            required: "Surname is required",
                            pattern: {
                                value: /^[A-Za-z]+$/,
                                message: "Surname can only contain letters",
                            },
                        })}
                    />
                    {errors.surname && (
                        <p className={styles.errors}>
                            {errors.surname.message}
                        </p>
                    )}
                </div>

                {/* Other Names */}
                <div className={styles.fullWidth}>
                    <label htmlFor="otherNames">
                        Other Name(s) <span>(optional)</span>
                    </label>
                    <input
                        id="otherNames"
                        type="text"
                        placeholder="Other name(s)"
                        {...register("otherNames", {
                            minLength: {
                                value: 2,
                                message: "Other names cannot be less than 3 characters",
                            },
                            pattern: {
                                value: /^[A-Za-z\s'-]+$/,
                                message: "Other names can only contain letters, spaces, hyphens or apostrophes",
                            },
                        })}
                    />
                    {errors.otherNames && (
                        <p className={styles.errors}>
                            {errors.otherNames.message}
                        </p>
                    )}
                </div>

                {/* Date of Birth */}
                <div>
                    <label htmlFor="dateOfBirth">Date of Birth *</label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        max={new Date(
                            new Date().setFullYear(new Date().getFullYear() - 15)
                        )
                            .toISOString()
                            .split("T")[0]}
                        {...register("dateOfBirth", {
                            required: "Date of birth is required",
                            validate: (value) => {
                                const today = new Date();
                                const birthDate = new Date(value);

                                let age = today.getFullYear() - birthDate.getFullYear();

                                const birthdayHasNotPassed =
                                    today.getMonth() < birthDate.getMonth() ||
                                    (today.getMonth() === birthDate.getMonth() &&
                                        today.getDate() < birthDate.getDate());

                                if (birthdayHasNotPassed) {
                                    age--;
                                }

                                return age >= 15 || "Applicant must be at least 15 years old";
                            },
                        })}
                    />
                    {errors.dateOfBirth && (
                        <p className={styles.errors}>
                            {errors.dateOfBirth.message}
                        </p>
                    )}
                </div>

                {/* Gender */}
                <div>
                    <label htmlFor="gender">
                        Gender <span>(optional)</span>
                    </label>
                    <select
                        id="gender"
                        {...register("gender")}
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option defaultValue value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not">
                            Prefer not to say
                        </option>
                    </select>
                </div>

                {/* Nationality */}
                <div>
                    <label htmlFor="nationality">Nationality *</label>
                    <select
                        id="nationality"
                        defaultValue="zambia"
                        {...register("nationality", {
                            required: "Nationality is required",
                            maxLength: {
                                value: 100,
                                message: "Province cannot exceed 100 characters",
                            },
                            pattern: {
                                value: /^[A-Za-z\s'-]+$/,
                                message: "Nationality can only contain letters, spaces, hyphens or apostrophes",
                            },
                        })}
                    >
                        <option value="" disabled>
                            Select Country
                        </option>

                        {countries.map((country) => (
                            <option
                                key={country.value}
                                value={country.value}
                            >
                                {country.label}
                            </option>
                        ))}
                    </select>

                    {errors.nationality && (
                        <p className={styles.errors}>
                            {errors.nationality.message}
                        </p>
                    )}
                </div>

                {/* National ID / Passport */}
                <div>
                    <label htmlFor="idNumber">
                        National ID / Passport Number{" "}
                        <span>(optional)</span>
                    </label>
                    <input
                        id="idNumber"
                        type="text"
                        placeholder="ID or passport number"
                        {...register("idNumber")}
                    />
                </div>

                {/* Residential Address */}
                <div className={styles.fullWidth}>
                    <label htmlFor="address">Residential Address *</label>
                    <textarea
                        id="address"
                        rows="3"
                        placeholder="Street address"
                        {...register("address", {
                            required: "Residential address is required",
                        })}
                    />
                    {errors.address && (
                        <p className={styles.errors}>
                            {errors.address.message}
                        </p>
                    )}
                </div>

                {/* Town / City */}
                <div>
                    <label htmlFor="townCity">Town / City *</label>
                    <input
                        id="townCity"
                        type="text"
                        placeholder="Town or city"
                        {...register("townCity", {
                            required: "Town / City is required",
                        })}
                    />
                    {errors.townCity && (
                        <p className={styles.errors}>
                            {errors.townCity.message}
                        </p>
                    )}
                </div>

                {/* Province */}
                <div>
                    <label htmlFor="province">Province *</label>
                    <input
                        defaultValue={"Lusaka"}
                        id="province"
                        type="text"
                        placeholder="Province"
                        {...register("province", {
                            required: "Province is required",
                        })}
                    />
                    {errors.province && (
                        <p className={styles.errors}>
                            {errors.province.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email">Email Address *</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="primary@email.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className={styles.errors}>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="Phone number"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^\+?[0-9\s()-]{7,20}$/,
                                message: "Please enter a valid phone number",
                            },
                        })}
                    />
                    {errors.phone && (
                        <p className={styles.errors}>
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                {/* Alternative Phone */}
                <div className={styles.fullWidth}>
                    <label htmlFor="alternativePhone">
                        Alternative Phone Number{" "}
                        <span>(optional)</span>
                    </label>
                    <input
                        defaultValue={"0987656543"}
                        id="alternativePhone"
                        type="tel"
                        placeholder="Alternative phone number"
                        {...register("alternativePhone")}
                    />
                </div>
                {errors.alternativePhone && (
                    <p className={styles.errors}>
                        {errors.alternativePhone.message}
                    </p>
                )}
            </div>
        </section>
    );
}

export default PersonalStep;