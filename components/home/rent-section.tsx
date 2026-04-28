import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const benefits = [
  "Đặt cọc chỉ 30% giá trị trang phục",
  "Thuê theo ngày, tuần hoặc tháng",
  "Vệ sinh, kiểm tra trước khi giao",
  "Hỗ trợ đổi size nếu không vừa",
  "Giao nhận tận nơi tại TP.HCM & Hà Nội",
]

export function RentSection() {
  return (
    <section
      id="rent"
      className="bg-gradient-to-br from-violet-50 to-pink-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {/* Spiderman tall */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=533&fit=crop"
                  alt="Thuê trang phục cosplay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-col gap-3 pt-8">
                {/* Gradient card */}
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500">
                  <div className="text-center text-white">
                    <div className="mb-1 text-4xl">👗</div>
                    <p className="text-sm font-bold">500+ bộ</p>
                    <p className="text-xs text-white/80">sẵn sàng thuê</p>
                  </div>
                </div>
                {/* Batman tall */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=533&fit=crop"
                    alt="Thuê trang phục cosplay 3"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

            {/* Price tag */}
            <div className="absolute top-8 -right-4 rounded-xl border bg-white p-3 shadow-lg">
              <p className="text-xs text-muted-foreground">Giá thuê từ</p>
              <p className="text-xl font-bold text-violet-600">99K/ngày</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <Badge className="w-fit bg-pink-100 text-pink-700 hover:bg-pink-100">
              Dịch vụ cho thuê
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Thuê trang phục — tiết kiệm, tiện lợi
            </h2>
            <p className="text-muted-foreground">
              Không cần bỏ ra cả triệu để mua một bộ chỉ mặc vài lần. Thuê trang
              phục cosplay chất lượng cao với giá hợp lý, phù hợp cho mọi sự
              kiện.
            </p>

            <ul className="flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-violet-600" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="w-fit bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:opacity-90"
              asChild
            >
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
