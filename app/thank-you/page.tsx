import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Thank you — ABC Software Solutions",
  description: "Thanks for reaching out to ABC Software Solutions. We'll be in touch shortly.",
}

export default function ThankYouPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="flex max-w-md flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Thanks — we&apos;ve got it
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Your request is in front of the founders. We&apos;ll review it and get back to you within one
            business day with next steps.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-6 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <a
              href="/#products"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore what we build
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
