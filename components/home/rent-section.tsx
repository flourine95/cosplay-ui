import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  "Đặt cọc chỉ 30% giá trị trang phục",
  "Thuê theo ngày, tuần hoặc tháng",
  "Vệ sinh, kiểm tra trước khi giao",
  "Hỗ trợ đổi size nếu không vừa",
  "Giao nhận tận nơi tại TP.HCM & Hà Nội",
]

export function RentSection() {
  return (
    <section id="rent" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=533&fit=crop"
                  alt="Thuê trang phục cosplay"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-col gap-3 pt-8">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop"
                    alt="500+ bộ sẵn thuê"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-2xl font-extrabold text-white">500+</p>
                    <p className="text-xs font-medium text-white/80">
                      bộ sẵn thuê
                    </p>
                  </div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=533&fit=crop"
                    alt="Thuê trang phục cosplay"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-8 -right-4 rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
              <p className="text-xs text-muted-foreground">Giá thuê từ</p>
              <p className="text-xl font-bold text-primary">99K/ngày</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Thuê thay vì mua, tiết kiệm thật sự
            </h2>
            <p className="text-muted-foreground">
              Không cần bỏ ra cả triệu để mua một bộ chỉ mặc vài lần. Thuê trang
              phục chất lượng cao với giá hợp lý, phù hợp cho mọi sự kiện.
            </p>

            <ul className="flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="w-fit rounded-full" asChild>
              <Link href="#rent-catalog">
                Xem trang phục cho thuê
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
