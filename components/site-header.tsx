import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
            A
          </span>
          <span className="text-sm font-semibold tracking-tight">
            ABC Software Solutions
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#products" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Products
          </a>
          <a href="/#why" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Why us
          </a>
          <a href="/#process" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How we work
          </a>
        </nav>

        <Link
          href="/contact"
          className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Book a call
        </Link>
      </div>
    </header>
  )
}
