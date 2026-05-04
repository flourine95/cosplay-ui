type Props = {
  filterRole: string
  setFilterRole: (role: string) => void
}

export default function UserFilters({ filterRole, setFilterRole }: Props) {
  const roles = ["All", "Buyer", "Seller"]

  return (
    <div className="flex rounded-xl bg-slate-100 p-1">
      {roles.map((r) => (
        <button
          key={r}
          onClick={() => setFilterRole(r)}
          className={`rounded-lg px-4 py-1.5 text-xs font-bold ${
            filterRole === r ? "bg-white text-indigo-600" : "text-slate-500"
          }`}
        >
          {r === "All" ? "Tất cả" : r}
        </button>
      ))}
    </div>
  )
}
