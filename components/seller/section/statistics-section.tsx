import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const topProducts = [
  { name: "Đầm công chúa Dạ Hội", rented: 45, revenue: "5.4M" },
  { name: "Set Hầu gái phong cách Nhật", rented: 38, revenue: "3.4M" },
  { name: "Áo Cosplay Chiến Binh", rented: 28, revenue: "33.6M" },
]

export function StatisticsSectionNew() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Đánh giá trung bình</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.8</p>
            <p className="mt-2 text-sm text-muted-foreground">
              từ 156 đánh giá
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Tỉ lệ hoàn thành</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">98%</p>
            <Badge variant="secondary" className="mt-2">
              Xuất sắc
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Thời gian phản hồi</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">18 phút</p>
            <p className="mt-2 text-sm text-muted-foreground">Trung bình</p>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Khách quay lại</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">64%</p>
            <Badge variant="secondary" className="mt-2">
              +8% tháng này
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Sản phẩm bán chạy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead className="text-right">Lượt thuê</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.rented}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {product.revenue}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
