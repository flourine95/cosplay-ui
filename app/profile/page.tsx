import React from "react"
import ProfileInfo from "@/components/profile/profile-info-form"
import Link from "next/link"
import { Navbar } from "@/components/home/navbar"
import { AnnouncementBar } from "@/components/home/announcement-bar"
import { Footer } from "@/components/home/footer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const user = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  avatarUrl: "/avatar.png",
  phone: "0123 456 789",
  address: "Hà Nội, Việt Nam",
  status: "Hoạt động",
}

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {/* Breadcrumb */}

      <main className="container mx-auto p-6">
        <Breadcrumb className="mb-8 text-muted-foreground">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Trang chủ</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Thông tin cá nhân</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mb-6 text-2xl font-semibold">Thông tin cá nhân</h1>
        <ProfileInfo user={user} />
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/profile/measurements"
            className="block rounded-lg bg-blue-600 p-4 shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
          >
            <h2 className="text-lg font-medium text-white">Quản lý số đo</h2>
            <p className="text-sm text-blue-100">
              Lưu và chỉnh sửa số đo của bạn
            </p>
          </Link>
          <Link
            href="/profile/orders"
            className="block rounded-lg border border-border bg-green-600 p-4 transition-all hover:border-primary hover:bg-green-600"
          >
            <h1 className="text-lg font-bold text-white">Lịch sử mua hàng</h1>
            <p className="text-sm text-blue-100">
              Xem các đơn hàng trước đây của bạn
            </p>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
