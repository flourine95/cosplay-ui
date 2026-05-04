import UserRow from "./user-row"

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

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      {/* HEADER TABLE (UI giống style bạn đưa) */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center justify-between">
          {/* giữ nguyên logic filter nếu bạn gắn từ parent */}
          <div className="text-sm font-bold text-slate-900">
            Danh sách người dùng
          </div>

          <div className="text-xs text-slate-500">{users.length} users</div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/60">
              <th className="px-6 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Người dùng
              </th>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Vai trò
              </th>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-center text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Giao dịch
              </th>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Tổng chi
              </th>
              <th className="px-6 py-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Ngày
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
