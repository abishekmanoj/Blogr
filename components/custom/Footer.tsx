import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        
        {/* Left */}
        <p>
          © {new Date().getFullYear()} Blog
          <span className="text-emerald-500 font-medium">r</span>. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-6">
          <Link
            href="/blogs"
            className="hover:text-foreground transition-colors"
          >
            Blogs
          </Link>
          <Link
            href="/create"
            className="hover:text-foreground transition-colors"
          >
            Create
          </Link>
        </div>
      </div>
    </footer>
  )
}