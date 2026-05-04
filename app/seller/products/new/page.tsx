import ProductForm from "@/components/seller/product-form"

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-[1280px]">
      {/* Gọi form trống ra để Thêm mới */}
      <ProductForm />
    </div>
  )
}
