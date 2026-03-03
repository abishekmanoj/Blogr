import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { Separator } from "@/components/ui/separator"
import CommentSection from "@/components/custom/CommentSection"

interface PageProps {
  params: Promise<{
    postId: Id<'posts'>
  }>
}

export default async function PostPage({ params }: PageProps) {

    const { postId } = await params

    const post = await fetchQuery(api.posts.getPostById, { postId})

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

                {/* Posted On */}
                <p className="text-sm text-muted-foreground">
                    Posted on: {new Date(post._creationTime).toLocaleDateString(undefined, {day: 'numeric', month: 'numeric', year: 'numeric'})}
                </p>

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