"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Menu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const navLinks = [
  { label: "Mua ngay", href: "#shop" },
  { label: "Thuê trang phục", href: "#rent" },
  { label: "Đặt may", href: "#custom" },
  { label: "Bộ sưu tập", href: "#collections" },
  { label: "Blog", href: "#blog" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-pink-500">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              cosplay
            </span>
            <span className="text-foreground">.vn</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart />
            <Badge className="absolute -top-1 -right-1 size-4 justify-center border-0 bg-gradient-to-r from-violet-600 to-pink-500 p-0 text-[10px]">
              3
            </Badge>
          </Button>
          <Button
            className="hidden bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:opacity-90 md:flex"
            size="sm"
          >
            Đăng nhập
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex items-center gap-2 pb-4">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-pink-500">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="text-lg font-bold">
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                cosplay
              </span>
              .vn
            </span>
          </div>
          <Separator />
          <nav className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <Button className="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white hover:opacity-90">
              Đăng nhập
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
