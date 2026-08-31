import styles from "./Declaration.module.css";

function Declaration({ register, errors }) {
    return (
        <section className={styles.step}>
            <div className={styles.header}>
                <p>
                    Please review the declaration below before submitting your
                    application.
                </p>
            </div>

            <div className={styles.declarationBox}>
                <div className={styles.icon}>
                    <span className="material-symbols-outlined">verified</span>
                </div>

                <h3>Applicant Declaration</h3>

                <p>
                    I declare that the information provided in this application is
                    complete and accurate to the best of my knowledge. I understand
                    that providing false or misleading information may result in the
                    rejection or withdrawal of my application.
                </p>

                <p>
                    I understand that admission to Elite Visionary Mindset Institute
                    is subject to meeting the relevant programme requirements and that
                    submission of this application does not guarantee admission.
                </p>
            </div>

            <div className={styles.confirmation}>
                <label className={styles.checkboxLabel}>
                    <input type="checkbox" id="declaration" {...register("declaration", { required: "Please accept the terms above" })} />

                    <span>
                        I confirm that I have read, understood, and agree to the above
                        declaration.
                        <strong>*</strong>
                    </span>

                </label>
                {errors.declaration && (
                    <p className={styles.errors}>
                        {errors.declaration.message}
                    </p>
                )}
            </div>
        </section>
    );
}

export default Declaration;