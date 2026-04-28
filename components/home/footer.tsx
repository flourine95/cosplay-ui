import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 fill-none stroke-current stroke-2"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  )
}

const footerLinks = {
  "Dịch vụ": [
    { label: "Mua trang phục", href: "#shop" },
    { label: "Thuê trang phục", href: "#rent" },
    { label: "Đặt may theo yêu cầu", href: "#custom" },
    { label: "Phụ kiện cosplay", href: "#accessories" },
  ],
  "Hỗ trợ": [
    { label: "Hướng dẫn chọn size", href: "#size-guide" },
    { label: "Chính sách đổi trả", href: "#return" },
    { label: "Câu hỏi thường gặp", href: "#faq" },
    { label: "Liên hệ", href: "#contact" },
  ],
  "Về chúng tôi": [
    { label: "Giới thiệu", href: "#about" },
    { label: "Blog cosplay", href: "#blog" },
    { label: "Sự kiện", href: "#events" },
    { label: "Tuyển dụng", href: "#careers" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-pink-400">
                <Sparkles className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                  cosplay
                </span>
                <span className="text-background">.vn</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-background/60">
              Nền tảng cosplay hàng đầu Việt Nam — mua, thuê và đặt may trang
              phục chất lượng cao.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: YoutubeIcon, label: "Youtube" },
              ].map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 text-sm font-semibold">{title}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-background/50 md:flex-row">
          <p>© 2025 cosplay.vn — Bản quyền thuộc về cosplay.vn</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-background">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-background">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
