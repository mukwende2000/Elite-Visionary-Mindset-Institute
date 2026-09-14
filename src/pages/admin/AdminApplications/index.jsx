// import { useEffect, useState } from "react";
// import styles from "./AdminApplications.module.css";
// import ApplicationStats from "./components/ApplicationStats";
// import ApplicationsTable from "./components/ApplicationsTable";
// import { supabase } from "../../../lib/supabase";

// function AdminApplications() {
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [intakeFilter, setIntakeFilter] = useState("all");
//     const [search, setSearch] = useState("");
//     const [applications, setApplications] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState("")

//     useEffect(() => {
//         const loadApplications = async () => {
//             setLoading(true);
//             setError("");

//             const { data, error } = await supabase
//                 .from("applications")
//                 .select("*")
//                 .order("created_at", { ascending: false });

//             if (error) {
//                 console.error("Failed to load applications:", error);
//                 setError("Could not load applications.");
//             } else {
//                 setApplications(data || []);
//             }

//             setLoading(false);
//         };

//         loadApplications();
//     }, []);

//     const formattedApplications = applications.map((application) => ({
//         id: application.id,
//         name: `${application.first_name} ${application.surname}`,
//         email: application.email,
//         programme: application.programme,
//         intake: application.intake,
//         submitted: application.created_at,
//         status: application.status,
//     }));
//     console.log(applications)
//     const stats = [
//         {
//             label: "Total Applications",
//             value: applications.length,
//             icon: "folder_open",
//             type: "total",
//         },
//         {
//             label: "Pending Review",
//             value: applications.filter(
//                 (application) => application.status === "submitted"
//             ).length,
//             icon: "pending_actions",
//             type: "pending",
//         },
//         {
//             label: "Approved",
//             value: applications.filter(
//                 (application) => application.status === "approved"
//             ).length,
//             icon: "check_circle",
//             type: "approved",
//         },
//         {
//             label: "Rejected",
//             value: applications.filter(
//                 (application) => application.status === "rejected"
//             ).length,
//             icon: "cancel",
//             type: "rejected",
//         },
//     ];


//     return (
//         <div className={styles.page}>
//             <header className={styles.pageHeader}>
//                 <h1>Applications</h1>
//                 <p>
//                     Review and manage submitted applications.
//                 </p>
//             </header>

//             <ApplicationStats stats={stats} />

//             <ApplicationsTable
//                 applications={formattedApplications}
//                 search={search}
//                 setSearch={setSearch}
//                 statusFilter={statusFilter}
//                 setStatusFilter={setStatusFilter}
//                 intakeFilter={intakeFilter}
//                 setIntakeFilter={setIntakeFilter}
//             />
//         </div>
//     );
// }

// export default AdminApplications;

import {
    useEffect,
    useMemo,
    useState,
} from "react";
import styles from "./AdminApplications.module.css";
import ApplicationStats from "./components/ApplicationStats";
import ApplicationsTable from "./components/ApplicationsTable";
import Pagination from "../Pagination";
import { supabase } from "../../../lib/supabase";

function AdminApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [intakeFilter, setIntakeFilter] = useState("");
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        const loadApplications = async () => {
            setLoading(true);
            setError("");

            const { data, error } = await supabase
                .from("applications")
                .select("*")
                .order("created_at", {
                    ascending: false,
                });

            if (error) {
                console.error(
                    "Failed to load applications:",
                    error
                );

                setError(
                    "Could not load applications."
                );
                setApplications([]);
            } else {
                setApplications(data || []);
            }

            setLoading(false);
        };

        loadApplications();
    }, []);

    const formattedApplications = useMemo(() => {
        return applications.map((application) => ({
            id: application.id,
            name: [
                application.first_name,
                application.other_names,
                application.surname,
            ]
                .filter(Boolean)
                .join(" "),
            email: application.email,
            programme: application.programme,
            intake: application.intake,
            submitted: application.created_at,
            status: application.status,
        }));
    }, [applications]);

    const filteredApplications = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return formattedApplications.filter(
            (application) => {
                const matchesSearch =
                    !normalizedSearch ||
                    application.name
                        ?.toLowerCase()
                        .includes(normalizedSearch) ||
                    application.email
                        ?.toLowerCase()
                        .includes(normalizedSearch) ||
                    application.programme
                        ?.toLowerCase()
                        .includes(normalizedSearch) ||
                    application.intake
                        ?.toLowerCase()
                        .includes(normalizedSearch);

                const matchesStatus =
                    statusFilter === "" ||
                    application.status ===
                    statusFilter;

                const matchesIntake =
                    intakeFilter === "" ||
                    application.intake ===
                    intakeFilter;

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesIntake
                );
            }
        );
    }, [
        formattedApplications,
        search,
        statusFilter,
        intakeFilter,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredApplications.length /
            itemsPerPage
        )
    );

    const paginatedApplications = useMemo(() => {
        const start =
            (page - 1) * itemsPerPage;

        return filteredApplications.slice(
            start,
            start + itemsPerPage
        );
    }, [filteredApplications, page]);

    useEffect(() => {
        setPage(1);
    }, [
        search,
        statusFilter,
        intakeFilter,
    ]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const intakeOptions = useMemo(() => {
        return [
            ...new Set(
                applications
                    .map(
                        (application) =>
                            application.intake
                    )
                    .filter(Boolean)
            ),
        ];
    }, [applications]);

    const stats = useMemo(() => {
        const pending =
            applications.filter(
                (application) =>
                    application.status ===
                    "submitted"
            ).length;

        const approved =
            applications.filter(
                (application) =>
                    application.status ===
                    "approved"
            ).length;

        const rejected =
            applications.filter(
                (application) =>
                    application.status ===
                    "rejected"
            ).length;

        return [
            {
                label: "Total Applications",
                value: applications.length,
                icon: "folder_open",
                type: "total",
            },
            {
                label: "Pending Review",
                value: pending,
                icon: "pending_actions",
                type: "pending",
            },
            {
                label: "Approved",
                value: approved,
                icon: "check_circle",
                type: "approved",
            },
            {
                label: "Rejected",
                value: rejected,
                icon: "cancel",
                type: "rejected",
            },
        ];
    }, [applications]);

    return (
        <div className={styles.page}>
            <header
                className={styles.pageHeader}
            >
                <h1>Applications</h1>

                <p>
                    Review and manage submitted
                    applications.
                </p>
            </header>

            <ApplicationStats stats={stats} />

            {loading && (
                <div className={styles.message}>
                    Loading applications...
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
                    <ApplicationsTable
                        applications={
                            paginatedApplications
                        }
                        search={search}
                        setSearch={setSearch}
                        statusFilter={
                            statusFilter
                        }
                        setStatusFilter={
                            setStatusFilter
                        }
                        intakeFilter={
                            intakeFilter
                        }
                        setIntakeFilter={
                            setIntakeFilter
                        }
                        intakeOptions={
                            intakeOptions
                        }
                    />

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        totalItems={
                            filteredApplications.length
                        }
                        itemsPerPage={
                            itemsPerPage
                        }
                        setPage={setPage}
                    />
                </div>
            )}
        </div>
    );

}

export default AdminApplications;