// posts.ts
import { mutation, query } from "./_generated/server"
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

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query('posts').order('desc').collect();
    return posts
  }
})