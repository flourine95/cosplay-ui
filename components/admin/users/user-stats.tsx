import { Users, TrendingUp, Ban } from "lucide-react"

export default function UserStats() {
  const stats = [
    {
      label: "Tổng user",
      value: "12,840",
      icon: Users,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    {
      label: "User mới",
      value: "+452",
      icon: TrendingUp,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Bị khóa",
      value: "18",
      icon: Ban,
      bg: "bg-rose-50",
      text: "text-rose-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.bg} ${s.text}`}
          >
            <s.icon size={24} />
          </div>

          <div>
            <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              {s.label}
            </p>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
