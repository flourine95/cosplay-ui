# 🎭 Cosplay Shop - Database Documentation

## 📦 **ĐÃ HOÀN THÀNH**

✅ Schema database hoàn chỉnh (19 models)  
✅ Migration đã chạy thành công  
✅ Prisma Client đã được generate  
✅ Sửa tất cả vấn đề về relations

---

## 📁 **CÁC FILE QUAN TRỌNG**

| File                   | Mô tả                             |
| ---------------------- | --------------------------------- |
| `prisma/schema.prisma` | Schema chính (19 models)          |
| `SCHEMA_CHANGES.md`    | Chi tiết các thay đổi quan trọng  |
| `DATABASE_GUIDE.md`    | Hướng dẫn sử dụng & code examples |
| `prisma/migrations/`   | Các file migration                |

---

## 🎯 **TÍNH NĂNG CHÍNH**

### **1. Multi-Vendor Marketplace**

- 1 User có thể là Customer, Seller, hoặc Admin
- Seller được admin duyệt trước khi bán hàng
- Mỗi seller quản lý shop riêng

### **2. Sản Phẩm Linh Hoạt**

- **SALE**: Chỉ bán
- **RENTAL**: Chỉ cho thuê
- **BOTH**: Vừa bán vừa cho thuê
- Hỗ trợ variants (size, màu sắc)
- Nhiều ảnh cho mỗi sản phẩm

### **3. Đặt May Đo (Custom Order)**

- Khách lưu số đo cá nhân
- Gửi yêu cầu trực tiếp cho shop
- Seller báo giá
- Theo dõi tiến độ gia công
- Yêu cầu chỉnh sửa

### **4. Cho Thuê Đồ (Rental)**

- Đặt lịch thuê theo ngày
- Quản lý tiền cọc
- Kiểm tra tình trạng đồ (nhận & trả)
- Tính phí trễ & phí hư hỏng
- Hoàn cọc tự động

### **5. Đánh Giá & Bình Luận**

- Đánh giá 1-5 sao
- Chỉ cho phép đánh giá nếu đã mua
- Seller có thể phản hồi
- Bình luận có hỗ trợ reply

---

## 🔧 **CÁC THAY ĐỔI QUAN TRỌNG**

### **✅ Đã Sửa 3 Vấn Đề Critical:**

1. **Thêm `sellerId` vào Order**
   - Mỗi đơn hàng thuộc về 1 seller
   - Dễ query đơn hàng của seller
   - Logic: 1 Order = 1 Seller (như Shopee)

2. **Thêm `sellerId` vào CustomOrder**
   - Khách chọn shop trước khi đặt may
   - Phù hợp với ngành cosplay

3. **Thêm relation `order` vào Review**
   - Prisma hiểu rõ mối quan hệ
   - Type-safe 100%

---

## 🚀 **CÁCH SỬ DỤNG**

### **1. Kết Nối Database**

```typescript
import { PrismaClient } from "@/app/generated/prisma"

const prisma = new PrismaClient()
```

### **2. Query Cơ Bản**

```typescript
// Lấy tất cả sản phẩm
const products = await prisma.product.findMany({
  where: { status: "ACTIVE" },
  include: {
    images: true,
    seller: {
      select: {
        shopName: true,
        sellerRating: true,
      },
    },
  },
})

// Lấy đơn hàng của seller
const orders = await prisma.order.findMany({
  where: { sellerId: sellerId },
  include: {
    user: true,
    items: {
      include: {
        product: true,
      },
    },
  },
})

// Tạo đơn đặt may
const customOrder = await prisma.customOrder.create({
  data: {
    userId: userId,
    sellerId: sellerId, // ✅ Bắt buộc
    orderNumber: generateOrderNumber(),
    title: "Đặt may bộ đồ Naruto",
    description: "...",
    status: "SUBMITTED",
  },
})
```

### **3. Checkout Logic (Tách Đơn Theo Seller)**

```typescript
// Group giỏ hàng theo seller
const itemsBySeller = groupBy(cartItems, (item) => item.product.sellerId)

// Tạo 1 Order cho mỗi seller
for (const [sellerId, items] of Object.entries(itemsBySeller)) {
  await prisma.order.create({
    data: {
      userId: userId,
      sellerId: parseInt(sellerId), // ✅ Quan trọng!
      orderNumber: generateOrderNumber(),
      // ... thông tin khác
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity,
        })),
      },
    },
  })
}
```

---

## 📊 **DATABASE SCHEMA OVERVIEW**

```
User (1 bảng cho tất cả: Customer/Seller/Admin)
├── ordersAsBuyer (Order[])
├── ordersAsSeller (Order[])
├── customOrdersAsBuyer (CustomOrder[])
├── customOrdersAsSeller (CustomOrder[])
├── products (Product[]) - nếu là Seller
├── cartItems (CartItem[])
├── reviews (Review[])
└── rentalOrders (RentalOrder[])

Product
├── seller (User)
├── category (Category)
├── images (ProductImage[])
├── variants (ProductVariant[])
├── reviews (Review[])
├── rentalItem (RentalItem?) - nếu type = RENTAL/BOTH
└── orderItems (OrderItem[])

Order
├── user (User) - Người mua
├── seller (User) - Người bán ✅
├── items (OrderItem[])
├── payments (Payment[])
└── reviews (Review[])

CustomOrder
├── user (User) - Khách đặt may
├── seller (User) - Shop nhận may ✅
├── measurement (Measurement)
├── quotes (CustomOrderQuote[])
├── progressUpdates (CustomOrderProgress[])
└── revisions (CustomOrderRevision[])

RentalOrder
├── user (User)
├── rentalItem (RentalItem)
└── payments (Payment[])
```

---

## 🎨 **ENUMS**

### **UserRole**

- `CUSTOMER` - Khách hàng
- `SELLER` - Người bán
- `ADMIN` - Quản trị viên

### **ProductType**

- `SALE` - Chỉ bán
- `RENTAL` - Chỉ cho thuê
- `BOTH` - Cả hai

### **OrderStatus**

- `PENDING` → `CONFIRMED` → `PROCESSING` → `SHIPPING` → `DELIVERED` → `COMPLETED`
- `CANCELLED`, `REFUNDED`

### **CustomOrderStatus**

- `DRAFT` → `SUBMITTED` → `QUOTED` → `QUOTE_ACCEPTED` → `DEPOSIT_PAID` → `IN_PROGRESS` → `READY` → `COMPLETED`
- `REVISION_REQUESTED`, `CANCELLED`

### **RentalStatus**

- `PENDING` → `CONFIRMED` → `DEPOSIT_PAID` → `READY_FOR_PICKUP` → `RENTED` → `RETURNED` → `DEPOSIT_REFUNDED` → `COMPLETED`
- `CANCELLED`, `OVERDUE`

---

## 🔐 **SECURITY CHECKLIST**

- ✅ Password được hash (bcrypt/argon2)
- ✅ Email verification
- ✅ Password reset với token có thời hạn
- ✅ Authorization checks (seller chỉ xem đơn của mình)
- ✅ Validate ownership trước khi update
- ✅ Admin approval cho seller

---

## 📈 **PERFORMANCE**

### **Index đã được thêm cho:**

- User: email, role, status, sellerStatus
- Product: sellerId, categoryId, slug, status, type
- Order: userId, **sellerId**, orderNumber, status
- CustomOrder: userId, **sellerId**, orderNumber, status
- Review: userId, productId, **orderId**, rating

### **Tips:**

- Sử dụng `select` để chỉ lấy field cần thiết
- Pagination cho danh sách dài
- Eager loading với `include` khi cần
- Sử dụng `transaction` cho operations phức tạp

---

## 📚 **TÀI LIỆU THAM KHẢO**

1. **SCHEMA_CHANGES.md** - Chi tiết các thay đổi & lý do
2. **DATABASE_GUIDE.md** - Code examples đầy đủ
3. **Prisma Docs** - https://www.prisma.io/docs

---

## 🎉 **READY TO CODE!**

Database đã sẵn sàng 100%. Bạn có thể bắt đầu:

1. ✅ Tạo API endpoints
2. ✅ Implement authentication
3. ✅ Build UI components
4. ✅ Test business logic

**Chúc bạn code vui vẻ! 🚀**

---

**Version:** 1.0.0  
**Last Updated:** 11/05/2026  
**Author:** Kiro AI
