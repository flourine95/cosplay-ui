import { SellerShellNew } from "@/components/seller/seller-shell"

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SellerShellNew>{children}</SellerShellNew>
}
