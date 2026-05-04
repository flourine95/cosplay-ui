export type Seller = {
  id: string
  shopName: string
  owner: string
  email: string
  status: "Active" | "Pending" | "Suspended"
  rating: number
  products: number
  revenue: string
  verified: boolean
  joinDate: string
}

export const sellers: Seller[] = [
  {
    id: "SEL-1002",
    shopName: "Cosplay Wonderland",
    owner: "Trần Thị Mỹ Linh",
    email: "linh.ttm@yahoo.com",
    status: "Active",
    rating: 4.8,
    products: 124,
    revenue: "142.500.000đ",
    verified: true,
    joinDate: "05/01/2024",
  },
  {
    id: "SEL-2054",
    shopName: "Kimono House",
    owner: "Lê Minh Hoàng",
    email: "hoang.lm@gmail.com",
    status: "Pending",
    rating: 0,
    products: 15,
    revenue: "0đ",
    verified: false,
    joinDate: "12/04/2024",
  },
  {
    id: "SEL-0941",
    shopName: "Props Master Tech",
    owner: "Phạm Minh Đức",
    email: "duc.pham@gmail.com",
    status: "Active",
    rating: 4.9,
    products: 45,
    revenue: "89.200.000đ",
    verified: true,
    joinDate: "15/12/2023",
  },
  {
    id: "SEL-4412",
    shopName: "Wig Style Sài Gòn",
    owner: "Nguyễn Bích Phương",
    email: "phuong.nb@outlook.com",
    status: "Suspended",
    rating: 3.2,
    products: 82,
    revenue: "24.100.000đ",
    verified: true,
    joinDate: "20/11/2023",
  },
  {
    id: "SEL-8819",
    shopName: "Anime Armor Craft",
    owner: "Vũ Quốc Anh",
    email: "quocanh.craft@gmail.com",
    status: "Active",
    rating: 4.5,
    products: 28,
    revenue: "12.400.000đ",
    verified: false,
    joinDate: "02/03/2024",
  },
]
