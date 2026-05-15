"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Mail, ShieldAlert, CheckCircle2 } from "lucide-react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    setIsLoading(false)

    if (!res.ok) {
      setError(data.error)
      return
    }

    setSent(true)
  }

  return (
    <AuthShell
      title="Quên mật khẩu"
      description="Nhập email của bạn, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu trong vài phút."
      imageSrc="https://upload.wikimedia.org/wikipedia/commons/1/10/Cerisier_du_Japon_Prunus_serrulata.jpg"
      imageAlt="Không gian hậu trường chụp ảnh thời trang"
      imageLabel="Khôi phục tài khoản"
      imageTitle="Lấy lại quyền truy cập."
      stats={[
        { value: "3 phút", label: "gửi mail" },
        { value: "Bảo mật", label: "xác minh" },
      ]}
    >
      {sent ? (
        <div className="space-y-5">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-900 dark:bg-green-950/20">
            <CheckCircle2 className="size-10 text-green-600" />
            <div>
              <p className="font-semibold text-foreground">Đã gửi email!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Kiểm tra hộp thư <strong>{email}</strong> để lấy link đặt lại
                mật khẩu. Link có hiệu lực trong 1 giờ.
              </p>
            </div>
          </div>
          <Link
            href="/login"
            className="block text-center text-sm font-medium text-primary hover:text-primary/80"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-primary" />
              <p>
                Chúng tôi chỉ cần email đã dùng để đăng ký. Nếu không thấy thư,
                hãy kiểm tra mục spam hoặc thử lại sau vài phút.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="forgot-email" className="text-sm text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="forgot-email"
                type="email"
                placeholder="ban@cosplay.vn"
                className="h-11 rounded-xl pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <Button
            className="h-11 w-full rounded-full text-base"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Đang gửi..." : "Gửi liên kết đặt lại"}
            {!isLoading && <ArrowRight data-icon="inline-end" />}
          </Button>

          <div className="flex items-center justify-between gap-3 text-sm">
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Quay lại đăng nhập
            </Link>
            <Link
              href="/register"
              className="text-muted-foreground hover:text-foreground"
            >
              Tạo tài khoản mới
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  )
}
