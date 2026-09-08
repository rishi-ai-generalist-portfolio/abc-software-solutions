import type { Metadata } from "next"
import { Clock, MapPin, MailCheck } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact — ABC Software Solutions",
  description:
    "Tell ABC Software Solutions about your automation, WhatsApp marketing, or custom AI project and we'll get back with a plan.",
}

const highlights = [
  {
    icon: MailCheck,
    title: "A real reply, fast",
    body: "Your message lands directly with the founders. Expect a response within one business day.",
  },
  {
    icon: Clock,
    title: "No obligation",
    body: "The first call is a scoping conversation, not a sales pitch. You leave with clarity either way.",
  },
  {
    icon: MapPin,
    title: "Remote-first",
    body: "We work with founders wherever they are, across time zones, with async-friendly delivery.",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-24">
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Get in touch</p>
              <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                Let&apos;s build the thing that saves you the most time
              </h1>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Share a little about your business and where you&apos;re losing hours. We&apos;ll come back
                with a concrete plan for what to automate or build first.
              </p>
            </div>

            <ul className="flex flex-col gap-6">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-semibold">{item.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
