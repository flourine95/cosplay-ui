import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tailoringOrders } from "../seller-data"

export type TailoringOrder = {
  id: string
  status: string
  item: string
  customer: string
  note: string
  measurements: Record<string, string | number>
  references?: string[]
  timeline?: Array<{ label: string; done: boolean }>
  changeRequests?: Array<{ time: string; text: string }>
}

export function TailoringSectionNew() {
  return (
    <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Danh sách yêu cầu</CardTitle>
          <p className="text-sm text-muted-foreground">
            {tailoringOrders.length} đơn đặt may
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          {tailoringOrders.map((order: TailoringOrder) => (
            <div
              key={order.id}
              className="cursor-pointer rounded-lg border border-border/60 p-3 transition-colors hover:bg-muted"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs text-muted-foreground">{order.id}</p>
                <Badge variant="secondary" className="text-xs">
                  {order.status}
                </Badge>
              </div>
              <p className="mt-1 font-semibold">{order.item}</p>
              <p className="text-xs text-muted-foreground">
                Khách: {order.customer}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Chi tiết đơn đặt may</CardTitle>
          <p className="text-sm text-muted-foreground">
            Chọn đơn bên trái để xem chi tiết
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              Chọn một đơn để xem chi tiết
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
