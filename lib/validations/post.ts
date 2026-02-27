import { z } from "zod"

export const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(100, "Keep excerpt under 100 chars"),
  content: z.string().min(50, "Content must be at least 50 characters"),
})

export type CreatePostValues = z.infer<typeof createPostSchema>