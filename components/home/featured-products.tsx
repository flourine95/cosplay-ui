import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "Nezuko Kamado",
    series: "Demon Slayer",
    price: 850000,
    originalPrice: 1200000,
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=500&fit=crop",
    badge: "Bán chạy",
    badgeVariant: "default" as const,
    canRent: true,
    rentPrice: 150000,
  },
  {
    id: 2,
    name: "Rem",
    series: "Re:Zero",
    price: 920000,
    originalPrice: null,
    rating: 4.8,
    reviews: 95,
    image: null,
    bgClass: "bg-secondary",
    emoji: "🌸",
    badge: "Mới",
    badgeVariant: "secondary" as const,
    canRent: true,
    rentPrice: 180000,
  },
  {
    id: 3,
    name: "Batman",
    series: "DC Comics",
    price: 1100000,
    originalPrice: 1400000,
    rating: 5.0,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=500&fit=crop",
    badge: "Hot",
    badgeVariant: "destructive" as const,
    canRent: false,
    rentPrice: null,
  },
  {
    id: 4,
    name: "Sailor Moon",
    series: "Sailor Moon",
    price: 750000,
    originalPrice: null,
    rating: 4.7,
    reviews: 203,
    image: null,
    bgClass: "bg-brand-subtle",
    emoji: "🌙",
    badge: "Thuê được",
    badgeVariant: "outline" as const,
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
    <section id="shop" className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold tracking-widest text-primary uppercase">
              Nổi bật
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Trang phục hot nhất
            </h2>
          </div>
          <Button variant="outline" className="hidden md:flex">
            Xem tất cả
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 ${product.bgClass} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
                    >
                      <span className="text-7xl">{product.emoji}</span>
                    </div>
                  )}
                </div>
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <Badge variant={product.badgeVariant}>{product.badge}</Badge>
                  {product.canRent && (
                    <Badge
                      variant="secondary"
                      className="bg-card/90 text-primary"
                    >
                      Có thể thuê
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Thêm vào yêu thích"
                  className="absolute top-3 right-3 size-8 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card"
                >
                  <Heart className="size-4 text-muted-foreground" />
                </Button>
              </div>

              <div className="p-4 pb-2">
                <p className="text-xs text-muted-foreground">
                  {product.series}
                </p>
                <h3 className="mt-0.5 font-semibold text-foreground">
                  {product.name}
                </h3>
                <div
                  className="mt-1 flex items-center gap-1"
                  aria-label={`${product.rating} sao, ${product.reviews} đánh giá`}
                >
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
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

              <div className="flex gap-2 p-4 pt-2">
                <Button size="sm" className="flex-1">
                  <ShoppingCart data-icon="inline-start" />
                  Thêm vào giỏ
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline">Xem tất cả sản phẩm</Button>
        </div>
      </div>
    </section>
  )
}
