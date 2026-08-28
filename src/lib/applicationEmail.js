import { supabase } from "./supabase";

export async function sendApplicationEmail({
    emailType,
    applicantName,
    applicantEmail,
    applicationId,
}) {
    const { data, error } = await supabase.functions.invoke(
        "send-application-email",
        {
            body: {
                emailType,
                applicantName,
                applicantEmail,
                applicationId,
            },
        }
    );

    if (error) {
        console.error("Application email failed:", error);

        if (error.context) {
            try {
                const errorBody = await error.context.json();
                console.error("Edge Function response:", errorBody);
            } catch {
                console.error(
                    "Could not read Edge Function response body."
                );
            }
        }

        throw error;
    }

    return data;
}
