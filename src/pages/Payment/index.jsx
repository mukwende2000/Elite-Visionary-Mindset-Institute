import { useState, useEffect } from "react";
import styles from "./Payment.module.css";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import testApplication from "../../lib/testApplication";
import PaymentMethods from "./components/PaymentMethods";
import CardPayment from "./components/CardPayment";
import MobileMoneyPayment from "./components/MobileMoneyPayment";
import ManualPayment from "./components/ManualPayment";
import PaymentSummary from "./components/PaymentSummary";
import { supabase } from "../../lib/supabase";
import { sendApplicationEmail } from "../../lib/applicationEmail";
import Swal from "sweetalert2";

function PaymentStep({ applicationFee = 150, tuitionDeposit = 4850, }) {
    const [paymentMethod, setPaymentMethod] = useState("manual");
    const [paymentProof, setPaymentProof] = useState(null);
    const location = useLocation()
    const navigate = useNavigate()
    const [existingPayment, setExistingPayment] = useState(null);
    const [checkingPayment, setCheckingPayment] = useState(true);
    const [paymentReference, setPaymentReference] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const isTestMode = new URLSearchParams(location.search).get("test") === "true"

    const application = isTestMode ? testApplication : location.state?.application
    if (!application) {
        return (
            <div>
                <h1>Application not found</h1>
                <p>
                    Please submit an application before accessing payment.
                </p>
            </div>
        );
    }

    const total =
        Number(applicationFee) + Number(tuitionDeposit);

    const handleProofChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            setPaymentProof(file);
        }
    };

    const checkExistingPayment = async () => {
        const { data, error } = await supabase
            .from("payments")
            .select("*")
            .eq("application_id", application.id)
            .in("status", ["pending_verification", "verified"])
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data;
    };

    useEffect(() => {
        const loadExistingPayment = async () => {
            try {
                const payment = await checkExistingPayment();

                setExistingPayment(payment);
            } catch (error) {
                console.error(
                    "Failed to check existing payment:",
                    error
                );
            } finally {
                setCheckingPayment(false);
            }
        };

        loadExistingPayment();
    }, [application.id]);

    const handleManualPayment = async () => {
        if (!paymentReference.trim()) {
            await Swal.fire({
                icon: "warning",
                title: "Payment Reference Required",
                text: "Please enter your payment reference before submitting your payment.",
                confirmButtonText: "Okay",
            });
            return;
        }

        if (!paymentProof) {
            await Swal.fire({
                icon: "warning",
                title: "Proof of Payment Required",
                text: "Please upload your proof of payment before submitting your payment.",
                confirmButtonText: "Okay",
            });
            return;
        }

        setSubmitting(true);

        try {
            const existingPayment = await checkExistingPayment();

            if (existingPayment) {
                await Swal.fire({
                    icon: "info",
                    title: "Payment Already Submitted",
                    text: "This application already has a payment being processed.",
                    confirmButtonText: "Okay",
                });

                return;
            }

            const fileExt = paymentProof.name.split(".").pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`;
            const filePath = `${application.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("payment-proofs")
                .upload(filePath, paymentProof);

            if (uploadError) {
                throw uploadError;
            }

            const { data: payment, error: paymentError } =
                await supabase
                    .from("payments")
                    .insert([
                        {
                            application_id: application.id,
                            payment_method: "manual",
                            payment_reference: paymentReference.trim(),
                            amount: total,
                            proof_file_path: filePath,
                            status: "pending_verification",
                        },
                    ])
                    .select()
                    .single();

            if (paymentError) {
                await supabase.storage
                    .from("payment-proofs")
                    .remove([filePath]);

                throw paymentError;
            }

            await Swal.fire({
                icon: "success",
                title: "Payment Submitted",
                text: "Your payment has been submitted successfully and is awaiting verification. An Email has also been sent to you, check.",
                confirmButtonText: "Continue",
            });

            try {
                const emailResult = await sendApplicationEmail({
                    emailType: "application_submitted",
                    applicantName:
                        `${application.first_name} ${application.surname}`,
                    applicantEmail: application.email,
                    applicationId: application.id,
                });

                console.log(
                    "Application email sent:",
                    emailResult
                );
            } catch (error) {
                console.error(
                    "Application email failed:",
                    error
                );
            }

            navigate("/payment_confirmation", {
                state: {
                    application,
                    payment,
                    paymentStatus: "pending_verification",
                    paymentReference:
                        paymentReference.trim(),
                },
            });

        } catch (error) {
            console.error(
                "Payment submission failed:",
                error
            );

            await Swal.fire({
                icon: "error",
                title: "Payment Submission Failed",
                text: "We could not submit your payment. Please try again.",
                confirmButtonText: "Okay",
            });
        } finally {
            setSubmitting(false);
        }
    };
    const handlePayment = (event) => {
        event.preventDefault();

        console.log({
            paymentMethod,
            paymentProof,
        });

        // Payment integration will go here later.
    };
    if (checkingPayment) {
        return (
            <section className={styles.page}>
                <div className={styles.container}>
                    <p>Checking payment status...</p>
                </div>
            </section>
        );
    }

    if (existingPayment) {
        return (
            <section className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.paymentStatus}>
                        <span className="material-symbols-outlined">
                            check_circle
                        </span>

                        <h1>Payment Already Submitted</h1>

                        <p>
                            We have received a payment for this
                            application and it is currently being
                            processed.
                        </p>

                        <div className={styles.paymentDetails}>
                            <div>
                                <span>Payment Reference</span>
                                <strong>
                                    {existingPayment.payment_reference}
                                </strong>
                            </div>

                            <div>
                                <span>Amount</span>
                                <strong>
                                    ${Number(existingPayment.amount).toFixed(2)}
                                </strong>
                            </div>

                            <div>
                                <span>Status</span>
                                <strong>
                                    {existingPayment.status}
                                </strong>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1>Complete Your Payment</h1>
                    <p>
                        Please review your enrollment details and select a
                        secure payment method to finalize your application.
                    </p>
                </div>

                <form onSubmit={handlePayment}>
                    <div className={styles.paymentGrid}>

                        {/* LEFT */}
                        <div className={styles.leftColumn}>

                            <div className={styles.card}>

                                <h2 className={styles.cardTitle}>
                                    <span className={styles.icon}>
                                        payments
                                    </span>

                                    Payment Method
                                </h2>

                                <PaymentMethods
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                />

                                {paymentMethod === "card" && <CardPayment />}
                                {paymentMethod === "mobile" && <MobileMoneyPayment />}
                                {paymentMethod === "manual" && (
                                    <ManualPayment
                                        paymentProof={paymentProof}
                                        paymentReference={paymentReference}
                                        setPaymentReference={setPaymentReference}
                                        handleProofChange={handleProofChange}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={styles.rightColumn}>
                            <PaymentSummary
                                application={application}
                                applicationFee={applicationFee}
                                tuitionDeposit={tuitionDeposit}
                                paymentMethod={paymentMethod}
                                submitting={submitting}
                                onManualPayment={handleManualPayment}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
export default PaymentStep;