import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">
            A
          </span>
          <span className="text-sm font-semibold">ABC Software Solutions</span>
        </div>
        <p className="text-sm text-muted-foreground">
          AI-powered products for teams that want to move faster.
        </p>
        <Link
          href="/contact"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Start a project →
        </Link>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ABC Software Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
