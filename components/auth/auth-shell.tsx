import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AuthShellProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imageLabel: string
  imageTitle: string
  imageDescription: string
  stats: Array<{ label: string; value: string }>
  children: React.ReactNode
  className?: string
}

export function AuthShell({
  title,
  description,
  imageSrc,
  imageAlt,
  imageLabel,
  imageTitle,
  imageDescription,
  stats,
  children,
  className,
}: AuthShellProps) {
  return (
    <section className="dark min-h-screen bg-[radial-gradient(circle_at_top,_rgba(110,84,255,0.18)_0%,_rgba(10,10,20,0.98)_42%,_rgba(6,8,14,1)_100%)] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div
        className={cn(
          "mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_32px_120px_rgba(3,4,15,0.45)] backdrop-blur-xl lg:grid-cols-[1.02fr_0.98fr]",
          className
        )}
      >
        <div className="relative hidden min-h-[560px] overflow-hidden bg-[#161129] p-5 text-white lg:flex lg:flex-col lg:justify-between">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,14,31,0.12)_0%,rgba(17,14,31,0.26)_44%,rgba(10,10,20,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(147,197,253,0.15),_transparent_32%)]" />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <Link
              href="/"
              className="text-2xl font-semibold tracking-[0.18em] text-white/95 uppercase"
            >
              cosplay.vn
            </Link>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 bg-white/10 text-white hover:bg-white/16"
            >
              <Link href="/">
                Quay về cửa hàng
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <div className="relative z-10 flex max-w-xl flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md">
              <Sparkles className="size-4 text-brand" />
              {imageLabel}
            </div>
            <div className="space-y-4">
              <h2 className="max-w-lg text-4xl leading-tight font-semibold tracking-tight text-white md:text-5xl">
                {imageTitle}
              </h2>
              <p className="max-w-xl text-base leading-7 text-white/70 md:text-lg">
                {imageDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-md"
                >
                  <div className="text-2xl font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-[0.2em] text-white/55 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between gap-4">
            <div className="max-w-sm text-sm text-white/68">
              Tài khoản của bạn luôn đồng bộ với đơn hàng, yêu thích và lịch sử
              mua sắm trên toàn bộ website.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-10 rounded-full bg-white/25" />
              <span className="h-1.5 w-10 rounded-full bg-white/25" />
              <span className="h-1.5 w-10 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <div className="flex items-center bg-background/92 px-5 py-8 sm:px-8 md:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex items-center justify-between gap-3 lg:hidden">
              <Link
                href="/"
                className="text-lg font-semibold tracking-[0.16em] text-foreground uppercase"
              >
                cosplay.vn
              </Link>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Link href="/">Quay về cửa hàng</Link>
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium tracking-[0.24em] text-brand uppercase">
                {imageLabel}
              </p>
              <h1 className="text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                {description}
              </p>
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-border/70 bg-card/90 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
