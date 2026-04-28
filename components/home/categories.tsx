import Link from "next/link"

const categories = [
  {
    name: "Anime",
    count: "180+ bộ",
    emoji: "⚔️",
    gradient: "from-pink-500 via-fuchsia-500 to-violet-600",
    href: "#anime",
  },
  {
    name: "Game",
    count: "120+ bộ",
    emoji: "🎮",
    gradient: "from-violet-500 via-purple-600 to-indigo-700",
    href: "#game",
  },
  {
    name: "Phim & Series",
    count: "90+ bộ",
    emoji: "🦸",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    href: "#movie",
  },
  {
    name: "Fantasy & Original",
    count: "60+ bộ",
    emoji: "✨",
    gradient: "from-teal-400 via-cyan-500 to-blue-600",
    href: "#fantasy",
  },
]

export function Categories() {
  return (
    <section id="collections" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <p className="mb-1 text-sm font-semibold tracking-widest text-violet-600 uppercase">
            Danh mục
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Khám phá theo thể loại
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div
                className={`relative aspect-[3/4] w-full bg-gradient-to-br ${cat.gradient} flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-[1.02]`}
              >
                <span className="text-6xl drop-shadow-lg">{cat.emoji}</span>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white drop-shadow">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/80">{cat.count}</p>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-black/0 transition-colors group-hover:bg-black/10" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
