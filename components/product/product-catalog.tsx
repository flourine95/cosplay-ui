"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { SlidersHorizontal, Star, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

type SortOption = "popular" | "price-asc" | "price-desc" | "rating"
type ServiceFilter = "all" | "buy" | "rent"

const sortLabels: Record<SortOption, string> = {
  popular: "Phổ biến nhất",
  "price-asc": "Giá tăng dần",
  "price-desc": "Giá giảm dần",
  rating: "Đánh giá cao nhất",
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)
}

function FilterPanel({
  categories,
  selectedCategories,
  onCategoryToggle,
  serviceFilter,
  onServiceFilter,
  priceMax,
  onPriceMax,
  onReset,
}: {
  categories: string[]
  selectedCategories: string[]
  onCategoryToggle: (c: string) => void
  serviceFilter: ServiceFilter
  onServiceFilter: (s: ServiceFilter) => void
  priceMax: number
  onPriceMax: (v: number) => void
  onReset: () => void
}) {
  const hasFilters =
    selectedCategories.length > 0 ||
    serviceFilter !== "all" ||
    priceMax < 2000000

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Bộ lọc</h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <X className="size-3" />
            Xóa tất cả
          </button>
        )}
      </div>

      {/* Service */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">Hình thức</p>
        <div className="flex flex-col gap-1.5">
          {(["all", "buy", "rent"] as ServiceFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => onServiceFilter(s)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                serviceFilter === s
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <div
                className={cn(
                  "size-1.5 rounded-full",
                  serviceFilter === s ? "bg-primary" : "bg-border"
                )}
              />
              {s === "all" && "Tất cả"}
              {s === "buy" && "Mua trực tiếp"}
              {s === "rent" && "Có thể thuê"}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Category */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-foreground">Danh mục</p>
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const active = selectedCategories.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => onCategoryToggle(cat)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <div
                  className={cn(
                    "flex size-4 items-center justify-center rounded border transition-colors",
                    active ? "border-primary bg-primary" : "border-border"
                  )}
                >
                  {active && <X className="size-2.5 text-primary-foreground" />}
                </div>
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Price range */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Giá tối đa</p>
          <span className="text-sm font-semibold text-primary">
            {formatPrice(priceMax)}
          </span>
        </div>
        <input
          type="range"
          min={200000}
          max={2000000}
          step={50000}
          value={priceMax}
          onChange={(e) => onPriceMax(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>200K</span>
          <span>2.000K</span>
        </div>
      </div>
    </div>
  )
}

export function ProductCatalog({
  products,
  categories,
}: {
  products: Product[]
  categories: string[]
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>("all")
  const [priceMax, setPriceMax] = useState(2000000)
  const [sort, setSort] = useState<SortOption>("popular")
  const [sortOpen, setSortOpen] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setServiceFilter("all")
    setPriceMax(2000000)
  }

  const filtered = useMemo(() => {
    let result = [...products]

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }
    if (serviceFilter === "buy")
      result = result.filter((p) => !p.canRent || p.price > 0)
    if (serviceFilter === "rent") result = result.filter((p) => p.canRent)
    result = result.filter((p) => p.price <= priceMax)

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return result
  }, [products, selectedCategories, serviceFilter, priceMax, sort])

  const activeFilterCount =
    selectedCategories.length +
    (serviceFilter !== "all" ? 1 : 0) +
    (priceMax < 2000000 ? 1 : 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Tất cả trang phục
        </h1>
        <p className="text-muted-foreground">{filtered.length} sản phẩm</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filter — desktop */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterPanel
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={toggleCategory}
              serviceFilter={serviceFilter}
              onServiceFilter={setServiceFilter}
              priceMax={priceMax}
              onPriceMax={setPriceMax}
              onReset={resetFilters}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-3">
            {/* Mobile filter button */}
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full lg:hidden"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal className="size-4" />
              Bộ lọc
              {activeFilterCount > 0 && (
                <Badge className="size-5 justify-center rounded-full p-0 text-[10px]">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {/* Active filter chips — desktop */}
            <div className="hidden flex-wrap gap-2 lg:flex">
              {selectedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {cat}
                  <X className="size-3" />
                </button>
              ))}
              {serviceFilter !== "all" && (
                <button
                  onClick={() => setServiceFilter("all")}
                  className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {serviceFilter === "rent" ? "Có thể thuê" : "Mua trực tiếp"}
                  <X className="size-3" />
                </button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {sortLabels[sort]}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform",
                      sortOpen && "rotate-180"
                    )}
                  />
                </button>
                {sortOpen && (
                  <div className="absolute top-full right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                    {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSort(opt)
                          setSortOpen(false)
                        }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                          sort === opt
                            ? "font-medium text-primary"
                            : "text-foreground"
                        )}
                      >
                        {sortLabels[opt]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <p className="text-lg font-semibold text-foreground">
                Không tìm thấy sản phẩm
              </p>
              <p className="text-sm text-muted-foreground">
                Thử thay đổi bộ lọc để xem thêm kết quả.
              </p>
              <Button
                variant="outline"
                className="mt-2 rounded-full"
                onClick={resetFilters}
              >
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group flex flex-col gap-3"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="w-full p-4">
                        <div className="flex gap-2">
                          <span className="flex-1 rounded-full bg-primary py-2 text-center text-xs font-semibold text-primary-foreground">
                            Mua ngay
                          </span>
                          {product.canRent && (
                            <span className="flex-1 rounded-full bg-white/20 py-2 text-center text-xs font-semibold text-white backdrop-blur-sm">
                              Thuê
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <Badge className="border-0 bg-card text-xs text-foreground shadow-sm">
                          {product.badge}
                        </Badge>
                      </div>
                    )}
                    {product.canRent && (
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="border-0 bg-card/90 text-xs text-primary shadow-sm"
                        >
                          Thuê được
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {product.series}
                    </p>
                    <h3 className="mt-0.5 font-semibold text-foreground transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    {product.canRent && product.rentPrice && (
                      <p className="mt-0.5 text-xs text-primary">
                        Thuê từ {formatPrice(product.rentPrice)}/ngày
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent side="left" className="w-72 overflow-y-auto">
          <SheetTitle className="sr-only">Bộ lọc</SheetTitle>
          <FilterPanel
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryToggle={toggleCategory}
            serviceFilter={serviceFilter}
            onServiceFilter={setServiceFilter}
            priceMax={priceMax}
            onPriceMax={setPriceMax}
            onReset={resetFilters}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
