import { Navbar } from "@/components/home/navbar"
import { AnnouncementBar } from "@/components/home/announcement-bar"
import { Hero } from "@/components/home/hero"
import { Services } from "@/components/home/services"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Categories } from "@/components/home/categories"
import { RentSection } from "@/components/home/rent-section"
import { CustomOrder } from "@/components/home/custom-order"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"
import { Footer } from "@/components/home/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProducts />
      <Categories />
      <RentSection />
      <CustomOrder />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
