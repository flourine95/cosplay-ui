import { Store, Star, Package, BarChart3, MoreHorizontal } from "lucide-react"

type Seller = {
  id: string
  shopName: string
  owner: string
  email: string
  status: string
  rating: number
  products: number
  revenue: string
  verified: boolean
  joinDate: string
}

type Props = {
  sellers: Seller[]
  filterStatus: string
  setFilterStatus: (value: string) => void
}

export default function SellerTable({
  sellers,
  filterStatus,
  setFilterStatus,
}: Props) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/30 p-6">
        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {["All", "Active", "Pending", "Suspended"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-lg px-4 py-1.5 text-[11px] font-black tracking-wider uppercase transition-all ${
                filterStatus === status
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {status === "All" ? "Tất cả" : status}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <tbody className="divide-y divide-slate-100">
            {sellers.map((seller) => (
              <tr
                key={seller.id}
                className="group transition-colors hover:bg-slate-50/50"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <Store size={24} />
                    </div>

                    <div>
                      <p className="text-sm font-black">{seller.shopName}</p>
                      <p className="text-[11px] text-slate-400">
                        ID: {seller.id} • {seller.joinDate}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <p className="text-sm font-bold">{seller.owner}</p>
                  <p className="text-[11px] text-slate-400">{seller.email}</p>
                </td>

                <td className="px-6 py-5 text-center font-black">
                  {seller.products}
                </td>

                <td className="flex items-center gap-1 px-6 py-5">
                  <Star size={14} className="text-amber-400" />
                  {seller.rating || "N/A"}
                </td>

                <td className="px-6 py-5 font-black">{seller.revenue}</td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase">
                    {seller.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100">
                    <Package size={16} />
                    <BarChart3 size={16} />
                    <MoreHorizontal size={16} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
