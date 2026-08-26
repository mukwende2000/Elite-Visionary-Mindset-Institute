import styles from './CardPayment.module.css'

function CardPayment() {
    return (
        <div className={styles.formFields}>
            <div className={styles.field}>
                <label>Cardholder Name</label>

                <input
                    type="text"
                    placeholder="Name on card"
                />
            </div>

            <div className={styles.field}>
                <label>Card Number</label>

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
                    <label>Expiry Date</label>

                    <input
                        type="text"
                        placeholder="MM/YY"
                    />
                </div>

                <div className={styles.field}>
                    <label>CVC</label>

                    <input
                        type="text"
                        placeholder="123"
                    />
                </div>
            </div>
        </div>
    );
}

export default CardPayment;