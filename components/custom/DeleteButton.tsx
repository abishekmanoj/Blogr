"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTransition } from "react"

interface Props {
  postId: Id<"posts">
}

export default function DeletePostButton({ postId }: Props) {
  const router = useRouter()
  const deletePost = useMutation(api.posts.deletePost)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this post?")) return

    startTransition(async () => {
      try {
        await deletePost({ postId })

        toast.success("Post deleted")

        router.push("/blogs")
        router.refresh()
      } catch {
        toast.error("Failed to delete post")
      }
    })
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending} className="gap-2">
        <Trash2 className="size-4" />
        Delete
    </Button>
  )
}