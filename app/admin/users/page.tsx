"use client"

import { useState } from "react"
import UserHeader from "@/components/admin/users/user-header"
import UserStats from "@/components/admin/users/user-stats"
import UserFilters from "@/components/admin/users/user-filters"
import UserTable from "@/components/admin/users/user-table"
import UserPagination from "@/components/admin/users/user-pagination"
import { users } from "@/components/admin/users/users.data"

export default function UserManagement() {
  const [filterRole, setFilterRole] = useState("All")

  const filteredUsers =
    filterRole === "All" ? users : users.filter((u) => u.role === filterRole)

  return (
    <div className="space-y-6">
      <UserHeader />
      <UserStats />

      <div className="flex justify-between">
        <UserFilters filterRole={filterRole} setFilterRole={setFilterRole} />
      </div>

      <UserTable users={filteredUsers} />

      <UserPagination />
    </div>
  )
}
