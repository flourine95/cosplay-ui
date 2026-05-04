"use client"

import { Bell, Search } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
      {/* ===== Search ===== */}
      <div className="flex max-w-xl flex-1 items-center">
        <div className="group relative w-full">
          <Search
            className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Tra cứu nhanh đơn hàng, ID người dùng hoặc tiến độ may..."
            className="w-full rounded-2xl border-none bg-slate-100 py-3 pr-4 pl-12 text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* ===== Right side ===== */}
      <div className="ml-8 flex items-center space-x-6">
        {/* Date */}
        <div className="mr-2 hidden flex-col text-right lg:flex">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Hôm nay
          </span>
          <span className="text-sm font-semibold text-slate-700">
            {new Date().toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Notification */}
        <button className="group relative rounded-2xl p-2.5 text-slate-500 transition-all hover:bg-slate-100">
          <Bell
            size={20}
            className="transition-transform group-hover:rotate-12"
          />
          <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 animate-pulse rounded-full border-2 border-white bg-rose-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-4 border-l border-slate-200 pl-4">
          <div className="text-right">
            <p className="text-sm leading-tight font-bold text-slate-900">
              Admin System
            </p>
            <p className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-600">
              Quản trị viên
            </p>
          </div>

          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-slate-700 bg-gradient-to-tr from-slate-800 to-slate-900 font-bold text-white shadow-lg ring-4 ring-slate-50 transition-transform hover:scale-105">
            AD
          </div>
        </div>
      </div>
    </header>
  )
}
