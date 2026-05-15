"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ArrowRight, Lock } from "lucide-react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function ChangePasswordPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") // từ forgot-password flow

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Nếu có token → reset password flow, không cần đăng nhập
  // Nếu không có token → đổi mật khẩu khi đã đăng nhập
  const isResetFlow = !!token

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }

    setIsLoading(true)

    const endpoint = isResetFlow
      ? "/api/auth/reset-password"
      : "/api/auth/change-password"

    const body = isResetFlow
      ? { token, password: newPassword }
      : { currentPassword, newPassword }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    setIsLoading(false)

    if (!res.ok) {
      setError(data.error)
      return
    }

    router.push(isResetFlow ? "/" : "/profile")
    router.refresh()
  }

  return (
    <AuthShell
      title={isResetFlow ? "Đặt lại mật khẩu" : "Đổi mật khẩu"}
      description="Cập nhật mật khẩu để bảo vệ tài khoản của bạn."
      imageSrc="https://upload.wikimedia.org/wikipedia/commons/1/10/Cerisier_du_Japon_Prunus_serrulata.jpg"
      imageAlt="Người mẫu đứng trong không gian studio tối"
      imageLabel="Bảo mật tài khoản"
      imageTitle="Một mật khẩu mới, an toàn hơn."
      stats={[
        { value: "12 ký tự", label: "khuyến nghị" },
        { value: "2 lớp", label: "bảo vệ" },
      ]}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {!isResetFlow && (
          <div className="space-y-2">
            <Label
              htmlFor="current-password"
              className="text-sm text-foreground"
            >
              Mật khẩu hiện tại
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="current-password"
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                className="h-11 rounded-xl pl-10"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="new-password" className="text-sm text-foreground">
            Mật khẩu mới
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="new-password"
              type="password"
              placeholder="Tạo mật khẩu mới (ít nhất 8 ký tự, 1 chữ hoa, 1 số)"
              className="h-11 rounded-xl pl-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirm-new-password"
            className="text-sm text-foreground"
          >
            Xác nhận mật khẩu mới
          </Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirm-new-password"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              className="h-11 rounded-xl pl-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          Mật khẩu mạnh nên có chữ hoa, chữ thường, số và ký tự đặc biệt.
        </div>

        <Button
          className="h-11 w-full rounded-full text-base"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          {!isLoading && <ArrowRight data-icon="inline-end" />}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {user ? (
            <Link
              href="/profile"
              className="font-medium text-primary hover:text-primary/80"
            >
              Quay lại hồ sơ
            </Link>
          ) : (
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Quay lại đăng nhập
            </Link>
          )}
        </p>
      </form>
    </AuthShell>
  )
}
