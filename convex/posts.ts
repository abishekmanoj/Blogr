// posts.ts
import { mutation } from "./_generated/server"
import { ConvexError, v } from "convex/values"
import { authComponent } from "./auth"

export const createPost = mutation({
  args: {
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) throw new ConvexError("Not authenticated")

    const postId = await ctx.db.insert("posts", {
      title: args.title,
      excerpt: args.excerpt,
      content: args.content,
      authorId: user._id, 
    })

    return postId
  },
})