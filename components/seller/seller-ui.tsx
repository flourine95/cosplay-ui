"use client"

import { ArrowUpDown, Plus, SlidersHorizontal } from "lucide-react"
import React from "react"

// ==========================================
// KHAI BÁO TYPE (INTERFACES)
// ==========================================

export interface SectionTitleProps {
  title: string
  desc: string
  right?: React.ReactNode
}

export interface PanelProps {
  children: React.ReactNode
  className?: string
}

export interface SmallButtonProps {
  text: string
}

export interface AddCalendarButtonProps {
  onClick: () => void
}

export type SortType = "none" | "asc" | "desc"

export interface SortIconProps {
  field: string
  currentField: string | null
  sortType: SortType | string
}

export interface TableCellProps {
  children: React.ReactNode
  align?: "left" | "center"
}

export interface StatusPillProps {
  status: string
}

// ==========================================
// COMPONENT: CÁC KHỐI UI DÙNG CHUNG
// ==========================================

export function SectionTitle({ title, desc, right }: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-dashed border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">{desc}</p>
      </div>
      {right}
    </div>
  )
}

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <section
      className={`rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-primary/30 transition duration-300 hover:shadow-xl ${className}`}
    >
      {children}
    </section>
  )
}

export function SmallButton({ text }: SmallButtonProps) {
  return (
    <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-1 hover:bg-primary/90">
      <SlidersHorizontal className="h-4 w-4" />
      {text}
    </button>
  )
}

export function AddCalendarButton({ onClick }: AddCalendarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-1 hover:bg-primary/90"
    >
      <Plus className="h-4 w-4" />
      Thêm lịch
    </button>
  )
}

export function SortIcon({ field, currentField, sortType }: SortIconProps) {
  if (currentField !== field || sortType === "none") {
    return <ArrowUpDown className="h-3 w-3 opacity-40" />
  }

  return (
    <ArrowUpDown
      className={`h-3 w-3 ${sortType === "asc" ? "rotate-180" : ""}`}
    />
  )
}

export function Th({ children, align = "left" }: TableCellProps) {
  return (
    <th
      className={`border-r border-slate-100 px-5 py-4 font-black last:border-r-0 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {children}
    </th>
  )
}

export function Td({ children, align = "left" }: TableCellProps) {
  return (
    <td
      className={`border-r border-slate-100 px-5 py-4 last:border-r-0 ${
        align === "center" ? "text-center" : "text-slate-600"
      }`}
    >
      {children}
    </td>
  )
}

// Đưa object styles ra ngoài component để tránh việc bị khởi tạo lại sau mỗi lần render
const STATUS_STYLES: Record<string, string> = {
  "Còn hàng": "bg-emerald-100 text-emerald-700",
  "Đang cho thuê": "bg-sky-100 text-sky-700",
  "Bảo trì": "bg-amber-100 text-amber-700",
  "Chờ xác nhận": "bg-orange-100 text-orange-700",
  "Đã báo giá": "bg-violet-100 text-violet-700",
  "Chờ báo giá": "bg-pink-100 text-pink-700",
  "Đang giao": "bg-cyan-100 text-cyan-700",
  "Đặt cọc": "bg-primary/20 text-primary",
  "Đang thuê": "bg-indigo-100 text-indigo-700",
  "Theo dõi": "bg-slate-100 text-slate-700",
}

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-black ${
        STATUS_STYLES[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  )
}
