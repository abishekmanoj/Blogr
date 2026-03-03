import { Id } from '@/convex/_generated/dataModel'
import z from 'zod'

export const commentSchema = z.object({
    body: z.string().min(3, "Enter a of minimum 3 characters!"),
    postId: z.custom<Id<"posts">>()
})

export type commentSchemaType = z.infer<typeof commentSchema>