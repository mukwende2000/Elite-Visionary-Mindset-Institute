import { useState } from "react";
import styles from "./Payment.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import testApplication from "../../lib/testApplication";
import PaymentMethods from "../../components/payment/PaymentMethods";
import CardPayment from "../../components/payment/CardPayment";
import MobileMoneyPayment from "../../components/payment/MobileMoneyPayment";
import ManualPayment from "../../components/payment/ManualPayment";
import PaymentSummary from "../../components/payment/PaymentSummary";
import { supabase } from "../../lib/supabase";

function PaymentStep({ applicationFee = 150, tuitionDeposit = 4850, }) {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [paymentProof, setPaymentProof] = useState(null);
    const location = useLocation()
    const navigate = useNavigate()

    console.log("PAYMENT LOCATION:", location);
    console.log("PAYMENT LOCATION STATE:", location.state);
    console.log("PAYMENT APPLICATION:", location.state?.application);

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

    const handleManualPayment = async () => {
        if (!paymentReference.trim()) {
            alert("Please enter your payment reference.");
            return;
        }

        if (!paymentProof) {
            alert("Please upload your proof of payment.");
            return;
        }

        setSubmitting(true);

        try {
            // Create a unique file for this application
            const fileExt = paymentProof.name.split(".").pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`
            const filePath = `${application.id}/${fileName}`

            // 1. upload proof of payment to Storage
            const { error: uploadError } = await supabase.storage
                .from("payment-proofs")
                .upload(filePath, paymentProof)

            if (uploadError) {
                throw uploadError
            }

            // 2. Create payment record
            const { data: payment, error: paymentError } = await supabase
                .from("payments")
                .insert([
                    {
                        application_id: application.id,
                        payment_method: "manual",
                        payment_reference: paymentReference.trim(),
                        amount: total,
                        proof_file_path: filePath,
                        status: "pending_verification"
                    }
                ])
                .select()
                .single()

            if (paymentError) {
                //If database insert fails, remove the upload file
                await supabase.storage
                    .from("payment-proofs")
                    .remove([filePath]);

                throw paymentError;
            }

            console.log("payment submitted:", payment)

            navigate("/payment_confirmation", {
                state: {
                    application,
                    payment,
                    paymentStatus: "pending_verification",
                    paymentReference: paymentReference.trim(),
                },
            });

        } catch (error) {
            console.error("Manual payment submission failed:", error);
            alert("We could not submit your payment. Please try again")
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