"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const interests = [
  "Workflow Automation",
  "WhatsApp Marketing",
  "Custom AI Product",
  "Not sure yet",
]

const inputClass =
  "h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"

export function ContactForm() {
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "submitting">("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setStatus("submitting")

    const formData = new FormData(event.currentTarget)
    const payload = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      interest: formData.get("interest"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        setStatus("idle")
        return
      }
      router.push("/thank-you")
    } catch {
      setError("Network error. Please try again.")
      setStatus("idle")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="full_name" className="text-sm font-medium">
            Full name <span className="text-primary">*</span>
          </label>
          <input id="full_name" name="full_name" required maxLength={120} className={inputClass} placeholder="Jane Founder" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Work email <span className="text-primary">*</span>
          </label>
          <input id="email" name="email" type="email" required maxLength={200} className={inputClass} placeholder="jane@company.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company
          </label>
          <input id="company" name="company" maxLength={160} className={inputClass} placeholder="Company Inc." />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input id="phone" name="phone" maxLength={40} className={inputClass} placeholder="+1 555 000 1234" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="interest" className="text-sm font-medium">
          What are you interested in?
        </label>
        <select id="interest" name="interest" defaultValue={interests[0]} className={`${inputClass} appearance-none`}>
          {interests.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={4000}
          className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm leading-relaxed outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="What bottleneck are you trying to remove? What would success look like?"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending…" : "Send request"}
      </button>

      <p className="text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  )
}
