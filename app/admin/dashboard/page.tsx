"use client"

import { useState, useEffect } from "react"
import DashboardOverview from "@/components/admin/dashboard/dashboard-overview"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-[#f1f5f9] text-slate-800">
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          {isLoading ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"></div>
              <p className="mt-4 animate-pulse font-medium text-slate-500">
                Đang đồng bộ dữ liệu hệ thống...
              </p>
            </div>
          ) : (
            <DashboardOverview />
          )}
        </div>
      </main>
    </div>
  )
}
