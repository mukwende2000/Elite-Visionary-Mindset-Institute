import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

export default {
  fetch: withSupabase(
    { auth: ["publishable", "secret"] },
    async (req, ctx) => {
      if (req.method !== "POST") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 }
        );
      }

      try {
        const {
          emailType,
          applicantName,
          applicantEmail,
          applicationId,
        } = await req.json();

        if (
          !emailType ||
          !applicantName ||
          !applicantEmail ||
          !applicationId
        ) {
          return Response.json(
            {
              error:
                "emailType, applicantName, applicantEmail and applicationId are required.",
            },
            { status: 400 }
          );
        }

        if (!RESEND_API_KEY) {
          console.error("RESEND_API_KEY is not configured.");

          return Response.json(
            { error: "Email service is not configured." },
            { status: 500 }
          );
        }

        let subject;
        let html;

        if (emailType === "application_submitted") {
          subject = "Application Received — Under Review";

          html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #041632;">
              <h2>Application Received</h2>

              <p>Dear ${applicantName},</p>

              <p>
                Thank you for submitting your application to
                <strong>Elite Visionary Mindset Institute</strong>.
              </p>

              <p>
                We have received your application and payment successfully.
                Your application is now <strong>under review</strong>.
              </p>

              <p>
                <strong>Application ID:</strong> ${applicationId}
              </p>

              <p>
                Our admissions team will review your application and
                notify you once a decision has been made.
              </p>

              <p>
                Kind regards,<br />
                <strong>Admissions Team</strong><br />
                Elite Visionary Mindset Institute
              </p>
            </div>
          `;
        }

        if (emailType === "application_approved") {
          subject = "Application Approved — Elite Visionary Mindset Institute";

          html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #041632;">
              <h2>Congratulations! Your Application Has Been Approved</h2>

              <p>Dear ${applicantName},</p>

              <p>
                We are pleased to inform you that your application to
                <strong>Elite Visionary Mindset Institute</strong>
                has been <strong>approved</strong>.
              </p>

              <p>
                <strong>Application ID:</strong> ${applicationId}
              </p>

              <p>
                Congratulations on your successful application.
                We look forward to welcoming you to the institute.
              </p>

              <p>
                Further information regarding your programme and
                enrolment will be provided to you shortly.
              </p>

              <p>
                Kind regards,<br />
                <strong>Admissions Team</strong><br />
                Elite Visionary Mindset Institute
              </p>
            </div>
          `;
        }

        if (!subject || !html) {
          return Response.json(
            { error: "Invalid emailType." },
            { status: 400 }
          );
        }

        const response = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Elite Visionary Mindset Institute <onboarding@resend.dev>",
              to: [applicantEmail],
              subject,
              html,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error("Resend error:", result);

          return Response.json(
            {
              error: "Failed to send email.",
              details: result,
            },
            { status: 500 }
          );
        }

        console.log("Email sent:", result);

        return Response.json({
          success: true,
          message: "Email sent successfully.",
          emailId: result.id,
        });
      } catch (error) {
        console.error("Email function error:", error);

        return Response.json(
          {
            error: "Unexpected error while sending email.",
          },
          { status: 500 }
        );
      }
    }
  ),
};