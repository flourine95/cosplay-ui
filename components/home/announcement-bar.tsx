import { Tag } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="bg-primary py-2 text-center text-xs font-medium text-primary-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Tag className="size-3" />
        Miễn phí vận chuyển cho đơn từ 500K — Nhập code{" "}
        <span className="rounded bg-primary-foreground/20 px-1.5 py-0.5 font-bold tracking-wider">
          COSPLAY10
        </span>{" "}
        giảm thêm 10%
      </span>
    </div>
  )
}
