import { useEffect, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { supabase } from "../../../lib/supabase";

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
        (application) => {
            application.status === "pending" ||
                application.status === "submitted"
        }
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
            trend: null,
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

            {/* Statistics */}
            <section className={styles.statsGrid}>
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={styles.statCard}
                    >
                        <div className={styles.statHeader}>
                            <p>{stat.label}</p>

                            <span
                                className={`material-symbols-outlined ${styles[stat.type]}`}
                            >
                                {stat.icon}
                            </span>
                        </div>

                        <h2>{stat.value}</h2>

                        {stat.trend && (
                            <div className={styles.trend}>
                                <span className="material-symbols-outlined">
                                    {stat.trendIcon}
                                </span>

                                <span>{stat.trend}</span>
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* Tables */}
            <section className={styles.tablesGrid}>

                {/* Recent Applications */}
                <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>Recent Applications</h2>

                        <button type="button">
                            View All
                        </button>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Applicant Name</th>
                                    <th>Programme</th>
                                    <th>Intake</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentApplications.map((application) => (
                                    <tr key={application.id}>
                                        <td className={styles.primaryText}>
                                            {application.first_name}{" "}
                                            {application.surname}
                                        </td>

                                        <td>
                                            {application.programme}
                                        </td>

                                        <td>
                                            {application.intake}
                                        </td>

                                        <td>
                                            <span
                                                className={`${styles.status} ${styles[application.status]}`}
                                            >
                                                {application.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Payments */}
                <div className={styles.tableCard}>
                    <div className={styles.tableHeader}>
                        <h2>Recent Payments</h2>

                        <button type="button">
                            View All
                        </button>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Applicant</th>
                                    <th>Amount</th>
                                    <th>Reference</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentPayments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td className={styles.primaryText}>
                                            {payment.applications?.first_name}{" "}
                                            {payment.applications?.surname}
                                        </td>

                                        <td className={styles.amount}>
                                            {payment.amount}
                                        </td>

                                        <td className={styles.reference}>
                                            {payment.payment_reference}
                                        </td>

                                        <td>
                                            <span
                                                className={`${styles.status} ${styles[payment.status]}`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default AdminDashboard;