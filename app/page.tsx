import Link from "next/link"
import Image from "next/image"
import { Workflow, MessageSquare, Sparkles, ArrowRight, Check } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const products = [
  {
    icon: Workflow,
    name: "Workflow Automation",
    tagline: "For growing SMBs",
    description:
      "Replace the manual busywork that eats your team's day. We connect your tools and automate quoting, onboarding, invoicing, and follow-ups end to end.",
    image: "/product-automation.png",
    points: ["Connects your existing tools", "No-code triggers & approvals", "Runs 24/7 without oversight"],
  },
  {
    icon: MessageSquare,
    name: "WhatsApp Marketing",
    tagline: "Reach customers where they are",
    description:
      "Launch broadcast campaigns, automated drip sequences, and instant replies on WhatsApp — with delivery analytics that show exactly what converts.",
    image: "/product-whatsapp.png",
    points: ["Broadcasts & segmented lists", "Automated reply flows", "Conversion analytics"],
  },
  {
    icon: Sparkles,
    name: "Custom AI Products",
    tagline: "Built around your business",
    description:
      "From AI assistants to document intelligence and predictive tooling, we design and ship production AI products tailored to how your company actually works.",
    image: "/product-ai.png",
    points: ["Scoped to your workflows", "Production-grade & secure", "Owned by you, end to end"],
  },
]

const reasons = [
  {
    title: "Founder-led delivery",
    body: "You work directly with the people building your product — no account managers, no handoffs, no telephone game.",
  },
  {
    title: "Ship in weeks, not quarters",
    body: "We scope tightly, build in focused sprints, and put working software in front of your customers fast.",
  },
  {
    title: "AI that earns its keep",
    body: "We only ship automation and AI where it removes real cost or unlocks real revenue — measured, not hyped.",
  },
  {
    title: "You own everything",
    body: "Code, data, and infrastructure stay yours. No lock-in, no black boxes, full documentation on handover.",
  },
]

const steps = [
  { n: "01", title: "Discovery call", body: "We map your bottlenecks and agree on the highest-leverage thing to build first." },
  { n: "02", title: "Scoped proposal", body: "A fixed plan with clear deliverables, timeline, and success metrics — no surprises." },
  { n: "03", title: "Build sprints", body: "We ship in focused increments so you see progress every week and steer as we go." },
  { n: "04", title: "Launch & support", body: "We deploy, train your team, and stay on to iterate as your usage grows." },
]

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div className="flex flex-col items-start gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                AI product studio
              </span>
              <h1 className="text-pretty text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                AI tools that quietly run your business
              </h1>
              <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                ABC Software Solutions builds workflow automation, WhatsApp marketing engines, and custom
                AI products for founders who would rather grow than do busywork.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Tell us what you need
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#products"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-card px-6 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  See what we build
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-mono text-xs text-muted-foreground">
                <span>Automation</span>
                <span className="text-border">/</span>
                <span>WhatsApp marketing</span>
                <span className="text-border">/</span>
                <span>Custom AI</span>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5">
                <Image
                  src="/hero-dashboard.png"
                  alt="ABC Software Solutions automation dashboard showing connected workflow nodes and analytics"
                  width={900}
                  height={640}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">What we build</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Three ways we put AI to work for you
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Each product is built to remove a specific, expensive bottleneck — then handed over as
              something your team fully owns.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {products.map((product) => {
              const Icon = product.icon
              return (
                <article
                  key={product.name}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="border-b border-border bg-secondary/40">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} interface preview`}
                      width={600}
                      height={360}
                      className="h-44 w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold leading-tight">{product.name}</h3>
                        <p className="font-mono text-xs text-muted-foreground">{product.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                    <ul className="mt-auto flex flex-col gap-2 pt-2">
                      {product.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 shrink-0 text-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Why us */}
        <section id="why" className="border-y border-border/60 bg-card">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">Why founders pick us</p>
                <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  A studio, not a staffing agency
                </h2>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  We take ownership of outcomes, not tickets. That means fewer meetings, tighter scope,
                  and software that actually gets used.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                {reasons.map((reason) => (
                  <div key={reason.title} className="bg-card p-6">
                    <h3 className="font-semibold">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">How we work</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              From first call to live product
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.n} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
                <span className="font-mono text-sm font-semibold text-primary">{step.n}</span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-14 text-center text-primary-foreground sm:px-14">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Have a bottleneck worth automating?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
              Tell us where your team loses time. We&apos;ll come back with a concrete plan for what to
              build first.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
