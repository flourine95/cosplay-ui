import { Store, Clock, Package, Star, TrendingUp } from "lucide-react"

const cards = [
  {
    label: "Sellers Hoạt động",
    value: "1,204",
    sub: "92% tổng đối tác",
    icon: Store,
    color: "bg-indigo-600",
  },
  {
    label: "Đang chờ duyệt",
    value: "18",
    sub: "Cần xử lý trong 24h",
    icon: Clock,
    color: "bg-amber-500",
  },
  {
    label: "Tổng Sản phẩm",
    value: "24.5k",
    sub: "+1.2k tháng này",
    icon: Package,
    color: "bg-emerald-500",
  },
  {
    label: "Điểm uy tín sàn",
    value: "4.65",
    sub: "Mức: Rất tốt",
    icon: Star,
    color: "bg-purple-500",
  },
]

export default function SellerInsights() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      {cards.map((item, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
        >
          <div
            className={`absolute top-0 right-0 h-24 w-24 ${item.color} rounded-bl-[4rem] opacity-[0.03]`}
          ></div>

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
                {item.label}
              </p>

              <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600">
                {item.value}
              </h3>

              <p className="mt-1 flex items-center gap-1 text-xs font-bold text-slate-500 italic">
                <TrendingUp size={12} className="text-emerald-500" />
                {item.sub}
              </p>
            </div>

            <div
              className={`rounded-2xl p-3 ${item.color} text-white shadow-lg`}
            >
              <item.icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
