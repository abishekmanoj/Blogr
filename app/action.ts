"use server"

import { createPostSchema, type CreatePostValues } from "@/lib/validations/post"
import { redirect } from "next/navigation"

import { getToken } from "@/lib/auth-server"
import { fetchMutation } from "convex/nextjs" 
import { api } from "@/convex/_generated/api" 

export async function createBlogAction(data: CreatePostValues) {
  const parsed = createPostSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error("Invalid form data")
  }

  const token = await getToken()

  await fetchMutation(
    api.posts.createPost,
    {
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
    },
    { token }
  )

  redirect("/") 
}