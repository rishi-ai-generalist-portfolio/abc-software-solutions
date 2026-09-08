import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { appendLeadToSheet, emailFoundersAboutLead, type Lead } from "@/lib/leads/notify"

const MAX = {
  full_name: 120,
  email: 200,
  company: 160,
  phone: 40,
  interest: 80,
  message: 4000,
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const full_name = clean(body.full_name, MAX.full_name)
  const email = clean(body.email, MAX.email)
  const company = clean(body.company, MAX.company)
  const phone = clean(body.phone, MAX.phone)
  const interest = clean(body.interest, MAX.interest)
  const message = clean(body.message, MAX.message)

  if (!full_name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("business_leads")
    .insert({
      full_name,
      email,
      company: company || null,
      phone: phone || null,
      interest: interest || null,
      message: message || null,
    })
    .select()
    .single()

  if (error || !data) {
    console.log("[v0] lead insert error:", error?.message)
    return NextResponse.json({ error: "Could not save your request. Please try again." }, { status: 500 })
  }

  // Fan out to secondary channels. Failures here must not fail the request —
  // the lead is already safely stored in Supabase.
  const lead = data as Lead
  const [sheet, mail] = await Promise.all([appendLeadToSheet(lead), emailFoundersAboutLead(lead)])

  if (sheet.error) console.log("[v0] sheet append failed:", sheet.error)
  if (mail.error) console.log("[v0] founder email failed:", mail.error)

  return NextResponse.json({ ok: true, id: lead.id })
}
