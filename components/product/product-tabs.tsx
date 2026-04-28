import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"

const mockReviews = [
  {
    name: "Nguyễn Minh Anh",
    avatar: "https://i.pravatar.cc/80?img=1",
    initials: "MA",
    rating: 5,
    date: "12/03/2025",
    comment:
      "Chất lượng vượt mong đợi! Vải đẹp, đường may tỉ mỉ, màu sắc đúng như hình. Giao hàng nhanh, đóng gói cẩn thận.",
    service: "Mua trực tiếp",
  },
  {
    name: "Trần Bảo Long",
    avatar: "https://i.pravatar.cc/80?img=3",
    initials: "BL",
    rating: 5,
    date: "28/02/2025",
    comment:
      "Mặc đi sự kiện Anime Festival, được khen rất nhiều. Size chuẩn, mặc vừa vặn. Sẽ quay lại mua thêm.",
    service: "Mua trực tiếp",
  },
  {
    name: "Lê Thị Hương",
    avatar: "https://i.pravatar.cc/80?img=5",
    initials: "TH",
    rating: 4,
    date: "15/02/2025",
    comment:
      "Trang phục đẹp, chỉ có điều giao hơi chậm hơn dự kiến 1 ngày. Nhưng chất lượng thì ổn.",
    service: "Thuê 3 ngày",
  },
]

export function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs defaultValue="description">
      <TabsList className="h-auto w-full justify-start gap-0 border-b border-border bg-transparent p-0">
        {["description", "details", "reviews"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-3 text-sm font-medium text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {tab === "description" && "Mô tả"}
            {tab === "details" && "Chi tiết"}
            {tab === "reviews" && `Đánh giá (${product.reviewCount})`}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </TabsContent>

      <TabsContent value="details" className="mt-6">
        <div className="max-w-md">
          {product.details.map((d, i) => (
            <div
              key={d.label}
              className={`flex justify-between py-3 text-sm ${i < product.details.length - 1 ? "border-b border-border/60" : ""}`}
            >
              <span className="font-medium text-foreground">{d.label}</span>
              <span className="text-muted-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="flex max-w-2xl flex-col gap-6">
          {/* Summary */}
          <div className="flex items-center gap-4 rounded-xl bg-muted/40 p-5">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-foreground">
                {product.rating}
              </p>
              <div className="mt-1 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {product.reviewCount} đánh giá
              </p>
            </div>
          </div>

          {/* Reviews list */}
          {mockReviews.map((review) => (
            <div
              key={review.name}
              className="flex flex-col gap-3 border-b border-border/60 pb-6 last:border-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="flex gap-0.5"
                    aria-label={`${review.rating} sao`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
                      />
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {review.service}
                  </Badge>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
