import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28 lg:py-36">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Text */}
          <div className="flex flex-col gap-7">
            <h1 className="text-5xl leading-[1.05] font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Hóa thân thành <span className="text-primary">nhân vật</span> bạn
              yêu thích
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              Mua, thuê hoặc đặt may trang phục cosplay chất lượng cao. Hơn 500
              bộ từ anime, game, phim — giao toàn quốc.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link href="#shop">
                  Khám phá ngay
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                asChild
              >
                <Link href="#rent">Xem trang phục thuê</Link>
              </Button>
            </div>

            {/* Recent activity */}
            <div className="flex flex-col gap-3 border-t border-border/60 pt-5">
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Vừa có đơn
              </p>
              <div className="flex flex-col gap-0">
                {[
                  {
                    name: "Nezuko - Demon Slayer",
                    type: "Đặt may",
                    time: "2 phút",
                  },
                  {
                    name: "Rem - Re:Zero",
                    type: "Thuê 3 ngày",
                    time: "15 phút",
                  },
                  {
                    name: "Hu Tao - Genshin Impact",
                    type: "Mua",
                    time: "1 giờ",
                  },
                ].map((order, i) => (
                  <div
                    key={order.name}
                    className={`flex items-center justify-between py-2.5 ${i < 2 ? "border-b border-border/40" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {order.name}
                      </span>
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {order.type}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {order.time} trước
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-2">
              {["Giao toàn quốc", "Đổi trả 7 ngày", "Hàng chính hãng"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Images grid */}
          <div className="relative grid grid-cols-2 gap-3">
            {/* Left column */}
            <div className="flex flex-col gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=533&fit=crop"
                  alt="Spiderman cosplay"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  Marvel
                </span>
              </div>
              {/* Anime stat tile with background image */}
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop"
                  alt="Anime cosplay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-2xl font-extrabold text-white">180+</p>
                  <p className="text-xs font-medium text-white/80">bộ Anime</p>
                </div>
              </div>
            </div>

            {/* Right column — offset down */}
            <div className="flex flex-col gap-3 pt-8">
              {/* Game stat tile with background image */}
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=400&fit=crop"
                  alt="Game cosplay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-2xl font-extrabold text-white">120+</p>
                  <p className="text-xs font-medium text-white/80">bộ Game</p>
                </div>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=533&fit=crop"
                  alt="Batman cosplay"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                  DC Comics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
