import { useState } from "react";
import styles from "./Apply.module.css";
import AcademicStep from "../../componets/apply/AcademicStep";
import EmergencyStep from "../../componets/apply/EmergencyStep";
import AdditionalStep from "../../componets/apply/AdditionalStep";
import Declaration from "../../componets/apply/Declaration";
import PersonalStep from "../../componets/apply/PersonalStep";
import { useForm } from "react-hook-form";
import { stepFields } from "../../data/stepFields";

const steps = [
    "Personal",
    "Academic",
    "Emergency",
    "Additional",
    "Declaration",
];

function Apply() {
    const [currentStep, setCurrentStep] = useState(1);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        trigger
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    const nextStep = async () => {

        const fields = stepFields[currentStep]
        const isValid = await trigger(fields)

        if (!isValid) {
            return;
        }


        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const previousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Header */}
                    <div className={styles.heading}>
                        <h1>Admissions Application</h1>
                        <p>
                            Embark on your journey to academic and professional excellence.
                        </p>
                    </div>

                    {/* Progress */}
                    <div className={styles.progress}>
                        {steps.map((step, index) => {
                            const stepNumber = index + 1;

                            return (
                                <div
                                    key={step}
                                    className={`${styles.step} ${stepNumber === currentStep ? styles.activeStep : ""
                                        } ${stepNumber < currentStep ? styles.completedStep : ""
                                        }`}
                                >
                                    <div className={styles.stepNumber}>{stepNumber}</div>
                                    <span>{step}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form */}
                    <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
                        <h2>
                            {steps[currentStep - 1]} {currentStep !== 5 ? "Information" : null}
                        </h2>


                        {currentStep === 1 && (
                            <PersonalStep register={register} errors={errors} />
                        )}
                        {currentStep === 2 && (
                            <AcademicStep register={register} errors={errors} />
                        )}
                        {currentStep === 3 && (
                            <EmergencyStep register={register} errors={errors} />
                        )}
                        {currentStep === 4 && (
                            <AdditionalStep register={register} errors={errors} />
                        )}
                        {currentStep === 5 && (
                            <Declaration register={register} errors={errors} />
                        )}

                        {/* Actions */}
                        <div className={styles.actions}>
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={previousStep}
                                >
                                    Back
                                </button>
                            )}

                            <button
                                type="button"
                                className={styles.secondaryButton}
                            >
                                Save Draft
                            </button>

                            {currentStep < steps.length ? (
                                <button
                                    type="button"
                                    className={styles.primaryButton}
                                    onClick={nextStep}
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={styles.primaryButton}
                                >
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Security */}
                    <div className={styles.security}>
                        <span>✓</span>
                        Secure, Encrypted Application Process
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Apply;