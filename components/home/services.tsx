import { ShoppingBag, CalendarDays, Scissors, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function Services() {
  return (
    <section id="services" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Một nơi, ba cách sở hữu
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl bg-border md:grid-cols-3">
          {/* Mua trực tiếp — primary */}
          <div className="flex flex-col gap-5 bg-primary p-8 md:col-span-1">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary-foreground/15">
              <ShoppingBag className="size-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-primary-foreground">
                Mua trực tiếp
              </h3>
              <p className="text-sm leading-relaxed text-primary-foreground/70">
                Sở hữu ngay. Đa dạng size, giao hàng 2–5 ngày toàn quốc.
              </p>
            </div>
            <Button
              variant="secondary"
              className="mt-auto w-fit rounded-full"
              asChild
            >
              <Link href="#shop">
                Mua ngay
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          {/* Thuê */}
          <div className="flex flex-col gap-5 bg-card p-8">
            <div className="flex size-11 items-center justify-center rounded-lg bg-brand-subtle">
              <CalendarDays className="size-5 text-brand-subtle-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-foreground">
                Thuê trang phục
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Thuê theo ngày hoặc tuần. Phù hợp cho sự kiện, hội thi, chụp
                ảnh.
              </p>
            </div>
            <Separator />
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li>Từ 99K/ngày</li>
              <li>Đặt cọc 30%</li>
              <li>Giao nhận tận nơi HCM & HN</li>
            </ul>
            <Button
              variant="outline"
              className="mt-auto w-fit rounded-full"
              asChild
            >
              <Link href="#rent">
                Xem để thuê
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          {/* Đặt may */}
          <div className="flex flex-col gap-5 bg-card p-8">
            <div className="flex size-11 items-center justify-center rounded-lg bg-secondary">
              <Scissors className="size-5 text-secondary-foreground" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-foreground">
                Đặt may theo yêu cầu
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                May theo số đo và thiết kế riêng. Thợ chuyên nghiệp, giao trong
                7–14 ngày.
              </p>
            </div>
            <Separator />
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li>Theo số đo cá nhân</li>
              <li>Cập nhật tiến độ qua Zalo</li>
              <li>Thanh toán khi nhận hàng</li>
            </ul>
            <Button
              variant="outline"
              className="mt-auto w-fit rounded-full"
              asChild
            >
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
