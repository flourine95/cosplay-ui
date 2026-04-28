import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle background tint */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-brand-subtle/40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-secondary/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit">
              #1 Cosplay Việt Nam
            </Badge>

            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Hóa thân thành{" "}
              <span className="text-primary">nhân vật yêu thích</span> của bạn
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              Mua, thuê hoặc đặt may trang phục cosplay chất lượng cao. Hơn 500+
              bộ trang phục từ anime, game, phim — giao hàng toàn quốc.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="#shop">
                  Khám phá ngay
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#rent">Xem trang phục thuê</Link>
              </Button>
            </div>

            {/* Social proof — recent orders, not metrics */}
            <div className="flex flex-col gap-2 pt-2">
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Đơn gần đây
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  {
                    name: "Nezuko - Demon Slayer",
                    type: "Đặt may",
                    time: "2 phút trước",
                  },
                  {
                    name: "Rem - Re:Zero",
                    type: "Thuê 3 ngày",
                    time: "15 phút trước",
                  },
                  {
                    name: "Genshin Impact - Hu Tao",
                    type: "Mua trực tiếp",
                    time: "1 giờ trước",
                  },
                ].map((order) => (
                  <div
                    key={order.name}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {order.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.type}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {order.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                "🚚 Giao toàn quốc",
                "🔄 Đổi trả 7 ngày",
                "✅ Hàng chính hãng",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border bg-brand-subtle px-3 py-1 text-xs font-medium text-brand-subtle-foreground"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Images grid */}
          <div className="relative grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=533&fit=crop"
                  alt="Spiderman cosplay"
                  fill
                  priority
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
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-secondary">
                <div className="p-4 text-center">
                  <div className="mb-2 text-4xl">⚔️</div>
                  <p className="text-sm font-bold text-secondary-foreground">
                    Anime
                  </p>
                  <p className="text-xs text-muted-foreground">180+ bộ</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-8">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-brand-subtle">
                <div className="p-4 text-center">
                  <div className="mb-2 text-4xl">🎮</div>
                  <p className="text-sm font-bold text-brand-subtle-foreground">
                    Game
                  </p>
                  <p className="text-xs text-muted-foreground">120+ bộ</p>
                </div>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=533&fit=crop"
                  alt="Batman cosplay"
                  fill
                  priority
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
          </div>
        </div>
      </div>
    </section>
  )
}
