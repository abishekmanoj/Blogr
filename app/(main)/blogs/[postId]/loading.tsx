import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PostLoading() {
  return (
    <div className="min-h-screen w-full px-6 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        {/* Back button placeholder */}
        <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />

        {/* Image placeholder */}
        <div className="h-80 w-full animate-pulse rounded-xl bg-muted" />

        {/* Title */}
        <div className="h-9 w-3/4 animate-pulse rounded bg-muted" />

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>

        {/* Date */}
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />

        <Separator className="my-8" />

        {/* Content */}
        <Card className="shadow-2xs">
          <div className="space-y-3 p-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full animate-pulse rounded bg-muted" />
            ))}
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </Card>

        <Separator className="my-8" />

        {/* Comments section placeholder */}
        <div className="space-y-3">
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-16 w-full animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </div>
  )
}