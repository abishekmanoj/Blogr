import Image from "next/image"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogCard({ id, title, excerpt, image }: { id: string, title: string, excerpt: string, image: string | null }) {

  const imgSeed = encodeURIComponent(title.slice(0, 40) || "blog")

  return (
    <Link href={`/blogs/${id}`} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] transition hover:scale-[1.02]">
      <Card className="group h-full overflow-hidden shadow-2xs transition hover:shadow-sm">
        <div className="relative h-44 w-full">
          <Image
            src={image ?? `https://picsum.photos/seed/${imgSeed}/800/500` }
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        </div>

        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
          <p className="line-clamp-3 text-sm text-muted-foreground">{excerpt}</p>
        </CardHeader>
      </Card>
    </Link>
  )
}