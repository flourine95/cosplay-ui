import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { sellerKpis, sellerOrders } from "../seller-data"

export function DashboardSectionNew() {
  // Get recent orders (last 5)
  const recentOrders = sellerOrders.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sellerKpis.map((stat) => {
          const isPositive =
            stat.note.includes("+") || stat.note.includes("tăng")
          return (
            <Card key={stat.label} className="border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.note}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Orders */}
      <Card className="border-border/60">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Đơn hàng mới</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Danh sách đơn hàng cần xử lý gần đây
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/seller/orders">
                Xem tất cả
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {order.orderType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {order.total}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Hoàn tất"
                          ? "secondary"
                          : order.status === "Đang thuê"
                            ? "secondary"
                            : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/60 transition-all hover:border-primary/50 hover:shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Quản lý sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Thêm, sửa, xóa sản phẩm và quản lý tồn kho
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/seller/products">Đi đến sản phẩm</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 transition-all hover:border-primary/50 hover:shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Quản lý đặt may</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Xử lý yêu cầu đặt may và cập nhật tiến độ
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/seller/tailoring">Đi đến đặt may</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60 transition-all hover:border-primary/50 hover:shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Lịch trình thuê</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Theo dõi lịch giao hàng và nhận trả
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/seller/calendar">Xem lịch trình</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
