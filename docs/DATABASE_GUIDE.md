# 📚 Hướng Dẫn Sử Dụng Database - Cosplay Shop

## 🎯 Tổng Quan

Database được thiết kế cho hệ thống thương mại điện tử chuyên về trang phục cosplay với 3 tính năng chính:

1. **Bán lẻ** (Sale)
2. **Cho thuê** (Rental)
3. **Đặt may đo** (Custom Order)

---

## 📊 **CẤU TRÚC DATABASE**

### **19 Models chính:**

#### **👤 User Management (3 models)**

- `User` - Tài khoản (Customer/Seller/Admin)
- `PasswordReset` - Reset mật khẩu
- `Notification` - Thông báo

#### **🛍️ Product & Shopping (7 models)**

- `Category` - Danh mục sản phẩm
- `Product` - Sản phẩm (hỗ trợ cả bán & thuê)
- `ProductImage` - Hình ảnh sản phẩm
- `ProductVariant` - Biến thể (size, màu)
- `CartItem` - Giỏ hàng
- `Order` - Đơn hàng
- `OrderItem` - Chi tiết đơn hàng
- `OrderStatusHistory` - Lịch sử trạng thái

#### **✂️ Custom Order (5 models)**

- `Measurement` - Số đo cá nhân
- `CustomOrder` - Đơn đặt may
- `CustomOrderQuote` - Báo giá
- `CustomOrderProgress` - Tiến độ gia công
- `CustomOrderRevision` - Yêu cầu chỉnh sửa

#### **🎭 Rental (2 models)**

- `RentalItem` - Đồ cho thuê
- `RentalOrder` - Đơn thuê

#### **💬 Review & Payment (3 models)**

- `Review` - Đánh giá sản phẩm
- `Comment` - Bình luận
- `Payment` - Thanh toán

#### **⚙️ System (2 models)**

- `SystemFee` - Phí hệ thống
- `SystemSetting` - Cài đặt

---

## 💻 **CODE EXAMPLES**

### **1. User Management**

#### Đăng ký user mới

```typescript
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    password: hashedPassword,
    name: "Nguyễn Văn A",
    phone: "0123456789",
    role: "CUSTOMER",
    status: "PENDING_VERIFICATION",
  },
})
```

#### Upgrade user lên seller

```typescript
await prisma.user.update({
  where: { id: userId },
  data: {
    role: "SELLER",
    shopName: "Cosplay Shop ABC",
    shopDescription: "Chuyên may đồ cosplay chất lượng cao",
    sellerStatus: "PENDING", // Chờ admin duyệt
    businessLicense: "123456789",
    taxCode: "0123456789",
  },
})
```

#### Admin duyệt seller

```typescript
await prisma.user.update({
  where: { id: sellerId },
  data: {
    sellerStatus: "APPROVED",
    sellerApprovedAt: new Date(),
    sellerApprovedBy: adminId,
  },
})
```

---

### **2. Product Management**

#### Tạo sản phẩm bán

```typescript
const product = await prisma.product.create({
  data: {
    sellerId: sellerId,
    categoryId: categoryId,
    name: "Bộ đồ Naruto Hokage",
    slug: "bo-do-naruto-hokage",
    description: "Bộ đồ cosplay Naruto phiên bản Hokage...",
    price: 500000,
    comparePrice: 700000, // Giá gốc
    stock: 10,
    type: "SALE",
    status: "ACTIVE",
    images: {
      create: [
        { url: "/images/naruto-1.jpg", order: 0, isPrimary: true },
        { url: "/images/naruto-2.jpg", order: 1 },
      ],
    },
    variants: {
      create: [
        { name: "Size M", attributes: { size: "M" }, stock: 5, price: 500000 },
        { name: "Size L", attributes: { size: "L" }, stock: 5, price: 520000 },
      ],
    },
  },
})
```

#### Tạo sản phẩm cho thuê

```typescript
const product = await prisma.product.create({
  data: {
    sellerId: sellerId,
    categoryId: categoryId,
    name: "Bộ giáp Iron Man",
    slug: "bo-giap-iron-man",
    type: "RENTAL", // Chỉ cho thuê
    status: "ACTIVE",
    price: 0, // Không bán
    rentalPricePerDay: 200000,
    depositAmount: 2000000,
    minRentalDays: 3,
    maxRentalDays: 7,
    rentalItem: {
      create: {
        sellerId: sellerId,
        pricePerDay: 200000,
        depositAmount: 2000000,
        minDays: 3,
        maxDays: 7,
        condition: "EXCELLENT",
        isAvailable: true,
      },
    },
  },
})
```

#### Tạo sản phẩm vừa bán vừa cho thuê

```typescript
const product = await prisma.product.create({
  data: {
    sellerId: sellerId,
    categoryId: categoryId,
    name: "Bộ đồ Genshin Impact",
    type: "BOTH", // Cả bán và thuê
    price: 800000, // Giá bán
    rentalPricePerDay: 150000, // Giá thuê/ngày
    depositAmount: 1000000,
    // ...
  },
})
```

---

### **3. Shopping Cart & Checkout**

#### Thêm vào giỏ hàng

```typescript
await prisma.cartItem.upsert({
  where: {
    userId_productId_variantId: {
      userId: userId,
      productId: productId,
      variantId: variantId,
    },
  },
  create: {
    userId: userId,
    productId: productId,
    variantId: variantId,
    quantity: 1,
  },
  update: {
    quantity: { increment: 1 },
  },
})
```

#### Checkout - Tách đơn theo seller

```typescript
// 1. Lấy giỏ hàng
const cartItems = await prisma.cartItem.findMany({
  where: { userId },
  include: {
    product: true,
    variant: true,
  },
})

// 2. Group theo seller
const itemsBySeller = cartItems.reduce(
  (acc, item) => {
    const sellerId = item.product.sellerId
    if (!acc[sellerId]) acc[sellerId] = []
    acc[sellerId].push(item)
    return acc
  },
  {} as Record<number, typeof cartItems>
)

// 3. Tạo 1 Order cho mỗi seller
for (const [sellerId, items] of Object.entries(itemsBySeller)) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.variant?.price || item.product.price
    return sum + price * item.quantity
  }, 0)

  await prisma.order.create({
    data: {
      userId: userId,
      sellerId: parseInt(sellerId), // ✅ Quan trọng!
      orderNumber: generateOrderNumber(),

      // Thông tin giao hàng
      shippingName: "Nguyễn Văn A",
      shippingPhone: "0123456789",
      shippingAddress: "123 Đường ABC",
      shippingCity: "TP.HCM",
      shippingDistrict: "Quận 1",
      shippingWard: "Phường Bến Nghé",

      // Giá
      subtotal: subtotal,
      shippingFee: 30000,
      total: subtotal + 30000,

      paymentMethod: "COD",

      // Chi tiết sản phẩm
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          productName: item.product.name,
          variantName: item.variant?.name,
          price: item.variant?.price || item.product.price,
          quantity: item.quantity,
          subtotal: (item.variant?.price || item.product.price) * item.quantity,
        })),
      },
    },
  })
}

// 4. Xóa giỏ hàng
await prisma.cartItem.deleteMany({
  where: { userId },
})
```

---

### **4. Custom Order (Đặt May)**

#### Khách tạo yêu cầu đặt may

```typescript
// 1. Tạo/chọn số đo
const measurement = await prisma.measurement.create({
  data: {
    userId: userId,
    name: "Số đo cosplay Naruto",
    height: 170,
    weight: 60,
    chest: 90,
    waist: 75,
    hips: 95,
    shoulder: 45,
    isDefault: true,
  },
})

// 2. Tạo đơn đặt may (gửi cho shop cụ thể)
const customOrder = await prisma.customOrder.create({
  data: {
    userId: userId,
    sellerId: sellerId, // ✅ Chọn shop trước
    measurementId: measurement.id,
    orderNumber: generateOrderNumber(),

    title: "Đặt may bộ đồ Naruto Sage Mode",
    description: "Cần may bộ đồ Naruto Sage Mode theo đúng anime...",
    referenceImages: ["/uploads/ref1.jpg", "/uploads/ref2.jpg"],
    characterName: "Naruto Uzumaki",
    animeName: "Naruto Shippuden",
    specialRequests: "Cần thêm chi tiết rồng ở lưng áo",
    deadline: new Date("2026-06-01"),

    status: "SUBMITTED",
  },
})
```

#### Seller báo giá

```typescript
const quote = await prisma.customOrderQuote.create({
  data: {
    customOrderId: customOrderId,
    sellerId: sellerId,
    quotedPrice: 2000000,
    depositAmount: 1000000, // Cọc 50%
    estimatedDays: 30,
    description: "Bộ đồ sẽ được may bằng vải cao cấp...",
  },
})

// Cập nhật trạng thái
await prisma.customOrder.update({
  where: { id: customOrderId },
  data: {
    status: "QUOTED",
    estimatedPrice: 2000000,
    depositAmount: 1000000,
  },
})
```

#### Khách chấp nhận báo giá

```typescript
await prisma.$transaction([
  // 1. Cập nhật quote
  prisma.customOrderQuote.update({
    where: { id: quoteId },
    data: { isAccepted: true },
  }),

  // 2. Cập nhật order
  prisma.customOrder.update({
    where: { id: customOrderId },
    data: {
      status: "QUOTE_ACCEPTED",
      acceptedAt: new Date(),
    },
  }),
])
```

#### Seller cập nhật tiến độ

```typescript
await prisma.customOrderProgress.create({
  data: {
    customOrderId: customOrderId,
    title: "Đã hoàn thành phần áo",
    description: "Phần áo đã được may xong, đang làm quần...",
    images: ["/progress/step1.jpg"],
    progressPercent: 50,
  },
})

await prisma.customOrder.update({
  where: { id: customOrderId },
  data: { status: "IN_PROGRESS" },
})
```

---

### **5. Rental (Cho Thuê)**

#### Đặt thuê đồ

```typescript
const rentalOrder = await prisma.rentalOrder.create({
  data: {
    userId: userId,
    rentalItemId: rentalItemId,
    orderNumber: generateOrderNumber(),

    // Thời gian thuê
    startDate: new Date("2026-06-01"),
    endDate: new Date("2026-06-05"),
    totalDays: 5,

    // Giá
    pricePerDay: 200000,
    rentalFee: 1000000, // 5 ngày x 200k
    depositAmount: 2000000,

    status: "PENDING",
  },
})
```

#### Xác nhận và thanh toán cọc

```typescript
await prisma.$transaction([
  // 1. Cập nhật trạng thái
  prisma.rentalOrder.update({
    where: { id: rentalOrderId },
    data: {
      status: "DEPOSIT_PAID",
      confirmedAt: new Date(),
    },
  }),

  // 2. Tạo payment record
  prisma.payment.create({
    data: {
      rentalOrderId: rentalOrderId,
      amount: 2000000,
      paymentMethod: "BANK_TRANSFER",
      paymentType: "RENTAL_DEPOSIT",
      status: "PAID",
      paidAt: new Date(),
    },
  }),
])
```

#### Khách nhận đồ - Kiểm tra tình trạng

```typescript
await prisma.rentalOrder.update({
  where: { id: rentalOrderId },
  data: {
    status: "RENTED",
    conditionAtPickup: "EXCELLENT",
    pickupNotes: "Đồ trong tình trạng tốt, không có vết rách",
    pickedUpAt: new Date(),
  },
})
```

#### Khách trả đồ - Seller kiểm tra

```typescript
await prisma.rentalOrder.update({
  where: { id: rentalOrderId },
  data: {
    status: "RETURNED",
    actualReturnDate: new Date(),
    conditionAtReturn: "GOOD", // Có chút bẩn
    returnNotes: "Có vài vết bẩn nhẹ ở tay áo",
    returnedAt: new Date(),
  },
})
```

#### Tính phí và hoàn cọc

```typescript
const order = await prisma.rentalOrder.findUnique({
  where: { id: rentalOrderId },
})

// Tính phí trễ (nếu có)
const lateDays = calculateLateDays(order.endDate, order.actualReturnDate)
const lateFee = lateDays * order.pricePerDay * 1.5 // Phí trễ x1.5

// Phí hư hỏng (nếu có)
const damageFee = order.conditionAtReturn === "DAMAGED" ? 500000 : 0

// Số tiền hoàn lại
const refundAmount = order.depositAmount - lateFee - damageFee

await prisma.rentalOrder.update({
  where: { id: rentalOrderId },
  data: {
    lateFee: lateFee,
    damageFee: damageFee,
    refundAmount: refundAmount,
    status: "DEPOSIT_REFUNDED",
    completedAt: new Date(),
  },
})
```

---

### **6. Review & Rating**

#### Khách đánh giá sản phẩm

```typescript
const review = await prisma.review.create({
  data: {
    userId: userId,
    productId: productId,
    orderId: orderId, // Chỉ cho phép đánh giá nếu đã mua
    rating: 5,
    title: "Sản phẩm rất đẹp!",
    content: "Chất lượng vải tốt, may đẹp, đúng size...",
    images: ["/reviews/img1.jpg"],
    isVerified: true, // Đã mua hàng
  },
})

// Cập nhật rating của product
const avgRating = await prisma.review.aggregate({
  where: { productId },
  _avg: { rating: true },
  _count: true,
})

await prisma.product.update({
  where: { id: productId },
  data: {
    rating: avgRating._avg.rating,
    reviewCount: avgRating._count,
  },
})
```

#### Seller phản hồi đánh giá

```typescript
await prisma.review.update({
  where: { id: reviewId },
  data: {
    sellerReply: "Cảm ơn bạn đã ủng hộ shop!",
    repliedAt: new Date(),
  },
})
```

---

### **7. Query Examples**

#### Lấy danh sách đơn hàng của seller

```typescript
const orders = await prisma.order.findMany({
  where: {
    sellerId: sellerId,
    status: { in: ["PENDING", "CONFIRMED"] },
  },
  include: {
    user: true, // Thông tin khách
    items: {
      include: {
        product: true,
        variant: true,
      },
    },
  },
  orderBy: { createdAt: "desc" },
})
```

#### Lấy đơn đặt may của seller

```typescript
const customOrders = await prisma.customOrder.findMany({
  where: {
    sellerId: sellerId,
    status: { notIn: ["DRAFT", "CANCELLED"] },
  },
  include: {
    user: true,
    measurement: true,
    progressUpdates: true,
  },
})
```

#### Thống kê doanh thu seller

```typescript
const stats = await prisma.order.aggregate({
  where: {
    sellerId: sellerId,
    status: "COMPLETED",
    createdAt: {
      gte: new Date("2026-01-01"),
      lte: new Date("2026-12-31"),
    },
  },
  _sum: { total: true },
  _count: true,
})

console.log(`Doanh thu: ${stats._sum.total}`)
console.log(`Số đơn: ${stats._count}`)
```

---

## 🔐 **SECURITY BEST PRACTICES**

### 1. Authorization Checks

```typescript
// Kiểm tra seller chỉ xem được đơn của mình
async function getSellerOrders(sellerId: number, requestUserId: number) {
  const user = await prisma.user.findUnique({
    where: { id: requestUserId },
  })

  if (user.role !== "SELLER" || user.id !== sellerId) {
    throw new Error("Unauthorized")
  }

  return prisma.order.findMany({
    where: { sellerId },
  })
}
```

### 2. Validate Order Ownership

```typescript
async function updateOrder(orderId: number, userId: number, data: any) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  })

  if (order.sellerId !== userId) {
    throw new Error("You don't own this order")
  }

  return prisma.order.update({
    where: { id: orderId },
    data,
  })
}
```

---

## 📈 **PERFORMANCE TIPS**

### 1. Sử dụng Index

Schema đã có index cho các field thường query:

- `User`: email, role, status, sellerStatus
- `Product`: sellerId, categoryId, slug, status, type
- `Order`: userId, sellerId, orderNumber, status
- `CustomOrder`: userId, sellerId, orderNumber, status

### 2. Select Only Needed Fields

```typescript
// ❌ Tránh
const users = await prisma.user.findMany()

// ✅ Tốt hơn
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
})
```

### 3. Pagination

```typescript
const products = await prisma.product.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { createdAt: "desc" },
})
```

---

## 🎉 **KẾT LUẬN**

Database đã sẵn sàng cho:

- ✅ Multi-vendor marketplace
- ✅ Bán lẻ, cho thuê, đặt may
- ✅ Type-safe với Prisma
- ✅ Performance tốt với index
- ✅ Dễ mở rộng

**Happy Coding! 🚀**
