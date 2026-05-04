import { Mail, Eye, Edit2, Ban } from "lucide-react"

type User = {
  id: string
  name: string
  email: string
  role: string
  status: string
  orders: number
  spent: string
  joinDate: string
}

export default function UserRow({ user }: { user: User }) {
  return (
    <tr className="group transition-colors hover:bg-slate-50">
      {/* USER */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 ring-2 ring-white">
            {user.name.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-bold text-slate-900">{user.name}</p>
            <p className="flex items-center gap-1 text-[11px] text-slate-400">
              <Mail size={10} />
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* ROLE (MÀU ĐẸP HƠN) */}
      <td className="px-6 py-4">
        <span
          className={`rounded-lg border px-2.5 py-1 text-[10px] font-black tracking-wide uppercase ${
            user.role === "Seller"
              ? "border-amber-100 bg-amber-50 text-amber-600"
              : "border-blue-100 bg-blue-50 text-blue-600"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* STATUS (ĐỒNG BỘ MÀU DASHBOARD) */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <div
            className={`h-2 w-2 rounded-full ${
              user.status === "Active"
                ? "animate-pulse bg-emerald-500"
                : "bg-slate-300"
            }`}
          ></div>

          <span
            className={`text-xs font-bold ${
              user.status === "Active" ? "text-emerald-600" : "text-slate-400"
            }`}
          >
            {user.status}
          </span>
        </div>
      </td>

      {/* ORDERS */}
      <td className="px-6 py-4 text-center">
        <span className="text-sm font-bold text-slate-700">{user.orders}</span>
      </td>

      {/* SPENT */}
      <td className="px-6 py-4">
        <p className="text-sm font-black text-slate-900">{user.spent}</p>
      </td>

      {/* DATE */}
      <td className="px-6 py-4 text-xs text-slate-500">{user.joinDate}</td>

      {/* ACTIONS (UI ĐẸP HƠN + CONSISTENT MÀU) */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition group-hover:opacity-100">
          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600">
            <Eye size={16} />
          </button>

          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <Edit2 size={16} />
          </button>

          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600">
            <Ban size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
