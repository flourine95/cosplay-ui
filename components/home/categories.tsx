import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    name: "Anime",
    count: "180+ bộ",
    href: "#anime",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=533&fit=crop",
  },
  {
    name: "Game",
    count: "120+ bộ",
    href: "#game",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=533&fit=crop",
  },
  {
    name: "Phim & Series",
    count: "90+ bộ",
    href: "#movie",
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=533&fit=crop",
  },
  {
    name: "Fantasy & Original",
    count: "60+ bộ",
    href: "#fantasy",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=533&fit=crop",
  },
]

export function Categories() {
  return (
    <section id="collections" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Khám phá theo thể loại
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              aria-label={`${cat.name} — ${cat.count}`}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-base font-bold text-white">{cat.name}</h3>
                  <p className="text-sm text-white/70">{cat.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
