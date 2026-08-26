import styles from "./MobileMoneyPayment.module.css";

function MobileMoneyPayment() {
    return (
        <div className={styles.formFields}>
            <div className={styles.notice}>
                <strong>Mobile Money Payment</strong>

                <p>
                    You will be redirected to our secure payment gateway
                    to complete your mobile money payment.
                </p>
            </div>

            <div className={styles.field}>
                <label>Mobile Number</label>

                <input
                    type="tel"
                    placeholder="+260 97 000 0000"
                />
            </div>
        </div>
    );
}

export default MobileMoneyPayment;