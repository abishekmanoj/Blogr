"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Loader2 } from "lucide-react"
import { createPostSchema, CreatePostValues } from "@/lib/validations/post"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createBlogAction } from "@/app/action"



export default function CreatePage() {
  const[isPending, startTransition] = useTransition()
  const mutation = useMutation(api.posts.createPost)
  const router = useRouter()

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", excerpt: "", content: "" },
  })

  const onSubmit = (data: CreatePostValues) => {
    startTransition(async() => {
        try {
            // mutation({
            //     title: data.title,
            //     excerpt: data.excerpt,
            //     content: data.content,
            // })
            // form.reset()
            // toast.success('Post created!', { position: "top-right"})
            // router.push('/')

            await createBlogAction(data)

        } catch (err) {
            console.log(err)
        }
    })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <Card className="shadow-2xs">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">
              Create a new post<span className="text-3xl text-emerald-500">.</span>
            </CardTitle>
            <CardDescription>
              Add a title, a short excerpt, and write your post content. Publish when you’re ready.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col">
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        id="post-title"
                        type="text"
                        placeholder="e.g. How I built Blogr with Convex"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup>
                <Controller
                  name="excerpt"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Excerpt</FieldLabel>
                      <Input
                        id="post-excerpt"
                        type="text"
                        placeholder="A short summary that shows up in the feed..."
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup>
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Content</FieldLabel>
                      <Textarea
                        id="post-content"
                        placeholder="Write your post here..."
                        className="min-h-85"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button className="w-full" type="submit" disabled={isPending}>
                { isPending ? ( <><span> Creating post... </span> <Loader2 className="size-4 animate-spin" /> </>) : <span> Create Post </span>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
