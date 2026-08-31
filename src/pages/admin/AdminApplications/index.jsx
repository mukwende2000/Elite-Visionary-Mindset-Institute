import { useEffect, useState } from "react";
import styles from "./AdminApplications.module.css";
import ApplicationStats from "./components/ApplicationStats";
import ApplicationsTable from "./components/ApplicationsTable";
import { supabase } from "../../../lib/supabase";

function AdminApplications() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [intakeFilter, setIntakeFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadApplications = async () => {
            setLoading(true);
            setError("");

            const { data, error } = await supabase
                .from("applications")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Failed to load applications:", error);
                setError("Could not load applications.");
            } else {
                setApplications(data || []);
            }

            setLoading(false);
        };

        loadApplications();
    }, []);

    const formattedApplications = applications.map((application) => ({
        id: application.id,
        name: `${application.first_name} ${application.surname}`,
        email: application.email,
        programme: application.programme,
        intake: application.intake,
        submitted: application.created_at,
        status: application.status,
    }));
    console.log(applications)
    const stats = [
        {
            label: "Total Applications",
            value: applications.length,
            icon: "folder_open",
            type: "total",
        },
        {
            label: "Pending Review",
            value: applications.filter(
                (application) => application.status === "submitted"
            ).length,
            icon: "pending_actions",
            type: "pending",
        },
        {
            label: "Approved",
            value: applications.filter(
                (application) => application.status === "approved"
            ).length,
            icon: "check_circle",
            type: "approved",
        },
        {
            label: "Rejected",
            value: applications.filter(
                (application) => application.status === "rejected"
            ).length,
            icon: "cancel",
            type: "rejected",
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
                applications={formattedApplications}
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
