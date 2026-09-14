// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./ApplicationsTable.module.css";

// function ApplicationsTable({
//     applications,
//     search,
//     setSearch,
//     statusFilter,
//     setStatusFilter,
//     intakeFilter,
//     setIntakeFilter,
// }) {
//     const navigate = useNavigate();

//     const ITEMS_PER_PAGE = 10;

//     const [currentPage, setCurrentPage] = useState(1);

//     /*
//      * Filter applications
//      */
//     const filteredApplications = useMemo(() => {
//         const normalizedSearch = search.trim().toLowerCase();

//         return applications.filter((application) => {
//             const name =
//                 application?.name?.toLowerCase() || "";

//             const email =
//                 application?.email?.toLowerCase() || "";

//             const status =
//                 application?.status?.toLowerCase() || "";

//             const matchesSearch =
//                 name.includes(normalizedSearch) ||
//                 email.includes(normalizedSearch);

//             const matchesStatus =
//                 statusFilter === "all" ||
//                 status === statusFilter;

//             const matchesIntake =
//                 intakeFilter === "all" ||
//                 application?.intake === intakeFilter;

//             return (
//                 matchesSearch &&
//                 matchesStatus &&
//                 matchesIntake
//             );
//         });
//     }, [
//         applications,
//         search,
//         statusFilter,
//         intakeFilter,
//     ]);

//     /*
//      * Pagination calculations
//      */
//     const totalPages = Math.ceil(
//         filteredApplications.length / ITEMS_PER_PAGE
//     );

//     const startIndex =
//         (currentPage - 1) * ITEMS_PER_PAGE;

//     const endIndex =
//         startIndex + ITEMS_PER_PAGE;

//     const currentApplications =
//         filteredApplications.slice(
//             startIndex,
//             endIndex
//         );

//     /*
//      * Reset to page 1 whenever
//      * search or filters change.
//      */
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [search, statusFilter, intakeFilter]);

//     /*
//      * If the current page becomes invalid
//      * after deleting/filtering records,
//      * move back to the last available page.
//      */
//     useEffect(() => {
//         if (
//             totalPages > 0 &&
//             currentPage > totalPages
//         ) {
//             setCurrentPage(totalPages);
//         }
//     }, [currentPage, totalPages]);

//     /*
//      * Generate page numbers dynamically.
//      */
//     const pageNumbers = Array.from(
//         { length: totalPages },
//         (_, index) => index + 1
//     );

//     /*
//      * Intake options
//      */
//     const intakeOptions = [
//         ...new Set(
//             applications
//                 .map((application) => application?.intake)
//                 .filter(Boolean)
//         ),
//     ];

//     /*
//      * Pagination handlers
//      */
//     const goToPreviousPage = () => {
//         setCurrentPage((page) =>
//             Math.max(page - 1, 1)
//         );
//     };

//     const goToNextPage = () => {
//         setCurrentPage((page) =>
//             Math.min(page + 1, totalPages)
//         );
//     };

//     const goToPage = (page) => {
//         setCurrentPage(page);
//     };

//     /*
//      * Entry range for pagination text
//      */
//     const showingFrom =
//         filteredApplications.length === 0
//             ? 0
//             : startIndex + 1;

//     const showingTo = Math.min(
//         endIndex,
//         filteredApplications.length
//     );

//     return (
//         <section className={styles.tableCard}>
//             <div className={styles.toolbar}>
//                 <div className={styles.searchBox}>
//                     <span className="material-symbols-outlined">
//                         search
//                     </span>

//                     <input
//                         type="text"
//                         value={search}
//                         onChange={(event) =>
//                             setSearch(event.target.value)
//                         }
//                         placeholder="Search applicants..."
//                     />
//                 </div>

//                 <div className={styles.filters}>
//                     <select
//                         value={statusFilter}
//                         onChange={(event) =>
//                             setStatusFilter(event.target.value)
//                         }
//                     >
//                         <option value="all">
//                             All Statuses
//                         </option>

//                         <option value="submitted">
//                             Pending
//                         </option>

//                         <option value="approved">
//                             Approved
//                         </option>

//                         <option value="rejected">
//                             Rejected
//                         </option>
//                     </select>

//                     <select
//                         value={intakeFilter}
//                         onChange={(event) =>
//                             setIntakeFilter(event.target.value)
//                         }
//                     >
//                         <option value="all">
//                             All Intakes
//                         </option>

//                         {intakeOptions.map((intake) => (
//                             <option
//                                 key={intake}
//                                 value={intake}
//                             >
//                                 {intake}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             <div className={styles.tableWrapper}>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Applicant Name</th>
//                             <th>Email</th>
//                             <th>Programme</th>
//                             <th>Intake</th>
//                             <th>Submitted</th>
//                             <th>Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {currentApplications.length > 0 ? (
//                             currentApplications.map(
//                                 (application) => (
//                                     <tr
//                                         key={
//                                             application.id
//                                         }
//                                     >
//                                         <td
//                                             className={
//                                                 styles.applicantName
//                                             }
//                                         >
//                                             {
//                                                 application.name
//                                             }
//                                         </td>

//                                         <td
//                                             className={
//                                                 styles.muted
//                                             }
//                                         >
//                                             {
//                                                 application.email
//                                             }
//                                         </td>

//                                         <td>
//                                             {
//                                                 application.programme
//                                             }
//                                         </td>

//                                         <td>
//                                             {
//                                                 application.intake
//                                             }
//                                         </td>

//                                         <td
//                                             className={
//                                                 styles.muted
//                                             }
//                                         >
//                                             {
//                                                 application.submitted
//                                             }
//                                         </td>

//                                         <td>
//                                             <span
//                                                 className={`${styles.status} ${styles[
//                                                     application?.status
//                                                         ?.toLowerCase()
//                                                     ] || ""
//                                                     }`}
//                                             >
//                                                 {
//                                                     application.status
//                                                 }
//                                             </span>
//                                         </td>

//                                         <td>
//                                             <button
//                                                 type="button"
//                                                 className={
//                                                     styles.viewButton
//                                                 }
//                                                 onClick={() =>
//                                                     navigate(
//                                                         `/admin/applications/${application.id}`
//                                                     )
//                                                 }
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 )
//                             )
//                         ) : (
//                             <tr>
//                                 <td
//                                     colSpan="7"
//                                     className={
//                                         styles.emptyState
//                                     }
//                                 >
//                                     No applications found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className={styles.pagination}>
//                 <span>
//                     Showing {showingFrom}–{showingTo} of{" "}
//                     {filteredApplications.length} entries
//                 </span>

//                 {totalPages > 1 && (
//                     <div
//                         className={
//                             styles.paginationButtons
//                         }
//                     >
//                         <button
//                             type="button"
//                             onClick={
//                                 goToPreviousPage
//                             }
//                             disabled={currentPage === 1}
//                         >
//                             Previous
//                         </button>

//                         {pageNumbers.map((page) => (
//                             <button
//                                 key={page}
//                                 type="button"
//                                 className={
//                                     currentPage === page
//                                         ? styles.activePage
//                                         : ""
//                                 }
//                                 onClick={() =>
//                                     goToPage(page)
//                                 }
//                             >
//                                 {page}
//                             </button>
//                         ))}

//                         <button
//                             type="button"
//                             onClick={goToNextPage}
//                             disabled={
//                                 currentPage === totalPages
//                             }
//                         >
//                             Next
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

// export default ApplicationsTable;


import { useNavigate } from "react-router-dom";
import styles from "./ApplicationsTable.module.css";

function ApplicationsTable({
    applications,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    intakeFilter,
    setIntakeFilter,
    intakeOptions,
}) {
    const navigate = useNavigate();

    return (
        <section className={styles.tableCard}>
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <span className="material-symbols-outlined">
                        search
                    </span>

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search applicants..."
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

                        <option value="submitted">
                            Pending
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>
                    </select>

                    <select
                        value={intakeFilter}
                        onChange={(event) =>
                            setIntakeFilter(event.target.value)
                        }
                    >
                        <option value="">
                            All Intakes
                        </option>

                        {intakeOptions.map((intake) => (
                            <option
                                key={intake}
                                value={intake}
                            >
                                {intake}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Programme</th>
                            <th>Intake</th>
                            <th>Submitted</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <tr key={application.id}>
                                    <td
                                        className={
                                            styles.applicantName
                                        }
                                    >
                                        {application.name}
                                    </td>

                                    <td className={styles.muted}>
                                        {application.email}
                                    </td>

                                    <td>
                                        {application.programme}
                                    </td>

                                    <td>
                                        {application.intake}
                                    </td>

                                    <td className={styles.muted}>
                                        {application.submitted}
                                    </td>

                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[
                                                application?.status
                                                    ?.toLowerCase()
                                            ] || ""
                                                }`}
                                        >
                                            {application.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className={
                                                styles.viewButton
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/admin/applications/${application.id}`
                                                )
                                            }
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className={
                                        styles.emptyState
                                    }
                                >
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ApplicationsTable;