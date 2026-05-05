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

const revenueData = [
  { month: "Tháng 1/2026", revenue: "45.2M", orders: 28, growth: "+12%" },
  { month: "Tháng 2/2026", revenue: "52.8M", orders: 34, growth: "+16%" },
  { month: "Tháng 3/2026", revenue: "61.5M", orders: 42, growth: "+18%" },
  { month: "Tháng 4/2026", revenue: "58.3M", orders: 38, growth: "-5%" },
]

export function RevenueSectionNew() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Doanh thu tháng này</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">128.5M</p>
            <Badge variant="secondary" className="mt-2">
              +12% so với tháng trước
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Tiền cọc đang giữ</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24.8M</p>
            <p className="mt-2 text-sm text-muted-foreground">42 đơn thuê</p>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <p className="text-sm text-muted-foreground">Chờ thanh toán</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">8.2M</p>
            <p className="mt-2 text-sm text-muted-foreground">12 đơn hàng</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Doanh thu theo tháng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tháng</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                  <TableHead className="text-right">Đơn hàng</TableHead>
                  <TableHead className="text-right">Tăng trưởng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="font-medium">{row.month}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {row.revenue}
                    </TableCell>
                    <TableCell className="text-right">{row.orders}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{row.growth}</Badge>
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
