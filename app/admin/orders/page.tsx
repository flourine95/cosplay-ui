"use client"

import { useState } from "react"
import { orders } from "@/components/admin/orders/orders.data"
import OrderHeader from "@/components/admin/orders/order-header"
import OrderTabs from "@/components/admin/orders/order-tabs"
import OrderCard from "@/components/admin/orders/order-card"

export default function OrderManagement() {
  const [orderType, setOrderType] = useState("All")

  const filteredOrders = orders.filter(
    (o) => orderType === "All" || o.type === orderType
  )

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <OrderHeader />

      <OrderTabs orderType={orderType} setOrderType={setOrderType} />

      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
