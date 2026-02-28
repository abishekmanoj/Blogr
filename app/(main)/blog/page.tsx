import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { Card, CardContent} from "@/components/ui/card"
import BlogCard from "@/components/custom/BlogCard"

export default async function BlogsPage() {
    
  const posts = await fetchQuery(api.posts.getPosts, {})

  return (
    <div className="min-h-screen w-full px-6 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Blogs</h1>
        <p className="text-sm text-muted-foreground">
          Read what others have shared. Fresh ideas, short notes, and deep dives.
        </p>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl">
        {posts.length === 0 ? (
          <Card className="shadow-2xs">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No posts yet. Create your first blog!
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-wrap gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                id={post._id}
                title={post.title}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}