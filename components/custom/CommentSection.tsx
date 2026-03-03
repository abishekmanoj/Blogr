"use client"

import { useTransition } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

import { commentSchema, type commentSchemaType } from "@/lib/validations/comment"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export default function CommentsSection() {
  const params = useParams<{postId: Id<'posts'>}>()
  const comments = useQuery(api.comments.getComments, { postId: params.postId })
  const createComment = useMutation(api.comments.createComment)
  const [isPending, startTransition] = useTransition()

  const form = useForm<commentSchemaType>({
    resolver: zodResolver(commentSchema),
    defaultValues: { body: "", postId: params.postId },
  })

  const onSubmit = (data: commentSchemaType) => {
    startTransition(async () => {
      try {
        await createComment({
          postId: data.postId,
          body: data.body,
        })
        toast.success('Commented!')
        form.reset({ body: "", postId: params.postId })
      } catch (e) {
        console.error(e)
        toast.error('Failed to comment')
      }
    })
  }

  return (
    <section className="space-y-5">
      <div className="flex justify justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Comments</h2>
          <p className="text-sm text-muted-foreground">
            Share your thoughts. Keep it respectful.
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground py-6">
            {comments?.length} Comments
          </p>
        </div>
      </div>

      <Separator />

      {/* List */}
      <div className="space-y-6">
        {comments === undefined ? (
          <p className="text-sm text-muted-foreground">Loading comments…</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No comments yet. Be the first to comment.
          </p>
        ) : (
          comments.map((c, index) => (
            <div key={c._id}>
              <div className="flex gap-3">
                
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {c.authorName
                      ? c.authorName.charAt(0).toUpperCase()
                      : "A"}
                  </div>
                </div>

                {/* Comment Content */}
                <div className="flex-1">
                  <div className="rounded-2xl bg-muted px-4 py-3 flex justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        {c.authorName ?? "Anonymous"}
                      </p>
                      <p className="mt-1 text-sm whitespace-pre-wrap">
                        {c.body}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(c._creationTime).toLocaleString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Separator />

      {/* Form */}
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Add a comment</FieldLabel>
                <Textarea
                  placeholder="Write something..."
                  className="min-h-25"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? (
            <>
              Posting… <Loader2 className="ml-2 size-4 animate-spin" />
            </>
          ) : (
            "Post Comment"
          )}
        </Button>
      </form>
    </section>
  )
}