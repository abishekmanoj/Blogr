"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 items-center justify-between px-6">

        {/* Left - Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Blog<span className="text-2xl text-emerald-500">r</span>
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>

          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blogs
          </Link>

          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </div>

        {/* Right - Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/auth">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/auth">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
