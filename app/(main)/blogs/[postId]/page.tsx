
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { Separator } from "@/components/ui/separator"
import CommentSection from "@/components/custom/CommentSection"
import PostPresence from "@/components/custom/PostPresence"
import { getToken } from "@/lib/auth-server"

interface PageProps {
  params: Promise<{
    postId: Id<'posts'>
  }>
}
 
export default async function PostPage({ params }: PageProps) {

    const { postId } = await params
    const token = await getToken()

    const post = await fetchQuery(api.posts.getPostById, { postId})
    const userId = await fetchQuery(api.presence.getUserId, {}, { token })

    if (!userId) {
        return redirect('/auth')
    }

    if (!post) {
        return notFound()
    }


    const imageSrc = post.imageUrl || "https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4"

    return (
        <div className="min-h-screen w-full px-6 py-10">
            <div className="mx-auto w-full max-w-4xl space-y-6">
                
                {/* Back Button */}
                <Link href="/blogs">
                    <Button variant="outline" className="gap-2 pl-0 mb-5">
                        <ArrowLeft className="size-4" />
                        Back to Blogs
                    </Button>
                </Link>

                {/* Image */}
                {post.imageUrl && (
                <div className="relative h-80 w-full overflow-hidden rounded-xl">
                    <Image
                        src={String(imageSrc)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        />
                </div>
                )}

                {/* Title */}
                <h1 className="text-3xl font-semibold tracking-tight">
                    {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-white text-md">
                    {post.excerpt}
                </p>

                {/* Posted On and Online list */}
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Posted on: {new Date(post._creationTime).toLocaleDateString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric'})}
                    </p>

                    {userId && <PostPresence roomId={postId} userId={userId} />}
                </div>

                <Separator className="my-8" />

                {/* Content */}
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>{post.content}</p>
                </div>

                <Separator className="my-8" />

                <CommentSection />
                
            </div>

        </div>
    )
    }