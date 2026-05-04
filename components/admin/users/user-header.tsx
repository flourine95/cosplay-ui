import { Filter, UserPlus } from "lucide-react"

export default function UserHeader() {
  return (
    <div className="mx-auto max-w-[1600px] animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Quản lý Người dùng
          </h1>
          <p className="text-sm text-slate-500">
            Xem danh sách, phân quyền và trạng thái hoạt động của thành viên.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50">
            <Filter size={16} /> Bộ lọc
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700">
            <UserPlus size={16} /> Thêm User mới
          </button>
        </div>
      </div>
    </div>
  )
}
