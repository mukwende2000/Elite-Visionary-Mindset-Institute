import { useState } from "react";
import styles from "./Apply.module.css";
import AcademicStep from "../../componets/apply/AcademicStep";
import EmergencyStep from "../../componets/apply/EmergencyStep";
import AdditionalStep from "../../componets/apply/AdditionalStep";
import Declaration from "../../componets/apply/Declaration";
import PersonalStep from "../../componets/apply/PersonalStep";

const steps = [
    "Personal",
    "Academic",
    "Emergency",
    "Additional",
    "Declaration",
];

function Apply() {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
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
                    <div className={styles.formCard}>
                        <h2>
                            Step {currentStep}: {steps[currentStep - 1]} Information
                        </h2>


                        {currentStep === 1 && (
                            <PersonalStep
                                onNext={nextStep}
                                onBack={previousStep}
                            />
                        )}
                        {currentStep === 2 && (
                            <AcademicStep
                                onNext={nextStep}
                                onBack={previousStep}
                            />
                        )}
                        {currentStep === 3 && (
                            <EmergencyStep
                                onNext={nextStep}
                                onBack={previousStep}
                            />
                        )}
                        {currentStep === 4 && (
                            <AdditionalStep
                                onNext={nextStep}
                                onBack={previousStep}
                            />
                        )}
                        {currentStep === 5 && (
                            <Declaration
                                onBack={previousStep}
                                onSubmit={() => console.log("Application submitted")}
                            />
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
                                    type="button"
                                    className={styles.primaryButton}
                                >
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </div>

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