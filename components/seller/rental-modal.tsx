"use client"

import { useState } from "react"
import { X } from "lucide-react"

// 1. Định nghĩa kiểu dữ liệu cho Đơn thuê để diệt 'any'
export interface RentalOrder {
  id: string
  customer: string
  // Nếu sau này có thêm các trường khác thì bạn cứ khai báo thêm vào đây nhé
}

// 2. Gom type của props lại cho gọn gàng
interface RentalModalProps {
  order: RentalOrder | null
  onClose: () => void
  onConfirmDeduction: (amount: number, notes: string) => void
  onConfirmRefund: () => void
}

export default function RentalModal({
  order,
  onClose,
  onConfirmDeduction,
  onConfirmRefund,
}: RentalModalProps) {
  const [deduct, setDeduct] = useState(0)
  const [notes, setNotes] = useState("")

  if (!order) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-w-xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-black">Nhận lại đồ: {order.id}</h3>
            <p className="text-sm text-slate-500">Khách: {order.customer}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block text-sm font-bold">Tình trạng trả</label>
          <div className="grid gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" /> Có rách
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" /> Có dính bẩn
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" /> Thiếu phụ kiện
            </label>
          </div>

          <div>
            <label className="block text-sm font-bold">
              Số tiền trừ cọc (VNĐ)
            </label>
            <input
              type="number"
              value={deduct}
              onChange={(e) => setDeduct(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-bold">
              Ghi chú lỗi/vi phạm
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => {
              onConfirmDeduction(deduct, notes)
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-black text-white"
          >
            Áp dụng trừ cọc
          </button>

          <button
            onClick={() => {
              onConfirmRefund()
            }}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold"
          >
            Xác nhận hoàn cọc
          </button>

          <button onClick={onClose} className="ml-auto text-sm text-slate-500">
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}
