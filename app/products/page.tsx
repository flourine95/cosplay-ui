import { Navbar } from "@/components/home/navbar"
import { Footer } from "@/components/home/footer"
import { ProductCatalog } from "@/components/product/product-catalog"
import { products, categories } from "@/lib/products"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ProductCatalog products={products} categories={categories} />
      </main>
      <Footer />
    </div>
  )
}
