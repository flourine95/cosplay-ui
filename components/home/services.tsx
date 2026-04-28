import { ShoppingBag, CalendarDays, Scissors } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: ShoppingBag,
    title: "Mua trực tiếp",
    description:
      "Sở hữu ngay trang phục cosplay chất lượng cao. Đa dạng size, giao hàng nhanh toàn quốc trong 2–5 ngày.",
    cta: "Mua ngay",
    href: "#shop",
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: CalendarDays,
    title: "Thuê trang phục",
    description:
      "Thuê theo ngày hoặc tuần với giá cực hợp lý. Phù hợp cho sự kiện, hội thi, chụp ảnh. Đặt cọc đơn giản.",
    cta: "Xem để thuê",
    href: "#rent",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: Scissors,
    title: "Đặt may theo yêu cầu",
    description:
      "Không tìm thấy trang phục ưng ý? Đặt may theo số đo và thiết kế riêng. Thợ may chuyên nghiệp, giao trong 7–14 ngày.",
    cta: "Đặt may ngay",
    href: "#custom",
    color: "from-fuchsia-500 to-pink-500",
    bg: "bg-fuchsia-50",
    iconColor: "text-fuchsia-600",
  },
]

export function Services() {
  return (
    <section id="services" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-violet-600 uppercase">
            Dịch vụ của chúng tôi
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Mọi nhu cầu cosplay, một nơi duy nhất
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Dù bạn muốn mua, thuê hay đặt may — cosplay.vn đều có thể đáp ứng
            với chất lượng tốt nhất.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className="group relative overflow-hidden border-border/60 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.color}`}
                />
                <CardHeader className="pb-3">
                  <div
                    className={`mb-3 flex size-12 items-center justify-center rounded-xl ${service.bg}`}
                  >
                    <Icon className={`size-6 ${service.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full group-hover:border-violet-300 group-hover:text-violet-600"
                    asChild
                  >
                    <Link href={service.href}>{service.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
