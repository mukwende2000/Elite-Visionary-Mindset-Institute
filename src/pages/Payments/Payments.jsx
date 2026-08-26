import { useState } from "react";
import styles from "./Payment.module.css";

function PaymentStep({
    applicant,
    programme,
    intake,
    applicationFee = 150,
    tuitionDeposit = 4850,
}) {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [paymentProof, setPaymentProof] = useState(null);
    const [reference, setReference] = useState("");

    const total = applicationFee + tuitionDeposit;

    const handleProofChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            setPaymentProof(file);
        }
    };

    const handlePayment = (event) => {
        event.preventDefault();

        console.log({
            paymentMethod,
            paymentProof,
            reference,
        });

        // Payment integration will go here later.
    };

    return (
        <section className={styles.page}>
            <div className={styles.container}>

                {/* Progress */}
                <div className={styles.progress}>
                    <div className={styles.progressLine}></div>

                    <div className={styles.progressStep}>
                        <div className={styles.completedCircle}>✓</div>
                        <span>Details</span>
                    </div>

                    <div className={styles.progressStep}>
                        <div className={styles.completedCircle}>✓</div>
                        <span>Academic</span>
                    </div>

                    <div className={styles.progressStep}>
                        <div className={styles.completedCircle}>✓</div>
                        <span>Emergency</span>
                    </div>

                    <div className={`${styles.progressStep} ${styles.activeStep}`}>
                        <div className={styles.activeCircle}>4</div>
                        <span>Payment</span>
                    </div>
                </div>

                {/* Heading */}
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

                                {/* Payment Methods */}
                                <div className={styles.paymentMethods}>

                                    <label className={styles.method}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === "card"}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                        />

                                        <div className={styles.methodContent}>
                                            <span className={styles.methodIcon}>
                                                credit_card
                                            </span>

                                            <span>Bank Card</span>
                                        </div>
                                    </label>

                                    <label className={styles.method}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="mobile"
                                            checked={paymentMethod === "mobile"}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                        />

                                        <div className={styles.methodContent}>
                                            <span className={styles.methodIcon}>
                                                smartphone
                                            </span>

                                            <span>Mobile Money</span>
                                        </div>
                                    </label>

                                    <label className={styles.method}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="manual"
                                            checked={paymentMethod === "manual"}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                        />

                                        <div className={styles.methodContent}>
                                            <span className={styles.methodIcon}>
                                                receipt_long
                                            </span>

                                            <span>Manual Payment</span>
                                        </div>
                                    </label>

                                </div>

                                {/* CARD */}
                                {paymentMethod === "card" && (
                                    <div className={styles.formFields}>

                                        <div className={styles.field}>
                                            <label>
                                                Cardholder Name
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Name on card"
                                            />
                                        </div>

                                        <div className={styles.field}>
                                            <label>
                                                Card Number
                                            </label>

                                            <div className={styles.cardInput}>
                                                <span>credit_card</span>

                                                <input
                                                    type="text"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.twoColumns}>

                                            <div className={styles.field}>
                                                <label>
                                                    Expiry Date
                                                </label>

                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>
                                                    CVC
                                                </label>

                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                />
                                            </div>

                                        </div>

                                    </div>
                                )}

                                {/* MOBILE MONEY */}
                                {paymentMethod === "mobile" && (
                                    <div className={styles.formFields}>

                                        <div className={styles.notice}>
                                            <strong>
                                                Mobile Money Payment
                                            </strong>

                                            <p>
                                                You will be redirected to our
                                                secure payment gateway to
                                                complete your mobile money
                                                payment.
                                            </p>
                                        </div>

                                        <div className={styles.field}>
                                            <label>
                                                Mobile Number
                                            </label>

                                            <input
                                                type="tel"
                                                placeholder="+260 97 000 0000"
                                            />
                                        </div>

                                    </div>
                                )}

                                {/* MANUAL PAYMENT */}
                                {paymentMethod === "manual" && (
                                    <div className={styles.manualPayment}>

                                        <div className={styles.notice}>
                                            <strong>
                                                Manual Payment
                                            </strong>

                                            <p>
                                                Make your payment using the
                                                payment details below, then
                                                upload your proof of payment.
                                            </p>
                                        </div>

                                        <div className={styles.paymentDetails}>

                                            <h3>
                                                Payment Details
                                            </h3>

                                            <div className={styles.detailRow}>
                                                <span>Bank</span>
                                                <strong>
                                                    Your Bank Name
                                                </strong>
                                            </div>

                                            <div className={styles.detailRow}>
                                                <span>Account Name</span>
                                                <strong>
                                                    Elite Visionary Mindset
                                                    Institute
                                                </strong>
                                            </div>

                                            <div className={styles.detailRow}>
                                                <span>Account Number</span>
                                                <strong>
                                                    0000000000
                                                </strong>
                                            </div>

                                            <div className={styles.detailRow}>
                                                <span>Branch</span>
                                                <strong>
                                                    Lusaka
                                                </strong>
                                            </div>

                                        </div>

                                        <div className={styles.uploadArea}>

                                            <label>
                                                Proof of Payment
                                            </label>

                                            <div className={styles.uploadBox}>
                                                <span className={styles.uploadIcon}>
                                                    upload_file
                                                </span>

                                                <p>
                                                    {paymentProof
                                                        ? paymentProof.name
                                                        : "Upload your payment receipt"}
                                                </p>

                                                <span>
                                                    PNG, JPG or PDF
                                                </span>

                                                <input
                                                    type="file"
                                                    accept=".png,.jpg,.jpeg,.pdf"
                                                    onChange={handleProofChange}
                                                />
                                            </div>

                                        </div>

                                        <div className={styles.field}>
                                            <label>
                                                Payment Reference
                                            </label>

                                            <input
                                                type="text"
                                                value={reference}
                                                onChange={(e) =>
                                                    setReference(e.target.value)
                                                }
                                                placeholder="Enter transaction/reference number"
                                            />
                                        </div>

                                    </div>
                                )}

                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className={styles.rightColumn}>

                            <div className={`${styles.card} ${styles.summary}`}>

                                <div className={styles.summaryHeader}>
                                    <h2>Order Summary</h2>

                                    <span>
                                        receipt_long
                                    </span>
                                </div>

                                <div className={styles.summaryBody}>

                                    <div className={styles.summaryRow}>
                                        <span>Applicant</span>

                                        <strong>
                                            {applicant || "Applicant Name"}
                                        </strong>
                                    </div>

                                    <div className={styles.summaryRow}>
                                        <span>Programme</span>

                                        <strong>
                                            {programme || "Selected Programme"}
                                        </strong>
                                    </div>

                                    <div className={styles.summaryRow}>
                                        <span>Intake</span>

                                        <strong>
                                            {intake || "Selected Intake"}
                                        </strong>
                                    </div>

                                    <div className={styles.divider}></div>

                                    <div className={styles.summaryRow}>
                                        <span>Application Fee</span>

                                        <strong>
                                            ${applicationFee.toLocaleString()}
                                        </strong>
                                    </div>

                                    <div className={styles.summaryRow}>
                                        <span>Tuition Deposit</span>

                                        <strong>
                                            ${tuitionDeposit.toLocaleString()}
                                        </strong>
                                    </div>

                                    <div className={styles.divider}></div>

                                    <div className={styles.totalRow}>
                                        <span>Total</span>

                                        <strong>
                                            ${total.toLocaleString()}
                                        </strong>
                                    </div>

                                    <button
                                        type="submit"
                                        className={styles.payButton}
                                    >
                                        <span>lock</span>

                                        {paymentMethod === "manual"
                                            ? "Submit Payment Proof"
                                            : `Pay $${total.toLocaleString()} Now`}
                                    </button>

                                    <p className={styles.secureText}>
                                        <span>verified_user</span>
                                        Payments are secure and encrypted
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                </form>
            </div>
        </section>
    );
}

export default PaymentStep;