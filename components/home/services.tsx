import { ShoppingBag, CalendarDays, Scissors, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function Services() {
  return (
    <section id="services" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
            Dịch vụ
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Mọi nhu cầu cosplay, một nơi duy nhất
          </h2>
        </div>

        {/* Asymmetric layout — not identical cards */}
        <div className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-3">
          {/* Mua trực tiếp — primary service, larger visual weight */}
          <div className="flex flex-col gap-4 bg-primary p-8 md:col-span-1">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary-foreground/15">
              <ShoppingBag className="size-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-primary-foreground">
                Mua trực tiếp
              </h3>
              <p className="text-sm leading-relaxed text-primary-foreground/75">
                Sở hữu ngay trang phục chất lượng cao. Đa dạng size, giao hàng
                2–5 ngày toàn quốc.
              </p>
            </div>
            <Button variant="secondary" className="mt-auto w-fit" asChild>
              <Link href="#shop">
                Mua ngay
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          {/* Thuê trang phục */}
          <div className="flex flex-col gap-4 bg-card p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-brand-subtle">
              <CalendarDays className="size-6 text-brand-subtle-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-foreground">
                Thuê trang phục
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Thuê theo ngày hoặc tuần với giá hợp lý. Phù hợp cho sự kiện,
                hội thi, chụp ảnh. Đặt cọc đơn giản.
              </p>
            </div>
            <Separator />
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li>Từ 99K/ngày</li>
              <li>Đặt cọc 30%</li>
              <li>Giao nhận tận nơi HCM & HN</li>
            </ul>
            <Button variant="outline" className="mt-auto w-fit" asChild>
              <Link href="#rent">
                Xem để thuê
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          {/* Đặt may */}
          <div className="flex flex-col gap-4 bg-card p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-secondary">
              <Scissors className="size-6 text-secondary-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-foreground">
                Đặt may theo yêu cầu
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Không tìm thấy trang phục ưng ý? Đặt may theo số đo và thiết kế
                riêng. Thợ may chuyên nghiệp, giao trong 7–14 ngày.
              </p>
            </div>
            <Separator />
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li>Theo số đo cá nhân</li>
              <li>Cập nhật tiến độ qua Zalo</li>
              <li>Thanh toán khi nhận hàng</li>
            </ul>
            <Button variant="outline" className="mt-auto w-fit" asChild>
              <Link href="#custom">
                Đặt may ngay
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
