import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Write<span className="text-emerald-500 text-5xl">.</span> Share<span className="text-emerald-500 text-5xl">.</span> Grow your ideas on{" "}Blog
              <span className="text-emerald-500 text-5xl">r.</span>
            </h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              A minimal blog platform built with Next.js, shadcn/ui and Convex.
              Create posts, read others, and join the conversation.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/blogs">
                <Button size="lg">Explore Blogs</Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline">
                  Create a Post
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs text-muted-foreground">
              <span>•</span>
              <span>Fast</span>
              <span>•</span>
              <span>Simple</span>
              <span>•</span>
              <span>Modern</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-2xs">
            <div className="relative h-90 w-full">
              <Image
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80"
                alt="Writing desk"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-5">
              <p className="text-sm font-medium">Start publishing today</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Draft your first post in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick features */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap gap-6">
          <Card className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shadow-2xs">
            <CardHeader>
              <CardTitle className="text-base">Create posts</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Use a clean editor-style form to publish instantly.
            </CardContent>
          </Card>

          <Card className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shadow-2xs">
            <CardHeader>
              <CardTitle className="text-base">Read & discover</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Browse posts in a simple feed with beautiful cards.
            </CardContent>
          </Card>

          <Card className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shadow-2xs">
            <CardHeader>
              <CardTitle className="text-base">Auth-ready</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Better Auth + Convex integration to secure actions.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}