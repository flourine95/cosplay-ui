import Link from "next/link"

const categories = [
  {
    name: "Anime",
    count: "180+ bộ",
    bgClass: "bg-secondary",
    textClass: "text-secondary-foreground",
    subtextClass: "text-muted-foreground",
    href: "#anime",
    // SVG path for sword icon
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="size-14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 40L28 20M28 20L36 8L40 12L28 20ZM28 20L32 24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="36" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Game",
    count: "120+ bộ",
    bgClass: "bg-brand-subtle",
    textClass: "text-brand-subtle-foreground",
    subtextClass: "text-muted-foreground",
    href: "#game",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="size-14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="14"
          width="36"
          height="22"
          rx="8"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M16 25h6M19 22v6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="30" cy="23" r="1.5" fill="currentColor" />
        <circle cx="34" cy="27" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Phim & Series",
    count: "90+ bộ",
    bgClass: "bg-muted",
    textClass: "text-foreground",
    subtextClass: "text-muted-foreground",
    href: "#movie",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="size-14"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="16"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M20 18l10 6-10 6V18z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Fantasy & Original",
    count: "60+ bộ",
    bgClass: "bg-accent",
    textClass: "text-accent-foreground",
    subtextClass: "text-muted-foreground",
    href: "#fantasy",
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="size-14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M24 6l3.5 10.5H38l-8.75 6.35 3.35 10.3L24 27.1l-8.6 6.05 3.35-10.3L10 16.5h10.5L24 6z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export function Categories() {
  return (
    <section id="collections" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold tracking-widest text-primary uppercase">
              Danh mục
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Khám phá theo thể loại
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              aria-label={`${cat.name} — ${cat.count}`}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div
                className={`relative aspect-[3/4] w-full ${cat.bgClass} flex flex-col items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-[1.02]`}
              >
                <div className={cat.textClass}>{cat.icon}</div>
                <div className="px-4 text-center">
                  <h3 className={`text-base font-bold ${cat.textClass}`}>
                    {cat.name}
                  </h3>
                  <p className={`text-sm ${cat.subtextClass}`}>{cat.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
