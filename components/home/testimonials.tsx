import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const reviews = [
  {
    name: "Nguyễn Minh Anh",
    avatar: "https://i.pravatar.cc/80?img=1",
    initials: "MA",
    rating: 5,
    service: "Mua trực tiếp",
    comment:
      "Trang phục Nezuko chất lượng vượt mong đợi! Vải đẹp, đường may tỉ mỉ, giao hàng nhanh. Sẽ quay lại mua thêm.",
  },
  {
    name: "Trần Bảo Long",
    avatar: "https://i.pravatar.cc/80?img=3",
    initials: "BL",
    rating: 5,
    service: "Thuê trang phục",
    comment:
      "Thuê bộ Genshin Impact cho sự kiện Anime Festival. Trang phục sạch sẽ, đẹp y hình. Giá thuê rất hợp lý, nhân viên nhiệt tình.",
  },
  {
    name: "Lê Thị Hương",
    avatar: "https://i.pravatar.cc/80?img=5",
    initials: "TH",
    rating: 5,
    service: "Đặt may",
    comment:
      "Đặt may bộ original design theo ý tưởng của mình. Thợ may hiểu ý, làm đúng như mong muốn. Giao đúng hẹn, rất hài lòng!",
  },
  {
    name: "Phạm Quốc Huy",
    avatar: "https://i.pravatar.cc/80?img=7",
    initials: "QH",
    rating: 4,
    service: "Mua trực tiếp",
    comment:
      "Mua bộ Demon Slayer cho con gái. Bé thích lắm! Chất liệu an toàn, không gây kích ứng da. Shop tư vấn size rất nhiệt tình.",
  },
]

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <p className="mb-1 text-sm font-semibold tracking-widest text-violet-600 uppercase">
            Đánh giá
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Khách hàng nói gì về chúng tôi
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <Card key={review.name} className="border-border/60">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <Avatar className="size-9">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-violet-600">{review.service}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
