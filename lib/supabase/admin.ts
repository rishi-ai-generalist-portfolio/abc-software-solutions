import { createClient } from "@supabase/supabase-js"

// Service-role client for trusted server-side writes only. This bypasses RLS,
// so it must NEVER be imported into client components or exposed to the browser.
// The contact API route validates and sanitizes all input before using it.
export function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
