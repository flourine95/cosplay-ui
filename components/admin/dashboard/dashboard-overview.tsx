"use client"

import {
  DollarSign,
  Clock,
  Scissors,
  CheckCircle2,
  Activity,
  AlertCircle,
} from "lucide-react"
import StatCard from "./stat-card"
import ProgressItem from "./progress-item"
import DeadlineCard from "./deadline-card"
import SellerItem from "./seller-item"

export default function DashboardOverview() {
  return (
    <div className="mx-auto max-w-[1600px] animate-in space-y-8 duration-700 fade-in slide-in-from-bottom-4">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Trung tâm Điều hành
          </h1>
          <p className="mt-1 font-medium text-slate-500 italic">
            {"Mọi đường kim mũi chỉ đều được kiểm soát hoàn hảo."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md">
              Tổng quan
            </button>
            <button className="px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:text-slate-700">
              Theo tháng
            </button>
          </div>
          <button className="rounded-2xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-xl shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 active:scale-95">
            Tạo thông báo khẩn
          </button>
        </div>
      </div>

      {/* Main Stat Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Doanh thu dự kiến"
          value="1.450B"
          change="+18.4%"
          isPositive={true}
          icon={<DollarSign size={24} />}
          theme="indigo"
        />
        <StatCard
          label="Đơn thuê hoạt động"
          value="482"
          change="+12.5%"
          isPositive={true}
          icon={<Clock size={24} />}
          theme="emerald"
        />
        <StatCard
          label="May mới trong ngày"
          value="12"
          change="-2.1%"
          isPositive={false}
          icon={<Scissors size={24} />}
          theme="rose"
        />
        <StatCard
          label="Tỷ lệ hoàn thành"
          value="94.2%"
          change="+5.7%"
          isPositive={true}
          icon={<CheckCircle2 size={24} />}
          theme="amber"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Left Column: Progress & Deadlines */}
        <div className="space-y-8 xl:col-span-2">
          {/* Tiến độ đặt may đồ (Bespoke Progress) */}
          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-pink-100 p-2 text-pink-600">
                  <Activity size={20} />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-800">
                  Tiến độ may đo (Custom-made)
                </h3>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                Đang thực hiện: 24 đơn
              </span>
            </div>
            <div className="space-y-6 p-6">
              <ProgressItem
                order="#MK-5521"
                character="Genshin Impact - Raiden Shogun"
                client="Ngô Thanh Vân"
                progress={75}
                step="Gắn phụ kiện LED"
                dueDate="Còn 3 ngày"
              />
              <ProgressItem
                order="#MK-5548"
                character="League of Legends - Ahri"
                client="Phạm Bảo Nhi"
                progress={40}
                step="Dựng form váy & đuôi"
                dueDate="Còn 12 ngày"
                isDelayed={true}
              />
              <ProgressItem
                order="#MK-5582"
                character="Fate/Stay Night - Saber"
                client="Lâm Tuấn Kiệt"
                progress={95}
                step="Kiểm tra lần cuối"
                dueDate="Ngày mai"
              />
            </div>
          </section>

          {/* Biểu đồ Doanh thu nâng cao */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-indigo-50/50 blur-3xl"></div>
            <div className="relative z-10">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Phân tích hiệu quả kinh doanh
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    So sánh giữa dịch vụ Thuê và Đặt may
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase">
                      Thuê đồ
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-pink-400"></div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase">
                      Đặt may
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-72 w-full items-end justify-between gap-4 px-2">
                {[
                  { r: 40, c: 20 },
                  { r: 55, c: 35 },
                  { r: 35, c: 45 },
                  { r: 75, c: 60 },
                  { r: 65, c: 40 },
                  { r: 90, c: 75 },
                  { r: 85, c: 70 },
                ].map((data, i) => (
                  <div
                    key={i}
                    className="group/bar flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                  >
                    <div className="flex h-full w-full max-w-[40px] flex-col justify-end gap-1">
                      {/* Cột thuê đồ */}
                      <div
                        className="w-full rounded-t-lg bg-indigo-500/90 shadow-sm transition-all duration-500 hover:bg-indigo-600"
                        style={{ height: `${data.r}%` }}
                      ></div>
                      {/* Cột đặt may */}
                      <div
                        className="w-full rounded-t-md bg-pink-400/90 shadow-sm transition-all duration-700 hover:bg-pink-500"
                        style={{ height: `${data.c}%` }}
                      ></div>
                    </div>
                    <span className="mt-2 text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
                      T{i + 2}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Notifications */}
        <div className="space-y-8">
          {/* Danh sách người thuê gần hạn trả */}
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900 p-6 text-white shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-bold italic">
                <AlertCircle className="text-rose-500" size={20} />
                Hạn trả đồ (Rentals)
              </h3>
              <button className="text-[11px] font-bold text-slate-400 transition-colors hover:text-white">
                Xem lịch
              </button>
            </div>

            <div className="space-y-4">
              <DeadlineCard
                name="Trần Thúy Vy"
                item="Kimono Demon Slayer"
                time="2 giờ nữa"
                urgency="high"
                id="RT-4421"
              />
              <DeadlineCard
                name="Lê Quốc Bảo"
                item="Giáp Master Chief"
                time="Hôm nay, 18:00"
                urgency="medium"
                id="RT-4425"
              />
              <DeadlineCard
                name="Nguyễn Hà My"
                item="Váy Lolita Pinky"
                time="Ngày mai"
                urgency="low"
                id="RT-4430"
              />
            </div>

            <button className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-800 py-3 text-xs font-bold text-indigo-400 transition-all hover:bg-slate-700">
              Nhắc nhở tự động tất cả
            </button>
          </section>

          {/* Quick Categories Distribution */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold tracking-tight text-slate-800">
              Top Sellers Tuần
            </h3>
            <div className="space-y-6">
              <SellerItem
                name="Wibu Shop"
                sales="154 đơn"
                growth="+12%"
                avatar="W"
              />
              <SellerItem
                name="Cosplay Pro"
                sales="122 đơn"
                growth="+8%"
                avatar="C"
              />
              <SellerItem
                name="Moe Costume"
                sales="98 đơn"
                growth="-2%"
                avatar="M"
              />
            </div>
          </div>

          {/* Revenue Source */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-xl">
            <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-150"></div>
            <h4 className="mb-1 text-sm font-medium text-white/80">
              Số dư phí sàn khả dụng
            </h4>
            <div className="mb-6 text-3xl font-black tracking-tight">
              42.850.000 đ
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-xl bg-white py-2.5 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-50">
                Đối soát
              </button>
              <button className="flex-1 rounded-xl bg-white/20 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/30">
                Rút tiền
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
