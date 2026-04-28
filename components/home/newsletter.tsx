"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="bg-muted/30 py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Ưu đãi chỉ dành cho người đăng ký
            </h2>
            <p className="text-sm text-muted-foreground">
              Bộ sưu tập mới, khuyến mãi và sự kiện cosplay — thẳng vào hộp thư.
            </p>
          </div>
          <form
            className="flex w-full max-w-sm shrink-0 gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              setEmail("")
            }}
          >
            <Input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="shrink-0 rounded-full">
              Đăng ký
              <ArrowRight data-icon="inline-end" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
