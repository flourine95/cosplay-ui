import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-pink-50 to-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-96 rounded-full bg-gradient-to-br from-violet-200/40 to-pink-200/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-gradient-to-tr from-pink-200/30 to-violet-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <Badge className="w-fit bg-violet-100 text-violet-700 hover:bg-violet-100">
              <Star className="mr-1 size-3 fill-violet-500 text-violet-500" />
              #1 Cosplay Việt Nam
            </Badge>

            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Hóa thân thành{" "}
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                nhân vật yêu thích
              </span>{" "}
              của bạn
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              Mua, thuê hoặc đặt may trang phục cosplay chất lượng cao. Hơn 500+
              bộ trang phục từ anime, game, phim — giao hàng toàn quốc.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:opacity-90"
                asChild
              >
                <Link href="#shop">
                  Khám phá ngay
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#rent">Xem trang phục thuê</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-2">
              {[
                { value: "500+", label: "Trang phục" },
                { value: "10K+", label: "Khách hàng" },
                { value: "4.9★", label: "Đánh giá" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                "🚚 Giao toàn quốc",
                "🔄 Đổi trả 7 ngày",
                "✅ Hàng chính hãng",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Images grid */}
          <div className="relative grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              {/* Spiderman */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=533&fit=crop"
                  alt="Spiderman cosplay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                    Marvel
                  </span>
                </div>
              </div>
              {/* Gradient card - Anime */}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 via-fuchsia-500 to-violet-600">
                <div className="p-4 text-center text-white">
                  <div className="mb-2 text-4xl">⚔️</div>
                  <p className="text-sm font-bold">Anime</p>
                  <p className="text-xs text-white/80">180+ bộ</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-8">
              {/* Gradient card - Game */}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700">
                <div className="p-4 text-center text-white">
                  <div className="mb-2 text-4xl">🎮</div>
                  <p className="text-sm font-bold">Game</p>
                  <p className="text-xs text-white/80">120+ bộ</p>
                </div>
              </div>
              {/* Batman */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=533&fit=crop"
                  alt="Batman cosplay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                    DC Comics
                  </span>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border bg-white/90 p-3 shadow-lg backdrop-blur-sm">
              <p className="text-xs font-medium text-muted-foreground">
                Đơn mới nhất
              </p>
              <p className="text-sm font-semibold">Nezuko - Demon Slayer</p>
              <p className="text-xs text-violet-600">Vừa được đặt may ✨</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
