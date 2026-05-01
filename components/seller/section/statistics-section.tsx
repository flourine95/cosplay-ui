import { TrendingUp, TrendingDown, PieChart, Trophy } from "lucide-react"
import { topMetrics, revenueByModel, topProducts } from "../seller-data"
import { Panel, SectionTitle } from "../seller-ui"

export default function StatisticsSection() {
  return (
    <div className="space-y-7">
      <Panel>
        <SectionTitle
          title="Báo cáo hiệu suất kinh doanh"
          desc="Phân tích doanh thu theo từng mô hình Bán - Thuê - May đo và các sản phẩm chủ lực."
        />

        {/* BỘ 3 CHỈ SỐ QUAN TRỌNG NHẤT */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {topMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="text-xs font-black tracking-wider text-slate-400 uppercase">
                {metric.label}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <p className="text-3xl font-black text-slate-900">
                  {metric.value}
                </p>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-black ${
                    metric.isUp
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {metric.isUp ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BIỂU ĐỒ & TOP SẢN PHẨM */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Cột Trái: Doanh thu theo mô hình */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-slate-900">
              <PieChart className="h-5 w-5 text-primary" />
              Cơ cấu Doanh thu
            </h3>

            <div className="space-y-6">
              {revenueByModel.map((item) => (
                <div key={item.model}>
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-black uppercase ${item.bgLight} ${item.text}`}
                    >
                      {item.model}
                    </span>
                    <span className="text-sm font-black text-slate-900">
                      {item.amount}
                    </span>
                  </div>
                  {/* Thanh Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-sm font-bold text-slate-400">
                      {item.percent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cột Phải: Bảng xếp hạng Sản phẩm */}
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-black text-slate-900">
              <Trophy className="h-5 w-5 text-amber-500" />
              Sản phẩm chủ lực (Top Performing)
            </h3>

            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 transition hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-400 transition group-hover:bg-primary/10 group-hover:text-primary">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{product.name}</p>
                      <p className="text-xs font-medium text-slate-500">
                        {product.type} ·{" "}
                        <span className="font-bold text-primary">
                          {product.value}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase">
                      Mang về
                    </p>
                    <p className="font-black text-slate-900">{product.rev}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}
