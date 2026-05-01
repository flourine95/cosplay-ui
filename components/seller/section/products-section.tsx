"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { sellerProducts } from "../seller-data"
import { SectionTitle, Th, SortIcon, Td, StatusPill, Panel } from "../seller-ui"

type SortType = "none" | "asc" | "desc"

// 1. Lấy kiểu dữ liệu tự động từ mock data
type ProductType = (typeof sellerProducts)[0]

// 2. Định nghĩa Props cho ProductsTable thay vì dùng 'any'
interface ProductsTableProps {
  data: ProductType[]
  onSortPrice: () => void
  onSortName: () => void
  sortField: "price" | "name" | null
  sortType: SortType
}

export default function ProductsSection() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [sortField, setSortField] = useState<"price" | "name" | null>(null)
  const [sortType, setSortType] = useState<SortType>("none")

  const filtered = useMemo(() => {
    let result = [...sellerProducts]

    if (statusFilter) {
      result = result.filter((p) => p.status === statusFilter)
    }

    return result
  }, [statusFilter])

  const sorted = useMemo(() => {
    if (sortType === "none" || !sortField) return filtered

    const result = [...filtered]

    // Sắp xếp theo tên
    if (sortField === "name") {
      result.sort((a, b) =>
        sortType === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )
    }

    // Ghi chú: Tạm thời bỏ sắp xếp theo 'price' vì dữ liệu basePrice là chuỗi văn bản hỗn hợp.

    return result
  }, [filtered, sortField, sortType])

  const toggleSort = (field: "price" | "name") => {
    if (sortField === field) {
      setSortType(
        sortType === "none" ? "asc" : sortType === "asc" ? "desc" : "none"
      )
    } else {
      setSortField(field)
      setSortType("asc")
    }
  }

  const uniqueStatuses = Array.from(
    new Set(sellerProducts.map((p) => p.status))
  )

  return (
    <Panel>
      <SectionTitle
        title="Danh sách sản phẩm"
        desc="Quản lý tồn kho, mô hình kinh doanh (bán, thuê, may đo) và trạng thái hiển thị."
        right={
          <Link
            href="/seller/products/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-primary/20 transition hover:-translate-y-1 hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Thêm sản phẩm
          </Link>
        }
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter(null)}
          className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
            statusFilter === null
              ? "bg-primary text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Tất cả ({sellerProducts.length})
        </button>

        {uniqueStatuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
              statusFilter === status
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {status} ({sellerProducts.filter((p) => p.status === status).length}
            )
          </button>
        ))}
      </div>

      <div className="mt-5">
        <ProductsTable
          data={sorted}
          onSortPrice={() => toggleSort("price")}
          onSortName={() => toggleSort("name")}
          sortField={sortField}
          sortType={sortType}
        />
      </div>
    </Panel>
  )
}

// 3. Áp dụng Interface vào Component, tạm biệt `any`
export function ProductsTable({
  data,
  onSortName,
  sortField,
  sortType,
}: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse bg-white text-left text-sm">
          <thead className="bg-slate-50 text-xs tracking-wider text-slate-400 uppercase">
            <tr>
              <Th>
                <button
                  onClick={onSortName}
                  className="flex items-center gap-2 hover:text-slate-600"
                >
                  Sản phẩm{" "}
                  <SortIcon
                    field="name"
                    currentField={sortField}
                    sortType={sortType}
                  />
                </button>
              </Th>
              <Th>Phân loại bán</Th>
              <Th align="center">Kho có sẵn</Th>
              <Th align="center">Đang kẹt/Thuê</Th>
              <Th>Giá tham khảo</Th>
              <Th>Trạng thái</Th>
              <Th align="center">Hành động</Th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((product) => (
              <tr
                key={product.sku}
                className="group transition duration-300 hover:bg-primary/5"
              >
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                      {product.image}
                    </span>
                    <div>
                      <p className="font-black text-slate-900">
                        {product.name}
                      </p>
                      <p className="text-xs font-bold text-slate-400">
                        SKU: {product.sku} · {product.category}
                      </p>
                    </div>
                  </div>
                </Td>

                <Td>
                  <div className="flex flex-wrap gap-1">
                    {product.businessTypes.map((type: string) => (
                      <span
                        key={type}
                        className={`rounded px-2 py-1 text-[10px] font-black uppercase ${
                          type === "Bán"
                            ? "bg-emerald-100 text-emerald-700"
                            : type === "Thuê"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </Td>

                <Td align="center">
                  <span className="font-bold">{product.stock}</span>
                </Td>
                <Td align="center">
                  <span className="font-bold text-orange-500">
                    {product.rented > 0 ? product.rented : "-"}
                  </span>
                </Td>
                <Td>
                  <span className="text-xs font-bold text-slate-600">
                    {product.basePrice}
                  </span>
                </Td>
                <Td>
                  <StatusPill status={product.status} />
                </Td>
                <Td align="center">
                  <div className="flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Link
                      href={`/seller/products/edit/${product.sku}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition duration-300 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 hover:shadow"
                      title="Sửa sản phẩm"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
