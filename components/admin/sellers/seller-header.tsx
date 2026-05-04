import { Store, ShieldAlert } from "lucide-react"

export default function SellerHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <h1 className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900">
          <Store className="text-indigo-600" /> Quản lý Đối tác Seller
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Giám sát hoạt động kinh doanh, phê duyệt gian hàng và quản lý chất
          lượng dịch vụ.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50">
          <ShieldAlert size={16} /> Yêu cầu phê duyệt (12)
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800">
          + Mời Seller mới
        </button>
      </div>
    </div>
  )
}
