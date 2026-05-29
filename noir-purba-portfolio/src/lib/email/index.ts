import { Resend } from "resend";
import type { Submission } from "@/types";

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@noir-purba.com";
const ADMIN = process.env.ADMIN_EMAIL ?? "noir.purba@unpad.ac.id";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://noir-purba.com";

function baseTemplate(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body{margin:0;padding:0;background:#0a1628;font-family:Inter,system-ui,sans-serif;color:#e2e8f0}
    .wrap{max-width:560px;margin:32px auto;background:#0d2038;border-radius:16px;border:1px solid #1a3a5c;overflow:hidden}
    .header{background:linear-gradient(135deg,#0d2038,#112743);padding:28px 32px;border-bottom:1px solid #1a3a5c}
    .logo{font-size:13px;font-family:monospace;color:#00b4d8;letter-spacing:0.15em;text-transform:uppercase}
    .title{margin:8px 0 0;font-size:20px;font-weight:700;color:#fff}
    .body{padding:28px 32px}
    .p{font-size:14px;line-height:1.7;color:#94a3b8;margin:0 0 16px}
    .chip{display:inline-block;background:rgba(0,180,216,0.12);color:#48cae4;border:1px solid rgba(0,180,216,0.25);border-radius:6px;padding:2px 10px;font-size:11px;font-family:monospace;font-weight:600}
    .field{margin:0 0 12px;padding:12px 14px;background:#112743;border-radius:10px;border:1px solid #1a3a5c}
    .field-label{font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#475569;margin-bottom:4px}
    .field-value{font-size:13px;color:#e2e8f0}
    .btn{display:inline-block;background:#00b4d8;color:#020d1a;font-size:13px;font-weight:700;padding:12px 24px;border-radius:10px;text-decoration:none;margin-top:8px}
    .footer{padding:16px 32px;border-top:1px solid #1a3a5c;font-size:11px;color:#334155;text-align:center}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">Noir P. Purba · Academic Portal</div>
      <div class="title">${title}</div>
    </div>
    <div class="body">${body}</div>
    <div class="footer">Sent automatically by the academic portal system · ${SITE}</div>
  </div>
</body>
</html>`;
}

export async function sendSubmissionReceived(sub: Submission): Promise<void> {
  const typeLabel: Record<string, string> = {
    bimbingan: "Thesis Supervision",
    judul: "Title Proposal",
    magang: "Internship Application",
  };

  const studentBody = `
<p class="p">Hello <strong style="color:#fff">${sub.student_name}</strong>,</p>
<p class="p">Your <span class="chip">${typeLabel[sub.type]}</span> request has been received and is currently under review.</p>
<div class="field"><div class="field-label">Subject</div><div class="field-value">${sub.subject}</div></div>
<div class="field"><div class="field-label">Student ID</div><div class="field-value">${sub.student_nim}</div></div>
<div class="field"><div class="field-label">Study Program</div><div class="field-value">${sub.study_program}</div></div>
<p class="p">You will receive a notification at this email address once your submission has been reviewed. Estimated response time is 1 to 3 business days.</p>
<p class="p" style="color:#64748b;font-size:12px">Your submission reference: <code style="color:#48cae4">${sub.id.slice(0, 8).toUpperCase()}</code></p>`;

  const adminBody = `
<p class="p">A new submission has been received from <strong style="color:#fff">${sub.student_name}</strong> (${sub.student_nim}).</p>
<div class="field"><div class="field-label">Type</div><div class="field-value"><span class="chip">${typeLabel[sub.type]}</span></div></div>
<div class="field"><div class="field-label">Subject</div><div class="field-value">${sub.subject}</div></div>
<div class="field"><div class="field-label">Student Email</div><div class="field-value">${sub.student_email}</div></div>
${sub.description ? `<div class="field"><div class="field-label">Notes</div><div class="field-value">${sub.description}</div></div>` : ""}
<a class="btn" href="${SITE}/admin/dashboard/submissions">Review in Dashboard</a>`;

  await Promise.all([
    getResend().emails.send({
      from: FROM,
      to: sub.student_email,
      subject: `Your ${typeLabel[sub.type]} Request Has Been Received`,
      html: baseTemplate(`${typeLabel[sub.type]} Received`, studentBody),
    }),
    getResend().emails.send({
      from: FROM,
      to: ADMIN,
      subject: `[New Submission] ${typeLabel[sub.type]} from ${sub.student_name}`,
      html: baseTemplate("New Submission Received", adminBody),
    }),
  ]);
}

export async function sendSubmissionUpdated(sub: Submission): Promise<void> {
  const STATUS_LABEL: Record<string, string> = {
    approved: "Approved",
    denied: "Not Approved",
    revision: "Revision Required",
  };

  const STATUS_COLOR: Record<string, string> = {
    approved: "#10b981",
    denied: "#ef4444",
    revision: "#3b82f6",
  };

  const label = STATUS_LABEL[sub.status] ?? sub.status;
  const color = STATUS_COLOR[sub.status] ?? "#94a3b8";

  const body = `
<p class="p">Hello <strong style="color:#fff">${sub.student_name}</strong>,</p>
<p class="p">The status of your submission has been updated.</p>
<div class="field">
  <div class="field-label">Current Status</div>
  <div class="field-value" style="color:${color};font-weight:700;font-size:15px">${label}</div>
</div>
<div class="field"><div class="field-label">Subject</div><div class="field-value">${sub.subject}</div></div>
${sub.admin_notes ? `<div class="field"><div class="field-label">Lecturer's Notes</div><div class="field-value">${sub.admin_notes}</div></div>` : ""}
<p class="p">${
    sub.status === "approved"
      ? "Congratulations — your submission has been approved. Please contact the lecturer directly to discuss the next steps."
      : sub.status === "revision"
        ? "Please review the lecturer's notes carefully and resubmit after making the requested revisions."
        : "Unfortunately, your submission could not be approved at this time. Please contact the lecturer for further guidance."
  }</p>
<a class="btn" href="mailto:${ADMIN}">Contact the Lecturer</a>`;

  await getResend().emails.send({
    from: FROM,
    to: sub.student_email,
    subject: `Submission Status Update: ${label}`,
    html: baseTemplate(`Submission Status: ${label}`, body),
  });
}

export async function sendMorningDigest(
  pendingCount: number,
  todayConsultations: {
    student_name: string;
    type: string;
    scheduled_at: string;
  }[],
): Promise<void> {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const consultRows =
    todayConsultations.length > 0
      ? todayConsultations
          .map((c) => {
            const time = new Date(c.scheduled_at).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return `<div class="field"><div class="field-label">${time} WIB · ${c.type}</div><div class="field-value">${c.student_name}</div></div>`;
          })
          .join("")
      : '<p class="p" style="color:#475569">No sessions scheduled for today.</p>';

  const body = `
<p class="p">Good morning. Here is your academic activity summary for <strong style="color:#fff">${dateStr}</strong>.</p>
<div style="margin-bottom:20px">
  <div class="field-label" style="margin-bottom:8px">Submissions Awaiting Review</div>
  <div style="font-size:32px;font-weight:800;color:#00b4d8;font-family:monospace">${pendingCount}</div>
  ${pendingCount > 0 ? `<a class="btn" style="margin-top:8px;font-size:12px;padding:8px 18px" href="${SITE}/admin/dashboard/submissions">Review Now</a>` : ""}
</div>
<div class="field-label" style="margin-bottom:8px">Today's Consultations</div>
${consultRows}`;

  await getResend().emails.send({
    from: FROM,
    to: ADMIN,
    subject: `[Morning Digest] ${dateStr} · ${pendingCount} submission${pendingCount === 1 ? "" : "s"} pending`,
    html: baseTemplate("Today's Activity Summary", body),
  });
}
