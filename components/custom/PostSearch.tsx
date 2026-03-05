"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"

export default function PostSearch() {
  const [term, setTerm] = useState("")
  const [debounced, setDebounced] = useState("")


  useEffect(() => {
    const t = setTimeout(() => setDebounced(term.trim()), 300)
    return () => clearTimeout(t)
  }, [term])

  const results = useQuery(
    api.posts.searchPosts,
    debounced.length >= 2 ? { term: debounced, limit: 8 } : "skip"
  )

  const showDropdown = debounced.length >= 2 && (results?.length ?? 0) > 0

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search blog posts (title or content)..."
          className="pl-9"
        />
      </div>

      {showDropdown && (
        <Card className="absolute z-50 mt-2 w-full overflow-hidden shadow-2xs">
          <div className="max-h-80 overflow-auto">
            {results!.map((post) => (
              <Link
                key={post._id}
                href={`/blogs/${post._id}`}
                className="block border-b px-4 py-3 last:border-b-0 hover:bg-muted/50"
              >
                <p className="text-sm font-medium line-clamp-1">{post.title}</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}