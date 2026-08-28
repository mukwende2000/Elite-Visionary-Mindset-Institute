import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import styles from "./AdminApplicationDetails.module.css";

import ApplicationHeader from "./components/ApplicationHeader";
import ApplicationPersonalInfo from "./components/ApplicationPersonalInfo";
import ApplicationAcademicInfo from "./components/ApplicationAcademicInfo";
import ApplicationEmergencyInfo from "./components/ApplicationEmergencyInfo";
import ApplicationAdditionalInfo from "./components/ApplicationAdditionalInfo";
import ApplicationDecision from "./components/ApplicationDecision";
import ApplicationNotes from "./components/ApplicationNotes";

function AdminApplicationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    const [payment, setPayment] = useState(null);

    useEffect(() => {
        const fetchApplication = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("applications")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Failed to load application:", error);
            } else {
                setApplication(data);

                const { data: paymentData, error: paymentError } =
                    await supabase
                        .from("payments")
                        .select("*")
                        .eq("application_id", data.id)
                        .order("created_at", { ascending: false })
                        .limit(1)
                        .maybeSingle();

                if (paymentError) {
                    console.error(
                        "Failed to load payment:",
                        paymentError
                    );
                } else {
                    setPayment(paymentData);
                }
            }

            setLoading(false);
        };

        fetchApplication();
    }, [id]);

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <p>Loading application...</p>
                </div>
            </main>
        );
    }

    if (!application) {
        return (
            <main className={styles.page}>
                <div className={styles.container}>
                    <p>Application not found.</p>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/applications")}
                    >
                        Back to Applications
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <div className={styles.container}>

                <div className={styles.backRow}>
                    <button
                        type="button"
                        className={styles.backButton}
                        onClick={() => navigate("/admin/applications")}
                    >
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                        Back to Applications
                    </button>
                </div>

                <ApplicationHeader application={application} />

                <div className={styles.contentGrid}>

                    <div className={styles.mainColumn}>
                        <ApplicationPersonalInfo
                            application={application}
                        />

                        <ApplicationAcademicInfo
                            application={application}
                        />

                        <ApplicationEmergencyInfo
                            application={application}
                        />

                        <ApplicationAdditionalInfo
                            application={application}
                        />
                    </div>

                    <aside className={styles.sidebar}>
                        <ApplicationDecision
                            application={application}
                            setApplication={setApplication}
                            payment={payment}
                        />

                        <ApplicationNotes
                            applicationId={application.id}
                        />
                    </aside>

                </div>

                <div className={styles.bottomSpace} />
            </div>
        </main>
    );
}

export default AdminApplicationDetails;
