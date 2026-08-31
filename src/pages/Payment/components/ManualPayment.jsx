import styles from "./ManualPayment.module.css";

function ManualPayment({
    paymentProof,
    paymentReference,
    setPaymentReference,
    handleProofChange,
}) {
    return (
        <div className={styles.manualPayment}>

            <div className={styles.notice}>
                <strong>Manual Payment</strong>

                <p>
                    Make your payment using the payment details below,
                    then upload your proof of payment.
                </p>
            </div>

            <div className={styles.paymentDetails}>
                <h3>Payment Details</h3>

                <div className={styles.detailRow}>
                    <span>Bank</span>
                    <strong>Your Bank Name</strong>
                </div>

                <div className={styles.detailRow}>
                    <span>Account Name</span>
                    <strong>
                        Elite Visionary Mindset Institute
                    </strong>
                </div>

                <div className={styles.detailRow}>
                    <span>Account Number</span>
                    <strong>0000000000</strong>
                </div>

                <div className={styles.detailRow}>
                    <span>Branch</span>
                    <strong>Lusaka</strong>
                </div>
            </div>

            <div className={styles.uploadArea}>
                <label>Proof of Payment</label>

                <div className={styles.uploadBox}>
                    <span className={styles.uploadIcon}>
                        upload_file
                    </span>

                    <p>
                        {paymentProof
                            ? paymentProof.name
                            : "Upload your payment receipt"}
                    </p>

                    <span>PNG, JPG or PDF</span>

                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={handleProofChange}
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label>Payment Reference</label>

                <input
                    type="text"
                    value={paymentReference}
                    onChange={(e) =>
                        setPaymentReference(e.target.value)
                    }
                    placeholder="Enter transaction/reference number"
                />
            </div>

        </div>
    );
}

export default ManualPayment;