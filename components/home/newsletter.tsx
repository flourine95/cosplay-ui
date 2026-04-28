"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="bg-gradient-to-r from-violet-600 to-pink-500 py-16">
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
        <h2 className="text-2xl font-extrabold text-white md:text-3xl">
          Nhận ưu đãi độc quyền
        </h2>
        <p className="mt-2 text-white/80">
          Đăng ký nhận thông báo về bộ sưu tập mới, khuyến mãi và sự kiện
          cosplay.
        </p>
        <form
          className="mt-6 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            setEmail("")
          }}
        >
          <Input
            type="email"
            placeholder="Email của bạn..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-white/50 bg-white/25 text-white placeholder:text-white/70 focus-visible:border-white focus-visible:ring-white"
            required
          />
          <Button
            type="submit"
            className="shrink-0 bg-white text-violet-700 hover:bg-white/90"
          >
            <Send data-icon="inline-start" />
            Đăng ký
          </Button>
        </form>
        <p className="mt-3 text-xs text-white/60">
          Không spam. Hủy đăng ký bất cứ lúc nào.
        </p>
      </div>
    </section>
  )
}
