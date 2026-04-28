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
          <p className="mb-2 text-sm font-semibold tracking-widest text-violet-600 uppercase">
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

        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connector line */}
          <div className="absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-violet-200 via-pink-300 to-violet-200 md:block" />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.step}
                className="relative flex flex-col items-center gap-4 text-center"
              >
                <div className="relative flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 shadow-lg shadow-violet-200">
                  <Icon className="size-7 text-white" />
                  <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-violet-600 shadow">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
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
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:opacity-90"
            asChild
          >
            <Link href="#custom-form">Đặt may ngay</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
