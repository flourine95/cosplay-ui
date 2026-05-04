import { ArrowDownRight, ArrowUpRight, Landmark, Wallet } from "lucide-react"
import { financialStats, transactionHistory } from "../seller-data"
import { Panel, SectionTitle, Td, Th } from "../seller-ui"

export default function RevenueSection() {
  return (
    <div className="space-y-7">
      {/* KHỐI 1: TỔNG QUAN TÀI CHÍNH */}
      <div className="grid gap-5 md:grid-cols-3">
        {financialStats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-dashed border-slate-100 pb-4">
              <p className="text-sm font-black tracking-wider text-slate-500 uppercase">
                {stat.label}
              </p>
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                <Wallet className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-5 text-4xl font-black text-slate-900">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-400">
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      {/* KHỐI 2: LỊCH SỬ DÒNG TIỀN (TRANSACTIONS) */}
      <Panel>
        <SectionTitle
          title="Lịch sử dòng tiền"
          desc="Theo dõi chi tiết các khoản tiền vào, tiền ra, hoàn cọc và rút tiền về ngân hàng."
          right={
            <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-primary/20 transition hover:-translate-y-1 hover:bg-primary/90">
              <Landmark className="h-4 w-4" />
              Yêu cầu rút tiền
            </button>
          }
        />

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse bg-white text-left text-sm">
              <thead className="bg-slate-50 text-xs tracking-wider text-slate-400 uppercase">
                <tr>
                  <Th>Mã Giao Dịch</Th>
                  <Th>Thời gian</Th>
                  <Th>Nội dung</Th>
                  <Th align="center">Biến động (VNĐ)</Th>
                  <Th align="center">Trạng thái</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactionHistory.map((tx) => (
                  <tr
                    key={tx.id}
                    className="group transition duration-300 hover:bg-slate-50"
                  >
                    <Td>
                      <span className="font-black text-slate-900">{tx.id}</span>
                    </Td>
                    <Td>
                      <span className="text-slate-500">{tx.date}</span>
                    </Td>
                    <Td>
                      <span className="font-bold text-slate-700">
                        {tx.content}
                      </span>
                    </Td>
                    <Td align="center">
                      <div
                        className={`inline-flex items-center gap-1 font-black ${
                          tx.type === "in" || tx.type === "penalty"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {tx.type === "in" || tx.type === "penalty" ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        {tx.amount}
                      </div>
                    </Td>
                    <Td align="center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${
                          tx.status === "Thành công"
                            ? "bg-emerald-100 text-emerald-700"
                            : "animate-pulse bg-amber-100 text-amber-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Panel>
    </div>
  )
}
