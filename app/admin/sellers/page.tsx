"use client"

import { useState } from "react"
import SellerHeader from "@/components/admin/sellers/seller-header"
import SellerInsights from "@/components/admin/sellers/seller-insights"
import SellerTable from "@/components/admin/sellers/seller-table"
import { sellers } from "@/components/admin/sellers/seller.data"

export default function SellerManagement() {
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredSellers =
    filterStatus === "All"
      ? sellers
      : sellers.filter((s) => s.status === filterStatus)

  return (
    <div className="mx-auto max-w-[1600px] animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-4">
      <SellerHeader />
      <SellerInsights />

      <SellerTable
        sellers={filteredSellers}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
    </div>
  )
}
