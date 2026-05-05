"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Truck, RotateCcw, Shield } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export function CartSummary() {
  const { items, totalPrice, totalItems, clearCart } = useCart()

  const shippingCost = totalItems > 0 ? 35000 : 0
  const finalTotal = totalPrice + shippingCost

  return (
    <div className="sticky top-20 flex flex-col gap-0 rounded-xl border border-border bg-background p-6">
      <h3 className="text-base font-semibold text-foreground">
        Tóm tắt đơn hàng
      </h3>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Tạm tính ({totalItems} sản phẩm)
          </span>
          <span className="font-medium tabular-nums">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Phí vận chuyển</span>
          <span className="font-medium tabular-nums">
            {totalItems > 0 ? formatPrice(shippingCost) : "—"}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between">
        <span className="font-semibold text-foreground">Tổng cộng</span>
        <span className="text-lg font-bold text-foreground tabular-nums">
          {formatPrice(finalTotal)}
        </span>
      </div>

      <Button
        asChild={items.length > 0}
        className="mt-5 w-full rounded-full"
        size="lg"
        disabled={items.length === 0}
      >
        {items.length > 0 ? (
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2"
          >
            Tiến hành thanh toán
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Tiến hành thanh toán
            <ArrowRight className="size-4 shrink-0" />
          </span>
        )}
      </Button>

      <Button asChild variant="outline" className="mt-2 w-full rounded-full">
        <Link href="/products">Tiếp tục mua sắm</Link>
      </Button>

      {items.length > 0 && (
        <button
          onClick={clearCart}
          className="mt-2 w-full py-2 text-xs text-muted-foreground transition-colors hover:text-destructive"
        >
          Xóa toàn bộ giỏ hàng
        </button>
      )}

      {/* Trust signals — dùng design system colors */}
      <div className="mt-5 flex flex-col gap-2 border-t border-border/60 pt-5">
        {[
          { icon: Truck, text: "Giao hàng 2–5 ngày toàn quốc" },
          { icon: Shield, text: "Hàng chính hãng, may thủ công" },
          { icon: RotateCcw, text: "Đổi trả 7 ngày nếu lỗi sản xuất" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5">
            <Icon
              className="size-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span className="text-xs text-muted-foreground">{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
