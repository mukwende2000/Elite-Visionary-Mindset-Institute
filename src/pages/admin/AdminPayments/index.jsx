// import { useEffect, useState } from "react";
// import styles from "./AdminPayments.module.css";
// import PaymentStats from "./components/PaymentStats";
// import PaymentsTable from "./components/PaymentsTable";
// import { supabase } from "../../../lib/supabase";

// function AdminPayments() {
//     const [search, setSearch] = useState("");
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [methodFilter, setMethodFilter] = useState("all");

//     const [payments, setPayments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const loadPayments = async () => {
//             setLoading(true);
//             setError("");

//             const { data, error } = await supabase
//                 .from("payments")
//                 .select(`
//                     id,
//                     application_id,
//                     payment_method,
//                     payment_reference,
//                     amount,
//                     proof_file_path,
//                     status,
//                     created_at,
//                     applications (
//                         id,
//                         first_name,
//                         other_names,
//                         surname,
//                         email,
//                         programme,
//                         intake
//                     )
//                 `)
//                 .order("created_at", { ascending: false });

//             if (error) {
//                 console.error("Failed to load payments:", error);
//                 setError("Could not load payments.");
//                 setPayments([]);
//                 setLoading(false);
//                 return;
//             }

//             const formattedPayments = (data || []).map((payment) => {
//                 const application = payment.applications;

//                 const applicantName = [
//                     application?.first_name,
//                     application?.other_names,
//                     application?.surname,
//                 ]
//                     .filter(Boolean)
//                     .join(" ");

//                 const methodMap = {
//                     bank_transfer: {
//                         label: "Bank Transfer",
//                         icon: "account_balance",
//                     },
//                     mobile_money: {
//                         label: "Mobile Money",
//                         icon: "phone_android",
//                     },
//                     card: {
//                         label: "Card",
//                         icon: "credit_card",
//                     },
//                 };

//                 const method =
//                     methodMap[payment.payment_method] || {
//                         label: payment.payment_method || "—",
//                         icon: "payments",
//                     };

//                 const statusMap = {
//                     pending: "Pending",
//                     pending_verification: "Pending Verification",
//                     paid: "Verified",
//                     failed: "Failed",
//                     rejected: "Rejected",
//                 };

//                 return {
//                     id: payment.id,
//                     applicant: applicantName || "Unknown Applicant",
//                     applicationId: application?.id || payment.application_id,
//                     method: method.label,
//                     methodValue: payment.payment_method,
//                     icon: method.icon,
//                     amount: Number(payment.amount || 0),
//                     reference: payment.payment_reference || "—",
//                     submitted: payment.created_at,
//                     status:
//                         statusMap[payment.status] ||
//                         payment.status ||
//                         "Unknown",
//                     statusValue: payment.status,
//                     proofFilePath: payment.proof_file_path,
//                     email: application?.email,
//                     programme: application?.programme,
//                     intake: application?.intake,
//                 };
//             });

//             setPayments(formattedPayments);
//             setLoading(false);
//         };

//         loadPayments();
//     }, []);

//     const totalAmount = payments.reduce(
//         (total, payment) => total + payment.amount,
//         0
//     );

//     const pendingPayments = payments.filter(
//         (payment) =>
//             payment.statusValue === "pending" ||
//             payment.statusValue === "pending_verification"
//     );

//     const verifiedPayments = payments.filter(
//         (payment) => payment.statusValue === "paid"
//     );

//     const rejectedPayments = payments.filter(
//         (payment) =>
//             payment.statusValue === "failed" ||
//             payment.statusValue === "rejected"
//     );

//     const pendingAmount = pendingPayments.reduce(
//         (total, payment) => total + payment.amount,
//         0
//     );

//     const verifiedAmount = verifiedPayments.reduce(
//         (total, payment) => total + payment.amount,
//         0
//     );

//     const rejectedAmount = rejectedPayments.reduce(
//         (total, payment) => total + payment.amount,
//         0
//     );

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: "USD",
//         }).format(amount);
//     };

//     const summaryCards = [
//         {
//             label: "Total Payments",
//             value: formatCurrency(totalAmount),
//             description: `${payments.length} recorded payments`,
//             icon: "payments",
//             type: "total",
//         },
//         {
//             label: "Pending Verification",
//             value: formatCurrency(pendingAmount),
//             description: `${pendingPayments.length} payments awaiting review`,
//             icon: "pending_actions",
//             type: "pending",
//         },
//         {
//             label: "Verified",
//             value: formatCurrency(verifiedAmount),
//             description: `${verifiedPayments.length} verified payments`,
//             icon: "verified",
//             type: "verified",
//         },
//         {
//             label: "Failed / Rejected",
//             value: formatCurrency(rejectedAmount),
//             description: `${rejectedPayments.length} payments requiring attention`,
//             icon: "error",
//             type: "rejected",
//         },
//     ];

//     return (
//         <main className={styles.page}>
//             <div className={styles.pageHeader}>
//                 <div>
//                     <h1>Payments</h1>
//                     <p>
//                         Review, verify, and manage application payments.
//                     </p>
//                 </div>

//                 <button
//                     type="button"
//                     className={styles.recordButton}
//                 >
//                     <span className="material-symbols-outlined">
//                         payments
//                     </span>
//                     Record Payment
//                 </button>
//             </div>

//             {loading && (
//                 <div className={styles.message}>
//                     Loading payments...
//                 </div>
//             )}

//             {error && (
//                 <div className={styles.error}>
//                     {error}
//                 </div>
//             )}

//             {!loading && !error && (
//                 <>
//                     <PaymentStats cards={summaryCards} />

//                     <PaymentsTable
//                         payments={payments}
//                         search={search}
//                         setSearch={setSearch}
//                         statusFilter={statusFilter}
//                         setStatusFilter={setStatusFilter}
//                         methodFilter={methodFilter}
//                         setMethodFilter={setMethodFilter}
//                     />
//                 </>
//             )}
//         </main>
//     );
// }

// export default AdminPayments;

import {
    useEffect,
    useMemo,
    useState,
} from "react";
import styles from "./AdminPayments.module.css";
import PaymentStats from "./components/PaymentStats";
import PaymentsTable from "./components/PaymentsTable";
import Pagination from "../Pagination";
import { supabase } from "../../../lib/supabase";

function AdminPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [methodFilter, setMethodFilter] = useState("");

    const [page, setPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        const loadPayments = async () => {
            setLoading(true);
            setError("");

            const { data, error } = await supabase
                .from("payments")
                .select(`
                id,
                application_id,
                payment_method,
                payment_reference,
                amount,
                proof_file_path,
                status,
                created_at,
                applications (
                    id,
                    first_name,
                    other_names,
                    surname,
                    email,
                    programme,
                    intake
                )
            `)
                .order("created_at", {
                    ascending: false,
                });

            if (error) {
                console.error(
                    "Failed to load payments:",
                    error
                );

                setError(
                    "Could not load payments."
                );
                setPayments([]);
                setLoading(false);
                return;
            }

            const formattedPayments = (
                data || []
            ).map((payment) => {
                const application =
                    payment.applications;

                const applicantName = [
                    application?.first_name,
                    application?.other_names,
                    application?.surname,
                ]
                    .filter(Boolean)
                    .join(" ");

                const methodMap = {
                    card: {
                        label: "Card",
                        icon: "credit_card",
                    },
                    mobile: {
                        label: "Mobile Money",
                        icon: "phone_android",
                    },
                    manual: {
                        label: "Manual",
                        icon: "payments",
                    },
                };

                const method =
                    methodMap[
                    payment.payment_method
                    ] || {
                        label:
                            payment.payment_method ||
                            "—",
                        icon: "payments",
                    };

                const statusMap = {
                    pending: "Pending",
                    pending_verification:
                        "Pending Verification",
                    paid: "Verified",
                    failed: "Failed",
                    rejected: "Rejected",
                };

                return {
                    id: payment.id,
                    applicant:
                        applicantName ||
                        "Unknown Applicant",
                    applicationId:
                        application?.id ||
                        payment.application_id,
                    method: method.label,
                    methodValue:
                        payment.payment_method,
                    icon: method.icon,
                    amount: Number(
                        payment.amount || 0
                    ),
                    reference:
                        payment.payment_reference ||
                        "—",
                    submitted:
                        payment.created_at,
                    status:
                        statusMap[
                        payment.status
                        ] ||
                        payment.status ||
                        "Unknown",
                    statusValue:
                        payment.status,
                    proofFilePath:
                        payment.proof_file_path,
                    email: application?.email,
                    programme:
                        application?.programme,
                    intake:
                        application?.intake,
                };
            });

            setPayments(formattedPayments);
            setLoading(false);
        };

        loadPayments();
    }, []);

    const filteredPayments = useMemo(() => {
        const query =
            search.trim().toLowerCase();

        return payments.filter((payment) => {
            const matchesSearch =
                !query ||
                payment.applicant
                    ?.toLowerCase()
                    .includes(query) ||
                payment.email
                    ?.toLowerCase()
                    .includes(query) ||
                payment.reference
                    ?.toLowerCase()
                    .includes(query) ||
                payment.applicationId
                    ?.toLowerCase()
                    .includes(query) ||
                payment.programme
                    ?.toLowerCase()
                    .includes(query) ||
                payment.intake
                    ?.toLowerCase()
                    .includes(query);

            const matchesStatus =
                statusFilter === "" ||
                payment.statusValue ===
                statusFilter;

            const matchesMethod =
                methodFilter === "" ||
                payment.methodValue ===
                methodFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesMethod
            );
        });
    }, [
        payments,
        search,
        statusFilter,
        methodFilter,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredPayments.length /
            itemsPerPage
        )
    );

    const paginatedPayments = useMemo(() => {
        const start =
            (page - 1) * itemsPerPage;

        return filteredPayments.slice(
            start,
            start + itemsPerPage
        );
    }, [filteredPayments, page]);

    useEffect(() => {
        setPage(1);
    }, [
        search,
        statusFilter,
        methodFilter,
    ]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const stats = useMemo(() => {
        const totalAmount =
            payments.reduce(
                (total, payment) =>
                    total + payment.amount,
                0
            );

        const pendingPayments =
            payments.filter(
                (payment) =>
                    payment.statusValue ===
                    "pending" ||
                    payment.statusValue ===
                    "pending_verification"
            );

        const verifiedPayments =
            payments.filter(
                (payment) =>
                    payment.statusValue ===
                    "paid"
            );

        const rejectedPayments =
            payments.filter(
                (payment) =>
                    payment.statusValue ===
                    "failed" ||
                    payment.statusValue ===
                    "rejected"
            );

        const pendingAmount =
            pendingPayments.reduce(
                (total, payment) =>
                    total + payment.amount,
                0
            );

        const verifiedAmount =
            verifiedPayments.reduce(
                (total, payment) =>
                    total + payment.amount,
                0
            );

        const rejectedAmount =
            rejectedPayments.reduce(
                (total, payment) =>
                    total + payment.amount,
                0
            );

        return [
            {
                label: "Total Payments",
                value: formatCurrency(
                    totalAmount
                ),
                description: `${payments.length} recorded payments`,
                icon: "payments",
                type: "total",
            },
            {
                label: "Pending Verification",
                value: formatCurrency(
                    pendingAmount
                ),
                description: `${pendingPayments.length} payments awaiting review`,
                icon: "pending_actions",
                type: "pending",
            },
            {
                label: "Verified",
                value: formatCurrency(
                    verifiedAmount
                ),
                description: `${verifiedPayments.length} verified payments`,
                icon: "verified",
                type: "verified",
            },
            {
                label: "Failed / Rejected",
                value: formatCurrency(
                    rejectedAmount
                ),
                description: `${rejectedPayments.length} payments requiring attention`,
                icon: "error",
                type: "rejected",
            },
        ];
    }, [payments]);

    return (
        <main className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Payments</h1>

                    <p>
                        Review, verify, and manage
                        application payments.
                    </p>
                </div>

                <button
                    type="button"
                    className={styles.recordButton}
                >
                    <span className="material-symbols-outlined">
                        payments
                    </span>

                    Record Payment
                </button>
            </div>

            <PaymentStats cards={stats} />

            {loading && (
                <div className={styles.message}>
                    Loading payments...
                </div>
            )}

            {!loading && error && (
                <div
                    className={`${styles.message} ${styles.error}`}
                >
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className={styles.tableCard}>
                    <PaymentsTable
                        payments={paginatedPayments}
                        search={search}
                        setSearch={setSearch}
                        statusFilter={
                            statusFilter
                        }
                        setStatusFilter={
                            setStatusFilter
                        }
                        methodFilter={
                            methodFilter
                        }
                        setMethodFilter={
                            setMethodFilter
                        }
                    />

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        totalItems={
                            filteredPayments.length
                        }
                        itemsPerPage={
                            itemsPerPage
                        }
                        setPage={setPage}
                    />
                </div>
            )}
        </main>
    );
} export default AdminPayments;