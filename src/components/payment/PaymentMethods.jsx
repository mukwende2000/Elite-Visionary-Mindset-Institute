import styles from "./PaymentMethods.module.css";

function PaymentMethods({ paymentMethod, setPaymentMethod }) {
    const methods = [
        {
            value: "card",
            icon: "credit_card",
            label: "Bank Card",
        },
        {
            value: "mobile",
            icon: "smartphone",
            label: "Mobile Money",
        },
        {
            value: "manual",
            icon: "receipt_long",
            label: "Manual Payment",
        },
    ];

    return (
        <div className={styles.paymentMethods}>
            {methods.map((method) => (
                <label
                    key={method.value}
                    className={`${styles.method} ${paymentMethod === method.value
                        ? styles.selected
                        : ""
                        }`}
                >
                    <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />

                    <div className={styles.methodContent}>
                        <span className={styles.methodIcon}>
                            {method.icon}
                        </span>

                        <span>{method.label}</span>
                    </div>
                </label>
            ))}
        </div>
    );
}

export default PaymentMethods;