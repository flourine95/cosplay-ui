"use client"

import React, { useMemo, useState } from "react"
import RentalModal from "../rental-modal"
import { sellerOrders, orderDetails } from "../seller-data"
import { SectionTitle, Th, Td, StatusPill, Panel } from "../seller-ui"

// 1. Lấy kiểu dữ liệu tự động từ mock data
type OrderType = (typeof sellerOrders)[0]

export default function OrdersSection() {
  const [typeFilter, setTypeFilter] = useState<string>("Tất cả")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = [...sellerOrders]
    if (typeFilter !== "Tất cả")
      result = result.filter((o) => o.orderType === typeFilter)
    if (statusFilter) result = result.filter((o) => o.status === statusFilter)
    return result
  }, [typeFilter, statusFilter])

  const uniqueStatuses = Array.from(
    new Set(
      sellerOrders
        .filter((o) => typeFilter === "Tất cả" || o.orderType === typeFilter)
        .map((o) => o.status)
    )
  )

  return (
    <Panel>
      <SectionTitle
        title="Đơn mua & Thuê"
        desc="Quản lý giao dịch, kiểm soát ngày trả đồ và xử lý tiền cọc cho khách hàng."
      />

      <div className="mt-6 flex border-b border-slate-200">
        {["Tất cả", "Bán đứt", "Thuê"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setTypeFilter(type)
              setStatusFilter(null)
            }}
            className={`px-6 py-3 text-sm font-black transition-all ${
              typeFilter === type
                ? "border-b-2 border-primary text-primary"
                : "border-b-2 border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            Đơn {type}
            <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              {type === "Tất cả"
                ? sellerOrders.length
                : sellerOrders.filter((o) => o.orderType === type).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter(null)}
          className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
            statusFilter === null
              ? "bg-slate-800 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Mọi trạng thái
        </button>
        {uniqueStatuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
              statusFilter === status
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <OrdersTable data={filtered} />
      </div>
    </Panel>
  )
}

export function OrdersTable({ data }: { data: OrderType[] }) {
  const [orders, setOrders] = useState<OrderType[]>(data)

  // 2. Sửa lỗi `useEffect`: Đồng bộ state an toàn theo chuẩn React mới
  const [prevData, setPrevData] = useState<OrderType[]>(data)
  if (data !== prevData) {
    setPrevData(data)
    setOrders(data)
  }

  // 3. Sửa lỗi `any`: Thay bằng OrderType
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  // 4. Sửa lỗi unused vars: Thêm dấu `_` trước amount và notes
  const handleConfirmDeduction = () => {
    if (!selectedOrder) return
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? { ...o, status: "Đã trả đồ (Có trừ cọc)" }
          : o
      )
    )
    setSelectedOrder(null)
  }

  const handleConfirmRefund = () => {
    if (!selectedOrder) return
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: "Hoàn tất" } : o
      )
    )
    setSelectedOrder(null)
  }

  const toggleDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null)
    } else {
      setExpandedOrderId(orderId)
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] border-collapse bg-white text-left text-sm">
          <thead className="bg-slate-50 text-xs tracking-wider text-slate-400 uppercase">
            <tr>
              <Th>Đơn hàng</Th>
              <Th>Loại đơn</Th>
              <Th>Ngày thuê/trả</Th>
              <Th align="center">Tiền cọc</Th>
              <Th align="center">Tổng thanh toán</Th>
              <Th>Trạng thái</Th>
              <Th align="center">Thao tác</Th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className={`group transition duration-300 hover:bg-primary/5 ${expandedOrderId === order.id ? "bg-primary/5" : ""}`}
                >
                  <Td>
                    <div>
                      <p className="font-black text-slate-900">{order.id}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {order.customer} · {order.phone}
                      </p>
                    </div>
                  </Td>
                  <Td>
                    <span
                      className={`rounded px-2 py-1 text-[10px] font-black uppercase ${order.orderType === "Bán đứt" ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"}`}
                    >
                      {order.orderType}
                    </span>
                  </Td>
                  <Td>
                    <span className="font-bold text-slate-600">
                      {order.rentalDates}
                    </span>
                  </Td>
                  <Td align="center">
                    <span className="font-bold text-slate-400">
                      {order.deposit}
                    </span>
                  </Td>
                  <Td align="center">
                    <span className="font-black text-primary">
                      {order.total}
                    </span>
                  </Td>
                  <Td>
                    <StatusPill status={order.status} />
                  </Td>
                  <Td align="center">
                    <div className="flex flex-col items-center gap-2">
                      {order.orderType === "Thuê" &&
                        order.status === "Đang thuê" && (
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-lg bg-orange-100 px-3 py-1.5 text-xs font-black text-orange-700 transition hover:bg-orange-200"
                          >
                            Nhận lại đồ
                          </button>
                        )}

                      <button
                        onClick={() => toggleDetails(order.id)}
                        className={`text-xs font-bold transition ${expandedOrderId === order.id ? "text-primary" : "text-slate-400 hover:text-primary"}`}
                      >
                        {expandedOrderId === order.id
                          ? "Đóng chi tiết ▲"
                          : "Xem chi tiết ▼"}
                      </button>
                    </div>
                  </Td>
                </tr>

                {expandedOrderId === order.id && (
                  <tr>
                    <td
                      colSpan={7}
                      className="border-b border-slate-100 bg-slate-50/80 p-0"
                    >
                      <div className="animate-in p-6 duration-200 fade-in slide-in-from-top-2">
                        <p className="mb-4 text-xs font-black tracking-widest text-slate-400 uppercase">
                          Danh sách sản phẩm cần giao
                        </p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {orderDetails.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                            >
                              <div>
                                <p className="font-bold text-slate-900">
                                  {detail.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {detail.desc}
                                </p>
                              </div>
                              <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                                {detail.qty}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 flex gap-3 border-t border-slate-200 pt-4">
                          <button className="rounded-lg bg-primary px-4 py-2 text-xs font-black text-white shadow-sm transition hover:bg-primary/90">
                            In hóa đơn
                          </button>
                          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50">
                            Liên hệ người mua
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <RentalModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onConfirmDeduction={handleConfirmDeduction}
        onConfirmRefund={handleConfirmRefund}
      />
    </div>
  )
}
