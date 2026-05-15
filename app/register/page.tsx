"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Mail, Lock, User } from "lucide-react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }

    if (!agreed) {
      setError("Vui lòng đồng ý với điều khoản sử dụng")
      return
    }

    setIsLoading(true)
    const result = await register(name, email, password)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <AuthShell
      title="Đăng ký"
      description="Tạo tài khoản để lưu địa chỉ giao hàng, theo dõi đơn và nhận ưu đãi riêng cho khách hàng mới."
      imageSrc="https://upload.wikimedia.org/wikipedia/commons/1/10/Cerisier_du_Japon_Prunus_serrulata.jpg"
      imageAlt="Mẫu cosplay với ánh sáng điện ảnh"
      imageLabel="Tạo tài khoản mới"
      imageTitle="Tạo tài khoản trong vài bước."
      stats={[
        { value: "7 ngày", label: "đổi trả" },
        { value: "100%", label: "đồng bộ" },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm text-foreground">
            Họ và tên
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Nguyễn Văn A"
              className="h-11 rounded-xl pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email" className="text-sm text-foreground">
            Email
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="register-email"
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
          <Label
            htmlFor="register-password"
            className="text-sm text-foreground"
          >
            Mật khẩu
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="register-password"
              type="password"
              placeholder="Tạo mật khẩu (ít nhất 8 ký tự, 1 chữ hoa, 1 số)"
              className="h-11 rounded-xl pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm text-foreground">
            Xác nhận mật khẩu
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirm-password"
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="h-11 rounded-xl pl-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox
            id="terms"
            className="mt-0.5"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(!!v)}
          />
          <span>
            Tôi đồng ý với{" "}
            <Link href="/" className="font-medium text-primary">
              điều khoản
            </Link>{" "}
            và chính sách bảo mật của shop.
          </span>
        </label>

        <Button
          className="h-11 w-full rounded-full text-base"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          {!isLoading && <ArrowRight data-icon="inline-end" />}
        </Button>

        <p className="pt-2 text-center text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Đăng nhập
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
