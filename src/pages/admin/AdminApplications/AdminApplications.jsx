import { useState } from "react";
import styles from "./AdminApplications.module.css";
import ApplicationStats from "../../../components/admin/ApplicationStats/ApplicationStats";
import ApplicationsTable from "../../../components/admin/ApplicationsTable/ApplicationsTable";

function AdminApplications() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [intakeFilter, setIntakeFilter] = useState("all");
    const [search, setSearch] = useState("");

    const stats = [
        {
            label: "Total Applications",
            value: "1,248",
            icon: "folder_open",
            type: "total",
        },
        {
            label: "Pending Review",
            value: "85",
            icon: "pending_actions",
            type: "pending",
        },
        {
            label: "Approved",
            value: "942",
            icon: "check_circle",
            type: "approved",
        },
        {
            label: "Rejected",
            value: "121",
            icon: "cancel",
            type: "rejected",
        },
    ];

    const applications = [
        {
            name: "Eleanor Vance",
            email: "e.vance@example.com",
            programme: "Executive MBA",
            intake: "Fall 2024",
            submitted: "Oct 12, 2023",
            status: "Pending",
        },
        {
            name: "Marcus Sterling",
            email: "m.sterling@example.com",
            programme: "Advanced Leadership Cert.",
            intake: "Fall 2024",
            submitted: "Oct 10, 2023",
            status: "Approved",
        },
        {
            name: "Sophia Chen",
            email: "schen.biz@example.com",
            programme: "Executive MBA",
            intake: "Spring 2025",
            submitted: "Oct 08, 2023",
            status: "Pending",
        },
        {
            name: "Julian Bates",
            email: "jbates99@example.com",
            programme: "Data Strategy Seminar",
            intake: "Fall 2024",
            submitted: "Oct 05, 2023",
            status: "Rejected",
        },
        {
            name: "Olivia Thorne",
            email: "olivia.thorne@example.com",
            programme: "Executive MBA",
            intake: "Spring 2025",
            submitted: "Oct 01, 2023",
            status: "Approved",
        },
    ];

    return (
        <div className={styles.page}>
            <header className={styles.pageHeader}>
                <h1>Applications</h1>
                <p>
                    Review and manage submitted applications.
                </p>
            </header>

            <ApplicationStats stats={stats} />

            <ApplicationsTable
                applications={applications}
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                intakeFilter={intakeFilter}
                setIntakeFilter={setIntakeFilter}
            />
        </div>
    );
}

export default AdminApplications;

// import styles from "./AdminApplications.module.css";

// function AdminApplications() {
//     const stats = [
//         {
//             label: "Total Applications",
//             value: "1,248",
//             icon: "folder_open",
//             type: "total",
//         },
//         {
//             label: "Pending Review",
//             value: "85",
//             icon: "pending_actions",
//             type: "pending",
//         },
//         {
//             label: "Approved",
//             value: "942",
//             icon: "check_circle",
//             type: "approved",
//         },
//         {
//             label: "Rejected",
//             value: "121",
//             icon: "cancel",
//             type: "rejected",
//         },
//     ];

//     const applications = [
//         {
//             name: "Eleanor Vance",
//             email: "e.vance@example.com",
//             programme: "Executive MBA",
//             intake: "Fall 2024",
//             submitted: "Oct 12, 2023",
//             status: "Pending",
//         },
//         {
//             name: "Marcus Sterling",
//             email: "m.sterling@example.com",
//             programme: "Advanced Leadership Cert.",
//             intake: "Fall 2024",
//             submitted: "Oct 10, 2023",
//             status: "Approved",
//         },
//         {
//             name: "Sophia Chen",
//             email: "schen.biz@example.com",
//             programme: "Executive MBA",
//             intake: "Spring 2025",
//             submitted: "Oct 08, 2023",
//             status: "Pending",
//         },
//         {
//             name: "Julian Bates",
//             email: "jbates99@example.com",
//             programme: "Data Strategy Seminar",
//             intake: "Fall 2024",
//             submitted: "Oct 05, 2023",
//             status: "Rejected",
//         },
//         {
//             name: "Olivia Thorne",
//             email: "olivia.thorne@example.com",
//             programme: "Executive MBA",
//             intake: "Spring 2025",
//             submitted: "Oct 01, 2023",
//             status: "Approved",
//         },
//     ];

//     return (
//         <div className={styles.page}>

//             {/* Page Header */}
//             <div className={styles.pageHeader}>
//                 <h1>Applications</h1>
//                 <p>Review and manage submitted applications.</p>
//             </div>

//             {/* Summary Cards */}
//             <section className={styles.statsGrid}>
//                 {stats.map((stat) => (
//                     <div key={stat.label} className={styles.statCard}>
//                         <div>
//                             <p>{stat.label}</p>
//                             <h2>{stat.value}</h2>
//                         </div>

//                         <div className={`${styles.statIcon} ${styles[stat.type]}`}>
//                             <span className="material-symbols-outlined">
//                                 {stat.icon}
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </section>

//             {/* Applications Table */}
//             <section className={styles.tableCard}>

//                 {/* Toolbar */}
//                 <div className={styles.toolbar}>
//                     <div className={styles.searchBox}>
//                         <span className="material-symbols-outlined">
//                             search
//                         </span>

//                         <input
//                             type="text"
//                             placeholder="Search applicants..."
//                         />
//                     </div>

//                     <div className={styles.filters}>
//                         <select defaultValue="all">
//                             <option value="all">All Statuses</option>
//                             <option value="pending">Pending</option>
//                             <option value="approved">Approved</option>
//                             <option value="rejected">Rejected</option>
//                         </select>

//                         <select defaultValue="all">
//                             <option value="all">All Intakes</option>
//                             <option value="Fall 2024">Fall 2024</option>
//                             <option value="Spring 2025">Spring 2025</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className={styles.tableWrapper}>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Applicant Name</th>
//                                 <th>Email</th>
//                                 <th>Programme</th>
//                                 <th>Intake</th>
//                                 <th>Submitted</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {applications.map((application) => (
//                                 <tr key={application.email}>
//                                     <td className={styles.applicantName}>
//                                         {application.name}
//                                     </td>

//                                     <td className={styles.muted}>
//                                         {application.email}
//                                     </td>

//                                     <td>
//                                         {application.programme}
//                                     </td>

//                                     <td>
//                                         {application.intake}
//                                     </td>

//                                     <td className={styles.muted}>
//                                         {application.submitted}
//                                     </td>

//                                     <td>
//                                         <span
//                                             className={`${styles.status} ${styles[
//                                                 application.status.toLowerCase()
//                                                 ]
//                                                 }`}
//                                         >
//                                             {application.status}
//                                         </span>
//                                     </td>

//                                     <td>
//                                         <button
//                                             type="button"
//                                             className={styles.viewButton}
//                                         >
//                                             View
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className={styles.pagination}>
//                     <span>
//                         Showing 1 to 5 of 1,248 entries
//                     </span>

//                     <div className={styles.paginationButtons}>
//                         <button type="button" disabled>
//                             Previous
//                         </button>

//                         <button
//                             type="button"
//                             className={styles.activePage}
//                         >
//                             1
//                         </button>

//                         <button type="button">2</button>
//                         <button type="button">3</button>
//                         <button type="button">Next</button>
//                     </div>
//                 </div>

//             </section>
//         </div>
//     );
// }

// export default AdminApplications;