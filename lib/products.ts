export type Product = {
  slug: string
  name: string
  series: string
  category: string
  price: number
  originalPrice: number | null
  rentPrice: number | null
  canRent: boolean
  rating: number
  reviewCount: number
  badge: string | null
  images: string[]
  sizes: string[]
  description: string
  details: { label: string; value: string }[]
}

export const products: Product[] = [
  {
    slug: "nezuko-kamado",
    name: "Nezuko Kamado",
    series: "Demon Slayer",
    category: "Anime",
    price: 850000,
    originalPrice: 1200000,
    rentPrice: 150000,
    canRent: true,
    rating: 4.9,
    reviewCount: 128,
    badge: "Bán chạy",
    images: [
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1000&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Trang phục Nezuko Kamado từ bộ anime Demon Slayer. Được may từ vải cao cấp, đường may tỉ mỉ, màu sắc trung thực với nhân vật gốc.",
    details: [
      { label: "Chất liệu", value: "Vải lụa tổng hợp cao cấp" },
      { label: "Xuất xứ", value: "Sản xuất tại Việt Nam" },
      { label: "Bảo quản", value: "Giặt tay, không sấy" },
      { label: "Giao hàng", value: "2–5 ngày toàn quốc" },
      { label: "Đổi trả", value: "7 ngày nếu lỗi sản xuất" },
    ],
  },
  {
    slug: "rem-rezero",
    name: "Rem",
    series: "Re:Zero",
    category: "Anime",
    price: 920000,
    originalPrice: null,
    rentPrice: 180000,
    canRent: true,
    rating: 4.8,
    reviewCount: 95,
    badge: "Mới",
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1000&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Trang phục Rem từ Re:Zero. Bộ đồng phục hầu gái xanh dương đặc trưng với chi tiết ren tinh xảo.",
    details: [
      { label: "Chất liệu", value: "Cotton pha polyester" },
      { label: "Xuất xứ", value: "Sản xuất tại Việt Nam" },
      { label: "Bảo quản", value: "Giặt máy nhẹ" },
      { label: "Giao hàng", value: "2–5 ngày toàn quốc" },
      { label: "Đổi trả", value: "7 ngày nếu lỗi sản xuất" },
    ],
  },
  {
    slug: "batman",
    name: "Batman",
    series: "DC Comics",
    category: "Phim & Series",
    price: 1100000,
    originalPrice: 1400000,
    rentPrice: null,
    canRent: false,
    rating: 5.0,
    reviewCount: 67,
    badge: "Hot",
    images: [
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1000&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Trang phục Batman phiên bản Dark Knight. Chất liệu giả da cao cấp, có đệm cơ bắp, kèm áo choàng và mặt nạ.",
    details: [
      { label: "Chất liệu", value: "Giả da PU + foam đệm" },
      { label: "Xuất xứ", value: "Sản xuất tại Việt Nam" },
      { label: "Bảo quản", value: "Lau nhẹ, không giặt máy" },
      { label: "Giao hàng", value: "2–5 ngày toàn quốc" },
      { label: "Đổi trả", value: "7 ngày nếu lỗi sản xuất" },
    ],
  },
  {
    slug: "sailor-moon",
    name: "Sailor Moon",
    series: "Sailor Moon",
    category: "Anime",
    price: 750000,
    originalPrice: null,
    rentPrice: 120000,
    canRent: true,
    rating: 4.7,
    reviewCount: 203,
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1000&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Trang phục Sailor Moon cổ điển với váy xếp ly trắng, nơ đỏ và găng tay trắng.",
    details: [
      { label: "Chất liệu", value: "Vải thun co giãn 4 chiều" },
      { label: "Xuất xứ", value: "Sản xuất tại Việt Nam" },
      { label: "Bảo quản", value: "Giặt tay, phơi bóng mát" },
      { label: "Giao hàng", value: "2–5 ngày toàn quốc" },
      { label: "Đổi trả", value: "7 ngày nếu lỗi sản xuất" },
    ],
  },
  {
    slug: "genshin-hu-tao",
    name: "Hu Tao",
    series: "Genshin Impact",
    category: "Game",
    price: 980000,
    originalPrice: null,
    rentPrice: 160000,
    canRent: true,
    rating: 4.9,
    reviewCount: 87,
    badge: "Mới",
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1000&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Trang phục Hu Tao từ Genshin Impact. Bộ trang phục đặc trưng với áo vest đen, mũ và gậy hoa mai.",
    details: [
      { label: "Chất liệu", value: "Vải dệt cao cấp" },
      { label: "Xuất xứ", value: "Sản xuất tại Việt Nam" },
      { label: "Bảo quản", value: "Giặt tay" },
      { label: "Giao hàng", value: "2–5 ngày toàn quốc" },
      { label: "Đổi trả", value: "7 ngày nếu lỗi sản xuất" },
    ],
  },
  {
    slug: "naruto-uzumaki",
    name: "Naruto Uzumaki",
    series: "Naruto",
    category: "Anime",
    price: 680000,
    originalPrice: 850000,
    rentPrice: 110000,
    canRent: true,
    rating: 4.6,
    reviewCount: 312,
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1000&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Trang phục Naruto Uzumaki phiên bản Shippuden. Áo khoác cam đặc trưng với logo xoáy.",
    details: [
      { label: "Chất liệu", value: "Cotton 100%" },
      { label: "Xuất xứ", value: "Sản xuất tại Việt Nam" },
      { label: "Bảo quản", value: "Giặt máy" },
      { label: "Giao hàng", value: "2–5 ngày toàn quốc" },
      { label: "Đổi trả", value: "7 ngày nếu lỗi sản xuất" },
    ],
  },
  {
    slug: "spiderman-classic",
    name: "Spider-Man Classic",
    series: "Marvel",
    category: "Phim & Series",
    price: 1250000,
    originalPrice: null,
    rentPrice: 200000,
    canRent: true,
    rating: 4.8,
    reviewCount: 54,
    badge: "Hot",
    images: [
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1000&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Trang phục Spider-Man phiên bản classic. Chất liệu spandex co giãn 4 chiều, in 3D chi tiết.",
    details: [
      { label: "Chất liệu", value: "Spandex co giãn 4 chiều" },
      { label: "Xuất xứ", value: "Sản xuất tại Việt Nam" },
      { label: "Bảo quản", value: "Giặt tay nhẹ" },
      { label: "Giao hàng", value: "2–5 ngày toàn quốc" },
      { label: "Đổi trả", value: "7 ngày nếu lỗi sản xuất" },
    ],
  },
  {
    slug: "link-zelda",
    name: "Link",
    series: "The Legend of Zelda",
    category: "Game",
    price: 1050000,
    originalPrice: 1300000,
    rentPrice: 170000,
    canRent: true,
    rating: 4.7,
    reviewCount: 41,
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1000&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Trang phục Link từ The Legend of Zelda: Breath of the Wild. Bao gồm áo tunic xanh, mũ và khiên.",
    details: [
      { label: "Chất liệu", value: "Vải canvas + da tổng hợp" },
      { label: "Xuất xứ", value: "Sản xuất tại Việt Nam" },
      { label: "Bảo quản", value: "Giặt tay" },
      { label: "Giao hàng", value: "2–5 ngày toàn quốc" },
      { label: "Đổi trả", value: "7 ngày nếu lỗi sản xuất" },
    ],
  },
]

export const categories = [
  "Anime",
  "Game",
  "Phim & Series",
  "Fantasy & Original",
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelated(slug: string, limit = 4): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, limit)
}
