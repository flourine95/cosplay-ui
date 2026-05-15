"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Mail, Lock, ShieldCheck } from "lucide-react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/stores/auth-store"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await login(email, password)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <AuthShell
      title="Đăng nhập"
      description="Truy cập tài khoản để theo dõi đơn hàng, lưu trang phục yêu thích và nhận ưu đãi dành riêng cho bạn."
      imageSrc="https://upload.wikimedia.org/wikipedia/commons/1/10/Cerisier_du_Japon_Prunus_serrulata.jpg"
      imageAlt="Mẫu cosplay trong không gian chụp ảnh tối"
      imageLabel="Tài khoản"
      imageTitle="Đăng nhập để tiếp tục mua sắm."
      stats={[
        { value: "500+", label: "bộ cosplay" },
        { value: "24h", label: "hỗ trợ" },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="login-email" className="text-sm text-foreground">
            Email
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="login-email"
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

        <div className="space-y-2">
          <Label htmlFor="login-password" className="text-sm text-foreground">
            Mật khẩu
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="login-password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="h-11 rounded-xl pr-10 pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox id="remember-me" />
            <span>Ghi nhớ đăng nhập</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <Button
          className="h-11 w-full rounded-full text-base"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          {!isLoading && <ArrowRight data-icon="inline-end" />}
        </Button>

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Hoặc
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="outline"
            className="h-11 rounded-full"
            type="button"
            disabled
          >
            <ShieldCheck />
            Google
          </Button>
          <Button
            variant="outline"
            className="h-11 rounded-full"
            type="button"
            disabled
          >
            <ShieldCheck />
            Apple
          </Button>
        </div>

        <p className="pt-2 text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
