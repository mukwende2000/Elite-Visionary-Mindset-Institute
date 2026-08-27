import { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { supabase } from "../../../lib/supabase";

import DashboardStatCard from "../../../components/admin/DashboardStatCard/DashboardStatCard";
import RecentApplications from "../../../components/admin/RecentApplications/RecentApplications";
import RecentPayments from "../../../components/admin/RecentPayments/RecentPayments";

function AdminDashboard() {
    const [applications, setApplications] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            setLoading(true);
            setError("");

            try {
                const [
                    { data: applicationsData, error: applicationsError },
                    { data: paymentsData, error: paymentsError },
                ] = await Promise.all([
                    supabase
                        .from("applications")
                        .select("*")
                        .order("created_at", { ascending: false }),

                    supabase
                        .from("payments")
                        .select(`
                            *,
                            applications (
                                first_name,
                                surname
                            )
                        `)
                        .order("created_at", { ascending: false }),
                ]);

                if (applicationsError) {
                    throw applicationsError;
                }

                if (paymentsError) {
                    throw paymentsError;
                }

                setApplications(applicationsData || []);
                setPayments(paymentsData || []);
            } catch (error) {
                console.error("Dashboard loading failed:", error);
                setError("Could not load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        (application) =>
            application.status === "pending" ||
            application.status === "submitted"
    ).length;

    const approvedApplications = applications.filter(
        (application) => application.status === "approved"
    ).length;

    const rejectedApplications = applications.filter(
        (application) => application.status === "rejected"
    ).length;

    const pendingPayments = payments.filter(
        (payment) => payment.status === "pending_verification"
    ).length;

    const stats = [
        {
            label: "Total Apps",
            value: totalApplications,
            icon: "folder",
            type: "total",
        },
        {
            label: "Pending Review",
            value: pendingApplications,
            icon: "hourglass_empty",
            type: "pending",
        },
        {
            label: "Approved",
            value: approvedApplications,
            icon: "check_circle",
            type: "approved",
        },
        {
            label: "Rejected",
            value: rejectedApplications,
            icon: "cancel",
            type: "rejected",
        },
        {
            label: "Payments Pending",
            value: pendingPayments,
            icon: "warning",
            type: "payments",
        },
    ];

    const recentApplications = applications.slice(0, 4);
    const recentPayments = payments.slice(0, 4);

    if (loading) {
        return (
            <div className={styles.dashboard}>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.dashboard}>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <DashboardStatCard stats={stats} />

            <section className={styles.tablesGrid}>
                <RecentApplications
                    applications={recentApplications}
                />

                <RecentPayments
                    payments={recentPayments}
                />
            </section>
        </div>
    );
}

export default AdminDashboard;

