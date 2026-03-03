"use server"

import { createPostSchema, type CreatePostValues } from "@/lib/validations/post"
import { redirect } from "next/navigation"

import { getToken } from "@/lib/auth-server"
import { fetchMutation } from "convex/nextjs" 
import { api } from "@/convex/_generated/api" 

export async function createBlogAction(data: CreatePostValues) {

  try {

    const parsed = createPostSchema.safeParse(data)
    if (!parsed.success) {
      throw new Error("Invalid form data")
    }

  const token = await getToken()

    const imageUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, {token})
    const uploadResult = await fetch(imageUrl, {
      method: "POST", 
      headers: {
        "Content-Type": parsed.data.image.type
      },
      body: parsed.data.image
    })

    if(!uploadResult.ok) return {
      error: 'Failed to upload image'
    }

    const { storageId } = await uploadResult.json()

    await fetchMutation(
    api.posts.createPost,
    {
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      imageStorageId: storageId
    },
    { token }
  )

  } catch {
    return {
      error: 'Failed to create post'
    }
  }

  redirect("/blogs")
   
}


