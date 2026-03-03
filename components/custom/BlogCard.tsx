import Image from "next/image"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"

export default function BlogCard({ id, title, excerpt, image }: { id: string, title: string, excerpt: string, image: string | null }) {

  const imageSrc = image ?? `https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4` 
  return (
    <div  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] transition hover:scale-[1.02]">

      <Card className="group h-full overflow-hidden shadow-2xs transition hover:shadow-sm">
        <div className="relative h-44 w-full">
          <Image
            src={imageSrc}
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

        <Link href={`/blogs/${id}`} className="px-6"> <Button> Read More </Button> </Link>

      </Card>

    </div>
  )
}