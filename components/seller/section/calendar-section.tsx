import { useState } from "react"
import { rentalSchedules } from "../seller-data"
import { Panel, SectionTitle } from "../seller-ui"
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Clock,
  Package,
  RefreshCcw,
  Wrench,
} from "lucide-react"

export default function CalendarSection() {
  // 1. STATE QUẢN LÝ NGÀY ĐANG CHỌN (Mặc định là hôm nay 30/04/2026)
  const [selectedDateStr, setSelectedDateStr] = useState("30/04/2026")

  const calendarDays = [
    { day: 30, isCurrent: false, isToday: false }, // Bổ sung isToday
    { day: 31, isCurrent: false, isToday: false }, // Bổ sung isToday
    ...Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      isCurrent: true,
      isToday: i + 1 === 30,
    })),
    { day: 1, isCurrent: false, isToday: false },
    { day: 2, isCurrent: false, isToday: false },
    { day: 3, isCurrent: false, isToday: false },
  ]

  // Hàm helper lấy ngày chuẩn
  const getDateString = (
    day: number,
    isCurrentMonth: boolean,
    index: number
  ) => {
    if (isCurrentMonth) return `${String(day).padStart(2, "0")}/04/2026`
    if (index < 10) return `${String(day).padStart(2, "0")}/03/2026` // Tháng trước
    return `${String(day).padStart(2, "0")}/05/2026` // Tháng sau
  }

  // 2. LỌC CÔNG VIỆC THEO NGÀY ĐANG CHỌN
  const selectedTasks = rentalSchedules.filter(
    (item) => item.date === selectedDateStr
  )

  return (
    <Panel>
      <SectionTitle
        title="Lịch trình Thuê & Bảo trì"
        desc="Bấm vào các ngày trên lịch để xem chi tiết. Thêm lịch bảo trì để khóa ngày, tránh khách đặt trùng."
        right={
          <button className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-amber-500/20 transition hover:-translate-y-1 hover:bg-amber-600">
            <Plus className="h-4 w-4" />
            Khóa lịch / Bảo trì
          </button>
        }
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* CỘT TRÁI: BẢNG LỊCH */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="text-lg font-black text-slate-900">Tháng 4, 2026</h3>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-primary">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSelectedDateStr("30/04/2026")} // Bấm "Hôm nay" thì quay về 30/04
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600 transition hover:bg-slate-200"
              >
                Hôm nay
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-primary">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-2 grid grid-cols-7 gap-2">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-black text-slate-400"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((calDay, index) => {
                const dateStr = getDateString(
                  calDay.day,
                  calDay.isCurrent,
                  index
                )
                const events = rentalSchedules.filter((s) => s.date === dateStr)
                const isSelected = selectedDateStr === dateStr // Kiểm tra xem ô này có đang được bấm chọn không

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedDateStr(dateStr)} // 3. SỰ KIỆN CLICK ĐỂ CHỌN NGÀY
                    className={`min-h-[100px] cursor-pointer rounded-xl border p-2 transition hover:border-primary/50 ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : calDay.isToday
                          ? "border-slate-300 bg-slate-50"
                          : "border-slate-100 bg-white"
                    }`}
                  >
                    <p
                      className={`text-sm font-bold ${
                        isSelected
                          ? "text-primary"
                          : calDay.isToday
                            ? "text-slate-800"
                            : calDay.isCurrent
                              ? "text-slate-700"
                              : "text-slate-300"
                      }`}
                    >
                      {calDay.day}
                    </p>

                    <div className="mt-1 flex flex-col gap-1">
                      {events.map((ev, i) => {
                        let colorClass = "bg-slate-100 text-slate-600"
                        if (ev.type === "Giao hàng")
                          colorClass = "bg-sky-100 text-sky-700"
                        if (ev.type === "Nhận trả")
                          colorClass = "bg-orange-100 text-orange-700"
                        if (ev.type === "Bảo trì")
                          colorClass = "bg-amber-100 text-amber-700"

                        return (
                          <div
                            key={i}
                            className={`truncate rounded px-1.5 py-1 text-[10px] font-bold ${colorClass}`}
                            title={`${ev.title} - ${ev.customer}`}
                          >
                            {ev.type === "Giao hàng" && "Giao: "}
                            {ev.type === "Nhận trả" && "Nhận: "}
                            {ev.type === "Bảo trì" && "🔧 "}
                            {ev.title}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: AGENDA THEO NGÀY ĐANG CHỌN */}
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                <CalendarIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {selectedDateStr === "30/04/2026"
                    ? "Hôm nay cần làm gì?"
                    : "Danh sách công việc"}
                </h3>
                <p className="text-xs font-bold text-primary">
                  Ngày {selectedDateStr}
                </p>
              </div>
            </div>

            {selectedTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-white py-8 text-center">
                <Clock className="mb-2 h-6 w-6 text-primary/40" />
                <p className="text-sm font-bold text-slate-500">
                  Ngày này rảnh rỗi!
                </p>
                <p className="text-xs text-slate-400">
                  Không có lịch giao nhận hay bảo trì.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedTasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-black uppercase ${
                          task.type === "Giao hàng"
                            ? "bg-sky-100 text-sky-700"
                            : task.type === "Nhận trả"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {task.type === "Giao hàng" && (
                          <Package className="h-3 w-3" />
                        )}
                        {task.type === "Nhận trả" && (
                          <RefreshCcw className="h-3 w-3" />
                        )}
                        {task.type === "Bảo trì" && (
                          <Wrench className="h-3 w-3" />
                        )}
                        {task.type}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {task.time}
                      </span>
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{task.title}</p>
                      <p className="text-xs text-slate-500">
                        Khách: {task.customer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-5">
            <h4 className="mb-3 text-xs font-black tracking-widest text-slate-400 uppercase">
              Chú giải màu sắc
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-sky-200"></div>
                <span className="text-xs font-bold text-slate-600">
                  Giao đồ đi (Bắt đầu thuê)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-orange-200"></div>
                <span className="text-xs font-bold text-slate-600">
                  Khách trả đồ (Hết hạn)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-amber-200"></div>
                <span className="text-xs font-bold text-slate-600">
                  Bảo trì / Giặt ủi (Khóa lịch)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
