"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Clock,
  DollarSign,
  MessageSquare,
  Scissors,
} from "lucide-react"
import { Panel, SectionTitle } from "../seller-ui"

// 1. Định nghĩa các interface chi tiết để diệt tận gốc 'any'
export interface TailoringTimelineStep {
  label: string
  done: boolean
}

export interface ChangeRequest {
  time: string
  text: string
}

export interface TailoringOrder {
  id: string
  status:
    | "Chờ báo giá"
    | "Chờ cọc"
    | "Đang gia công"
    | "Yêu cầu chỉnh sửa"
    | string
  item: string
  customer: string
  note: string
  measurements: Record<string, string | number>
  references?: string[]
  timeline?: TailoringTimelineStep[]
  changeRequests?: ChangeRequest[]
}

interface TailoringSectionProps {
  data: TailoringOrder[]
}

export default function TailoringSection({ data }: TailoringSectionProps) {
  // 2. Thay thế any bằng TailoringOrder
  const [selected, setSelected] = useState<TailoringOrder | null>(
    data?.[0] ?? null
  )

  // Hàm render trạng thái có màu sắc
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Chờ báo giá":
        return (
          <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-black text-pink-700 uppercase">
            Chờ báo giá
          </span>
        )
      case "Chờ cọc":
        return (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-700 uppercase">
            Chờ cọc
          </span>
        )
      case "Đang gia công":
        return (
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-black text-sky-700 uppercase">
            Đang gia công
          </span>
        )
      case "Yêu cầu chỉnh sửa":
        return (
          <span className="animate-pulse rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-black text-rose-700 uppercase">
            Khách đòi sửa
          </span>
        )
      default:
        return (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700 uppercase">
            {status}
          </span>
        )
    }
  }

  return (
    <Panel>
      <SectionTitle
        title="Không gian Đặt May (Tailoring)"
        desc="Quản lý yêu cầu may đo, báo giá, cập nhật tiến độ cắt may và phản hồi khách hàng."
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[350px_1fr]">
        {/* CỘT TRÁI: DANH SÁCH ĐƠN (MASTER) */}
        <div className="flex max-h-[700px] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
          <div className="border-b border-slate-200 bg-white p-4">
            <h3 className="text-sm font-black text-slate-900">
              Danh sách yêu cầu ({data.length})
            </h3>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {data.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelected(order)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                  selected?.id === order.id
                    ? "border-primary bg-white shadow-md ring-1 ring-primary/20"
                    : "border-slate-200 bg-white hover:border-primary/50"
                }`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <span className="text-xs font-black text-slate-500">
                    {order.id}
                  </span>
                  {getStatusBadge(order.status)}
                </div>
                <p className="line-clamp-1 font-bold text-slate-900">
                  {order.item}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Khách: {order.customer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: CHI TIẾT & XỬ LÝ (DETAILS) */}
        {selected ? (
          <div className="flex min-h-[700px] flex-col rounded-3xl border border-slate-100 bg-white shadow-sm">
            {/* Header thông tin */}
            <div className="border-b border-slate-100 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {selected.item}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Khách hàng:{" "}
                    <span className="font-bold text-slate-700">
                      {selected.customer}
                    </span>
                  </p>
                </div>
                {getStatusBadge(selected.status)}
              </div>
              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-500">
                  Ghi chú yêu cầu:
                </p>
                <p className="mt-1 text-sm font-medium text-slate-800 italic">
                  &quot;{selected.note}&quot;
                </p>
              </div>
            </div>

            <div className="grid flex-1 gap-6 p-6 md:grid-cols-2">
              {/* Phần cố định: Số đo & Hình ảnh */}
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                    <Scissors className="h-4 w-4 text-primary" /> Bảng số đo
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selected.measurements).map(([k, v]) => (
                      <div
                        key={k}
                        className="rounded-lg border border-slate-100 bg-slate-50 p-2"
                      >
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          {k}
                        </p>
                        <p className="text-sm font-black text-slate-700">
                          {v as string}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-black text-slate-900">
                    Ảnh Reference
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(selected.references || []).map(
                      (src: string, i: number) => (
                        <div
                          key={i}
                          className="h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                        >
                          {/* Thay bằng thẻ <img> thật khi có link thật */}
                          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                            Ảnh {i + 1}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Phần linh hoạt: THAY ĐỔI THEO TRẠNG THÁI (CONDITIONAL RENDERING) */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                {/* 1. Nếu đang "Chờ báo giá" -> Hiện form báo giá */}
                {selected.status === "Chờ báo giá" && (
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-black text-pink-700">
                      <DollarSign className="h-4 w-4" /> Lập Báo Giá
                    </h3>
                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        Tổng chi phí dự kiến (VNĐ)
                      </label>
                      <input
                        type="number"
                        placeholder="VD: 1500000"
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        Tiền cọc yêu cầu (VNĐ)
                      </label>
                      <input
                        type="number"
                        placeholder="VD: 500000"
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600">
                        Thời gian hoàn thành (Ngày)
                      </label>
                      <input
                        type="number"
                        placeholder="VD: 14"
                        className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm"
                      />
                    </div>
                    <button className="w-full rounded-lg bg-pink-600 py-2.5 text-sm font-black text-white shadow-md transition hover:bg-pink-700">
                      Gửi báo giá cho khách
                    </button>
                  </div>
                )}

                {/* 2. Nếu đang "Đang gia công" -> Hiện Timeline tiến độ */}
                {selected.status === "Đang gia công" && selected.timeline && (
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black text-sky-700">
                      <Clock className="h-4 w-4" /> Cập nhật tiến độ
                    </h3>
                    <div className="relative space-y-3 before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-slate-200">
                      {selected.timeline.map((t, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-center gap-4"
                        >
                          <div
                            className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${t.done ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}
                          >
                            {t.done && <CheckCircle2 className="h-4 w-4" />}
                          </div>
                          <div className="flex flex-1 items-center justify-between rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
                            <span
                              className={`text-sm font-bold ${t.done ? "text-slate-800" : "text-slate-400"}`}
                            >
                              {t.label}
                            </span>
                            {!t.done &&
                              idx ===
                                (selected.timeline?.findIndex((x) => !x.done) ??
                                  -1) && (
                                <button className="rounded bg-primary/10 px-2 py-1 text-[10px] font-black text-primary transition hover:bg-primary hover:text-white">
                                  Xong bước này
                                </button>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Nếu đang "Yêu cầu chỉnh sửa" -> Hiện Box Chat phản hồi */}
                {selected.status === "Yêu cầu chỉnh sửa" &&
                  selected.changeRequests && (
                    <div className="flex h-full flex-col">
                      <h3 className="mb-4 flex items-center gap-2 text-sm font-black text-rose-700">
                        <MessageSquare className="h-4 w-4" /> Xử lý yêu cầu sửa
                      </h3>

                      {/* Tin nhắn của khách */}
                      <div className="mb-4 rounded-xl rounded-tl-none bg-white p-3 shadow-sm ring-1 ring-slate-100">
                        <p className="mb-1 text-xs font-bold text-slate-400">
                          {selected.customer} ({selected.changeRequests[0].time}
                          )
                        </p>
                        <p className="text-sm font-medium text-slate-800">
                          {selected.changeRequests[0].text}
                        </p>
                      </div>

                      {/* Khung chat phản hồi */}
                      <div className="mt-auto">
                        <label className="text-xs font-bold text-slate-600">
                          Phản hồi của xưởng may:
                        </label>
                        <textarea
                          placeholder="VD: Dạ shop đã nhận thông tin, sẽ bóp eo và nối ren cho bạn nhé..."
                          className="mt-1 min-h-[80px] w-full rounded-xl border border-slate-200 p-3 text-sm"
                        />
                        <div className="mt-3 flex gap-2">
                          <button className="flex-1 rounded-lg bg-emerald-500 py-2 text-sm font-black text-white shadow-md transition hover:bg-emerald-600">
                            Đồng ý sửa
                          </button>
                          <button className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600 transition hover:bg-rose-100">
                            Từ chối
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
            <Scissors className="mb-2 h-8 w-8 opacity-50" />
            <p className="font-bold">Chọn một đơn bên trái để xem chi tiết</p>
          </div>
        )}
      </div>
    </Panel>
  )
}
