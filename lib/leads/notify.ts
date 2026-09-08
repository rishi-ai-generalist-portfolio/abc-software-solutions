import "server-only"
import nodemailer from "nodemailer"
import { google } from "googleapis"

export type Lead = {
  id: string
  full_name: string
  email: string
  company: string | null
  phone: string | null
  interest: string | null
  message: string | null
  created_at: string
}

type ChannelResult = { ok: boolean; skipped?: boolean; error?: string }

/**
 * Appends a lead as a new row to a Google Sheet.
 * Uses a service account. Silently skips (skipped: true) when not configured
 * so the primary flow (Supabase insert) never fails because of missing sheet creds.
 */
export async function appendLeadToSheet(lead: Lead): Promise<ChannelResult> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return { ok: false, skipped: true }
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      // Vercel stores the key with literal \n; convert back to real newlines.
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })
    const sheets = google.sheets({ version: "v4", auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            lead.created_at,
            lead.full_name,
            lead.email,
            lead.company ?? "",
            lead.phone ?? "",
            lead.interest ?? "",
            lead.message ?? "",
            lead.id,
          ],
        ],
      },
    })
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "sheet append failed" }
  }
}

/**
 * Emails the founders about a new lead via SMTP.
 * Silently skips when SMTP is not configured.
 */
export async function emailFoundersAboutLead(lead: Lead): Promise<ChannelResult> {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.LEADS_NOTIFY_EMAILS
  const from = process.env.SMTP_FROM ?? user

  if (!host || !port || !user || !pass || !to || !from) {
    return { ok: false, skipped: true }
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass },
    })

    const rows: [string, string][] = [
      ["Name", lead.full_name],
      ["Email", lead.email],
      ["Company", lead.company ?? "—"],
      ["Phone", lead.phone ?? "—"],
      ["Interested in", lead.interest ?? "—"],
      ["Message", lead.message ?? "—"],
      ["Received", lead.created_at],
    ]

    await transporter.sendMail({
      from,
      to,
      replyTo: lead.email,
      subject: `New lead: ${lead.full_name}${lead.company ? ` (${lead.company})` : ""}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px">
          <h2 style="margin:0 0 12px">New lead from ABC Software Solutions</h2>
          <table style="border-collapse:collapse;width:100%">
            ${rows
              .map(
                ([k, v]) =>
                  `<tr>
                     <td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f8fafc;white-space:nowrap">${k}</td>
                     <td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(v)}</td>
                   </tr>`,
              )
              .join("")}
          </table>
        </div>`,
    })
    return { ok: true }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "email send failed" }
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
