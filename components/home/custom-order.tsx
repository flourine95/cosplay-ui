import { ClipboardList, Ruler, Truck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Gửi yêu cầu",
    desc: "Mô tả nhân vật, gửi ảnh tham khảo và số đo qua form hoặc Zalo.",
  },
  {
    icon: Ruler,
    step: "02",
    title: "Báo giá & xác nhận",
    desc: "Tư vấn báo giá trong 24h. Đặt cọc 50% để bắt đầu.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "May & hoàn thiện",
    desc: "Thợ chuyên nghiệp thực hiện 7–14 ngày. Cập nhật tiến độ qua Zalo.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Giao hàng",
    desc: "Đóng gói cẩn thận, giao toàn quốc. Thanh toán phần còn lại khi nhận.",
  },
]

export function CustomOrder() {
  return (
    <section id="custom" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Không tìm được? Chúng tôi may cho bạn
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Từ anime, game đến original design — theo đúng số đo và thiết kế bạn
            muốn.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden h-px flex-1 bg-border md:block" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-primary">
                    {step.step}
                  </span>
                  <h3 className="mt-0.5 font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 flex justify-start">
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="#custom-form">Đặt may ngay</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
