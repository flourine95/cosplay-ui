import { SellerPage } from "@/components/seller/seller-page"

export default function SellerDashboardPage() {
  return (
    <SellerPage
      type="dashboard"
      title={
        <>
          <span>Hóa thân thành </span>
          <span className="text-primary">nhân vật</span>
          <span> bạn yêu thích</span>
        </>
      }
      description="Tổng quan hoạt động cho thuê, đơn mới, doanh thu và các việc seller cần xử lý hôm nay."
    />
  )
}
