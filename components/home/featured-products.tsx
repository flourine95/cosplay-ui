import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    slug: "nezuko-kamado",
    name: "Nezuko Kamado",
    series: "Demon Slayer",
    price: 850000,
    originalPrice: 1200000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=533&fit=crop",
    badge: "Bán chạy",
    canRent: true,
    rentPrice: 150000,
  },
  {
    id: 2,
    slug: "rem-rezero",
    name: "Rem",
    series: "Re:Zero",
    price: 920000,
    originalPrice: null,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=533&fit=crop",
    badge: "Mới",
    canRent: true,
    rentPrice: 180000,
  },
  {
    id: 3,
    slug: "batman",
    name: "Batman",
    series: "DC Comics",
    price: 1100000,
    originalPrice: 1400000,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=533&fit=crop",
    badge: "Hot",
    canRent: false,
    rentPrice: null,
  },
  {
    id: 4,
    slug: "sailor-moon",
    name: "Sailor Moon",
    series: "Sailor Moon",
    price: 750000,
    originalPrice: null,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=533&fit=crop",
    badge: "Thuê được",
    canRent: true,
    rentPrice: 120000,
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)
}

export function FeaturedProducts() {
  return (
    <section id="shop" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Đang được săn đón
          </h2>
          <Button variant="outline" className="hidden rounded-full md:flex">
            Xem tất cả
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col gap-3"
            >
              {/* Image with hover overlay */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex gap-2">
                      <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                        <ShoppingCart className="size-4" />
                        Mua ngay
                      </button>
                      {product.canRent && (
                        <button className="flex flex-1 items-center justify-center rounded-full bg-white/20 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                          Thuê
                        </button>
                      )}
                    </div>
                    <button
                      aria-label="Thêm vào yêu thích"
                      className="flex items-center justify-center gap-1.5 py-1 text-xs text-white/70 transition-colors hover:text-white"
                    >
                      <Heart className="size-3.5" />
                      Lưu vào yêu thích
                    </button>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="border-0 bg-card text-foreground shadow-sm">
                    {product.badge}
                  </Badge>
                </div>
              </div>

              {/* Info below image */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {product.series}
                    </p>
                    <h3 className="mt-0.5 font-semibold text-foreground">
                      {product.name}
                    </h3>
                  </div>
                  <span className="shrink-0 pt-0.5 text-xs font-medium text-muted-foreground">
                    ★ {product.rating}
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-base font-bold text-foreground">
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

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="rounded-full">
            Xem tất cả sản phẩm
          </Button>
        </div>
      </div>
    </section>
  )
}
