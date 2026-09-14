// import { useNavigate } from "react-router-dom";
// import styles from "./PaymentsTable.module.css";

// function PaymentsTable({
//     payments,
//     search,
//     setSearch,
//     statusFilter,
//     setStatusFilter,
//     methodFilter,
//     setMethodFilter,
// }) {
//     const navigate = useNavigate();

//     return (
//         <section className={styles.card}>
//             <div className={styles.toolbar}>
//                 <div className={styles.searchWrapper}>
//                     <span className="material-symbols-outlined">
//                         search
//                     </span>

//                     <input
//                         type="text"
//                         value={search}
//                         onChange={(event) =>
//                             setSearch(event.target.value)
//                         }
//                         placeholder="Search applicant or reference..."
//                     />
//                 </div>

//                 <div className={styles.filters}>
//                     <select
//                         value={statusFilter}
//                         onChange={(event) =>
//                             setStatusFilter(event.target.value)
//                         }
//                     >
//                         <option value="">
//                             All Statuses
//                         </option>

//                         <option value="paid">
//                             Verified
//                         </option>

//                         <option value="pending">
//                             Pending
//                         </option>

//                         <option value="pending_verification">
//                             Pending Verification
//                         </option>

//                         <option value="rejected">
//                             Rejected
//                         </option>

//                         <option value="failed">
//                             Failed
//                         </option>
//                     </select>

//                     <select
//                         value={methodFilter}
//                         onChange={(event) =>
//                             setMethodFilter(event.target.value)
//                         }
//                     >
//                         <option value="">
//                             All Payment Methods
//                         </option>

//                         <option value="bank_transfer">
//                             Bank Transfer
//                         </option>

//                         <option value="mobile_money">
//                             Mobile Money
//                         </option>

//                         <option value="card">
//                             Card
//                         </option>

//                         <option value="manual">
//                             Manual
//                         </option>
//                     </select>
//                 </div>
//             </div>

//             <div className={styles.tableWrapper}>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Applicant</th>
//                             <th>Application ID</th>
//                             <th>Payment Method</th>
//                             <th>Amount</th>
//                             <th>Reference</th>
//                             <th>Submitted</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {payments.length > 0 ? (
//                             payments.map((payment) => (
//                                 <tr key={payment.id}>
//                                     <td className={styles.applicant}>
//                                         {payment.applicant}
//                                     </td>

//                                     <td className={styles.muted}>
//                                         {payment.applicationId}
//                                     </td>

//                                     <td>
//                                         <div className={styles.method}>
//                                             <span className="material-symbols-outlined">
//                                                 {payment.icon}
//                                             </span>

//                                             {payment.method}
//                                         </div>
//                                     </td>

//                                     <td className={styles.amount}>
//                                         {payment.amount}
//                                     </td>

//                                     <td>
//                                         <div className={styles.reference}>
//                                             {payment.reference}

//                                             {payment.method ===
//                                                 "Bank Transfer" && (
//                                                     <span className="material-symbols-outlined">
//                                                         attachment
//                                                     </span>
//                                                 )}
//                                         </div>
//                                     </td>

//                                     <td className={styles.muted}>
//                                         {payment.submitted}
//                                     </td>

//                                     <td>
//                                         <span
//                                             className={`${styles.status} ${styles[
//                                                 payment?.status
//                                                     ?.toLowerCase()
//                                                     .replaceAll(" ", "-")
//                                                 ] || ""
//                                                 }`}
//                                         >
//                                             {payment.status}
//                                         </span>
//                                     </td>

//                                     <td className={styles.action}>
//                                         <button
//                                             type="button"
//                                             onClick={() =>
//                                                 navigate(
//                                                     `/admin/payments/${payment.id}`
//                                                 )
//                                             }
//                                         >
//                                             <span>View</span>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td
//                                     colSpan="8"
//                                     className={styles.empty}
//                                 >
//                                     No payments found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </section>
//     );

// }

// export default PaymentsTable;


import { useNavigate } from "react-router-dom";
import styles from "./PaymentsTable.module.css";

function PaymentsTable({
    payments,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    methodFilter,
    setMethodFilter,
}) {
    const navigate = useNavigate();

    return (
        <section className={styles.card}>
            <div className={styles.toolbar}>
                <div className={styles.searchWrapper}>
                    <span className="material-symbols-outlined">
                        search
                    </span>

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search applicant or reference..."
                    />
                </div>

                <div className={styles.filters}>
                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                    >
                        <option value="">
                            All Statuses
                        </option>

                        <option value="paid">
                            Verified
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="pending_verification">
                            Pending Verification
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>

                        <option value="failed">
                            Failed
                        </option>
                    </select>

                    <select
                        value={methodFilter}
                        onChange={(event) =>
                            setMethodFilter(event.target.value)
                        }
                    >
                        <option value="">
                            All Payment Methods
                        </option>

                        <option value="card">
                            Card
                        </option>

                        <option value="mobile">
                            Mobile Money
                        </option>

                        <option value="manual">
                            Manual
                        </option>
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Application ID</th>
                            <th>Payment Method</th>
                            <th>Amount</th>
                            <th>Reference</th>
                            <th>Submitted</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className={styles.applicant}>
                                        {payment.applicant}
                                    </td>

                                    <td className={styles.muted}>
                                        {payment.applicationId}
                                    </td>

                                    <td>
                                        <div className={styles.method}>
                                            <span className="material-symbols-outlined">
                                                {payment.icon}
                                            </span>

                                            {payment.method}
                                        </div>
                                    </td>

                                    <td className={styles.amount}>
                                        {payment.amount}
                                    </td>

                                    <td>
                                        <div className={styles.reference}>
                                            {payment.reference}

                                            {payment.proofFilePath && (
                                                <span className="material-symbols-outlined">
                                                    attachment
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    <td className={styles.muted}>
                                        {payment.submitted}
                                    </td>

                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[
                                                payment?.status
                                                    ?.toLowerCase()
                                                    .replaceAll(
                                                        " ",
                                                        "-"
                                                    )
                                                ] || ""
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>

                                    <td className={styles.action}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/payments/${payment.id}`
                                                )
                                            }
                                        >
                                            <span>View</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className={styles.empty}
                                >
                                    No payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
} export default PaymentsTable;