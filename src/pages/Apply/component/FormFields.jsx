import styles from "./FormFields.module.css";

function FormField({
    label,
    required = false,
    error,
    className = "",
    formElement = "input",
    type = "text",
    placeholder = "",
    register,
    name,
    rules,
    children,
    fieldProps
}) {
    // const fieldProps = register(name, rules);

    return (
        <div
            className={`${styles.field} ${error ? styles.hasError : ""
                } ${className}`}
        >
            <label htmlFor={name}>
                {label}

                {required && (
                    <span className={styles.required}>*</span>
                )}
            </label>

            {formElement === "input" && (
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...fieldProps}
                />
            )}

            {formElement === "select" && (
                <select id={name} {...fieldProps}>
                    {children}
                </select>
            )}

            {formElement === "textarea" && (
                <textarea
                    id={name}
                    placeholder={placeholder}
                    {...fieldProps}
                >
                    {children}
                </textarea>
            )}

            {error && (
                <p className={styles.error} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormField;