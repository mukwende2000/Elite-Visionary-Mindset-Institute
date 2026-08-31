import { useState } from "react";
import styles from "./PaymentMethods.module.css";

function PaymentMethods({ paymentMethod, setPaymentMethod }) {
    const [message, setMessage] = useState("");

    const methods = [
        {
            value: "card",
            icon: "credit_card",
            label: "Bank Card",
            available: false,
        },
        {
            value: "mobile",
            icon: "smartphone",
            label: "Mobile Money",
            available: false,
        },
        {
            value: "manual",
            icon: "receipt_long",
            label: "Manual Payment",
            available: true,
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
                        } ${!method.available
                            ? styles.unavailable
                            : ""
                        }`}
                >
                    <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() =>
                            handleMethodChange(method)
                        }
                    />

                    <div className={styles.methodContent}>
                        <span className={styles.methodIcon}>
                            {method.icon}
                        </span>

                        <div className={styles.methodInfo}>
                            <span>{method.label}</span>

                            {!method.available && (
                                <small>Currently unavailable</small>
                            )}
                        </div>
                    </div>
                </label>
            ))}

            {message && (
                <div className={styles.unavailableMessage}>
                    <span className="material-symbols-outlined">
                        info
                    </span>

                    <span>{message}</span>
                </div>
            )}
        </div>
    );
}

export default PaymentMethods;
