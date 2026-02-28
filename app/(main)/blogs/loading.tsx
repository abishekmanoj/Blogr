import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const LoadingBlog = () => {
    return (
      <div className="min-h-screen w-full px-6 py-10">
        <div className="mx-auto w-full max-w-6xl space-y-2">
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-6xl flex-wrap gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shadow-2xs"
            >
              {/* Image Skeleton */}
              <div className="h-44 w-full animate-pulse bg-muted" />

              <CardHeader className="space-y-3">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
              </CardHeader>

              <CardContent />
            </Card>
          ))}
        </div>
    </div>
  )
}

export default LoadingBlog
