# FlowFix

Blogr is a modern, full stack blogging platform built with Next.js App Router, Convex, and Better Auth. It provides a clean interface for writing, publishing, searching, and interacting with blog posts in real time.The project is designed with scalable architecture, real-time capabilities, and production-ready full stack patterns in mind.


## Features

-User authentication (Email & Password) using Better Auth
-Secure session-based access control
-Create, publish, and delete blog posts
-Upload images for blog posts using Convex Storage
-Full-text blog search with Convex search indexes
-Real-time presence indicator showing who is viewing a post
-Comment section for blog interaction
-Server-side rendering with Next.js App Router
-Protected routes and server actions
-Responsive UI built with shadcn/ui and Tailwind CSS
-Clean separation of server and client components
-Real-time backend powered by Convex


## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod

### Backend
- Convex (Database + API + Storage)
- Better Auth (Authentication & Sessions)
- Convex Search Indexes
- Convex Presence (Real-time viewers)

### Tooling
- Convex CLI
- ESLint
- PostCSS

## Running UTXCoin
1. Install dependencies:
``` npm install ```
   
2. Configure environment variables:
   ``` 
    NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
    NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site
    BETTER_AUTH_SECRET=your_secret_key
    NEXT_PUBLIC_SITE_URL=http://localhost:3000

    ```
   
3. Start Convex development backend
   ``` npx convex dev ```
   This launches Convex API Server, Local DB and Convex Dashboard.
   Dashboard at: ``` http://127.0.0.1:6790 ```
   
4. Start the Next.js development server
   ```npm run dev``` 
   Available at: ```http://localhost:3000```
  


5. Production build:
    ``` npm run build ```
    ``` npm start ```

## Authentication and Access Control
+ Public routes:
    - `/auth`
    - `/`

+ Protected routes:
    - `/create`
    - `/blogs`
    - `/blogs/[postId]`


Route protection is enforced via ```proxy.ts``` and server-side checks. API routes are also secured via session checks.


## Blog Workflow
+ Publish posts to the public feed
+ Search posts by title or content
+ View posts with a dedicated page
+ Blogr includes full-text search powered by Convex search indexes
+ See who else is currently viewing a post (Presence)
+ Delete posts if you are the author


## Notes
+ Authentication is implemented using Better Auth
+ Convex provides the database, API layer, and file storage
+ Presence is implemented using Convex Presence
+ Images are stored using Convex Storage
+ The UI uses shadcn components with Tailwind CSS
+ Server and client components are separated for performance

## Author
Abishek Manoj
