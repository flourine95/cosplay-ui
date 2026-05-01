import { sellerKpis, sellerOrders } from "../seller-data"
import { SectionTitle, Panel } from "../seller-ui"
import { OrdersTable } from "./orders-section"

export default function DashboardSection() {
  return (
    <div className="space-y-7">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sellerKpis.map((stat) => (
          <div
            key={stat.label}
            className="group overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-wider text-slate-400 uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 text-4xl font-black text-slate-950">
                  {stat.value}
                </p>
              </div>
              <span className="rounded-2xl bg-primary/20 px-3 py-1.5 text-xs font-black text-primary">
                Live
              </span>
            </div>

            <div className="my-4 border-t border-dashed border-slate-200" />
            <p className="text-sm font-semibold text-slate-500">{stat.note}</p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-primary to-secondary/30 transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        ))}
      </div>

      <Panel>
        <SectionTitle
          title="Đơn hàng mới"
          desc="Danh sách chia dạng bảng, có đường kẻ rõ giữa từng cột và từng dòng."
        />
        <div className="mt-5">
          <OrdersTable data={sellerOrders.slice(0, 5)} />
        </div>
      </Panel>
    </div>
  )
}
