"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="bg-brand-subtle py-16">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 text-center md:p-12">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
              Newsletter
            </p>
            <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">
              Nhận ưu đãi độc quyền
            </h2>
            <p className="mt-2 text-muted-foreground">
              Đăng ký nhận thông báo về bộ sưu tập mới, khuyến mãi và sự kiện
              cosplay.
            </p>
          </div>
          <form
            className="flex gap-2"
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
              className="flex-1"
              required
            />
            <Button type="submit" className="shrink-0">
              <Send data-icon="inline-start" />
              Đăng ký
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            Không spam. Hủy đăng ký bất cứ lúc nào.
          </p>
        </div>
      </div>
    </section>
  )
}
