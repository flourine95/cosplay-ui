"use client"

import {
  LayoutDashboard,
  Users,
  ChevronRight,
  ChevronLeft,
  Scissors,
  Store,
  ShoppingCart,
  Receipt,
  Grid,
  Percent,
  DollarSign,
  BarChart3,
} from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { LucideIcon } from "lucide-react"

type MenuItem = {
  label: string
  icon: LucideIcon
  href: string
}

type SidebarProps = {
  isSidebarCollapsed: boolean
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar({
  isSidebarCollapsed,
  setSidebarCollapsed,
}: SidebarProps) {
  const pathname = usePathname()

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Quản lý User", icon: Users, href: "/admin/users" },
    { label: "Quản lý Seller", icon: Store, href: "/admin/sellers" },
    { label: "Quản lý đơn hàng", icon: ShoppingCart, href: "/admin/orders" },
    { label: "Quản lý hóa đơn", icon: Receipt, href: "/admin/invoices" },
    { label: "Quản lý danh mục", icon: Grid, href: "/admin/categories" },
    { label: "Quản lý phí sàn", icon: Percent, href: "/admin/fees" },
    { label: "Quản lý doanh thu", icon: DollarSign, href: "/admin/revenue" },
    { label: "Thống kê", icon: BarChart3, href: "/admin/stats" },
  ]

  return (
    <aside
      className={`${
        isSidebarCollapsed ? "w-20" : "w-72"
      } flex flex-col bg-slate-900 text-white transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-800/50 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-indigo-600">
          <Scissors size={20} />
        </div>

        {!isSidebarCollapsed && (
          <span className="ml-3 text-xl font-bold">CosManager</span>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex cursor-pointer items-center rounded-xl p-3 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />

                {!isSidebarCollapsed && (
                  <span className="ml-4">{item.label}</span>
                )}

                {isSidebarCollapsed && isActive && (
                  <div className="ml-auto h-6 w-1 rounded bg-pink-500"></div>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Collapse */}
      <div className="border-t border-slate-800/50 p-4">
        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className="flex w-full justify-center rounded bg-slate-800 p-2"
        >
          {isSidebarCollapsed ? (
            <ChevronRight />
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <ChevronLeft /> Thu gọn
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
