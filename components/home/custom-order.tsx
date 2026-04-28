import { ClipboardList, Ruler, Truck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Gửi yêu cầu",
    desc: "Mô tả nhân vật, gửi ảnh tham khảo và số đo của bạn qua form hoặc Zalo.",
  },
  {
    icon: Ruler,
    step: "02",
    title: "Báo giá & xác nhận",
    desc: "Đội ngũ tư vấn sẽ báo giá trong 24h. Xác nhận và đặt cọc 50% để bắt đầu.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "May & hoàn thiện",
    desc: "Thợ may chuyên nghiệp thực hiện trong 7–14 ngày. Cập nhật tiến độ qua Zalo.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Giao hàng",
    desc: "Đóng gói cẩn thận, giao toàn quốc. Thanh toán phần còn lại khi nhận hàng.",
  },
]

export function CustomOrder() {
  return (
    <section id="custom" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
            Đặt may theo yêu cầu
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Trang phục riêng cho bạn
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Không tìm thấy trang phục ưng ý? Chúng tôi may theo đúng số đo và
            thiết kế bạn muốn — từ anime, game đến original design.
          </p>
        </div>

        {/* Steps as a horizontal flow with numbered connectors */}
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.step} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  {/* Connector — only between steps, not after last */}
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

        <div className="mt-12 flex justify-center">
          <Button size="lg" asChild>
            <Link href="#custom-form">Đặt may ngay</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
