# 📊 Entity Relationship Diagram (ERD)

## 🎯 Cosplay Shop Database Schema

---

## 📐 **CORE ENTITIES**

```
┌─────────────────────────────────────────────────────────────┐
│                            USER                              │
├─────────────────────────────────────────────────────────────┤
│ PK  id                    INT                                │
│ UQ  email                 VARCHAR                            │
│     password              VARCHAR                            │
│     name                  VARCHAR                            │
│     phone                 VARCHAR?                           │
│     avatar                VARCHAR?                           │
│     role                  ENUM (CUSTOMER/SELLER/ADMIN)       │
│     status                ENUM                               │
│     emailVerified         BOOLEAN                            │
│                                                               │
│ === SELLER FIELDS (nullable) ===                             │
│     shopName              VARCHAR?                           │
│     shopDescription       TEXT?                              │
│     shopLogo              VARCHAR?                           │
│     shopBanner            VARCHAR?                           │
│     businessLicense       VARCHAR?                           │
│     taxCode               VARCHAR?                           │
│     bankName              VARCHAR?                           │
│     bankAccount           VARCHAR?                           │
│     bankAccountName       VARCHAR?                           │
│     sellerStatus          ENUM?                              │
│     sellerApprovedAt      DATETIME?                          │
│     sellerApprovedBy      INT?                               │
│     sellerRating          FLOAT                              │
│     sellerTotalReviews    INT                                │
│     sellerTotalSales      INT                                │
│                                                               │
│     createdAt             DATETIME                           │
│     updatedAt             DATETIME                           │
│     lastLoginAt           DATETIME?                          │
└─────────────────────────────────────────────────────────────┘
         │
         │ 1:N (as Buyer)
         ├──────────────────────────────────────┐
         │                                       │
         ▼                                       ▼
┌──────────────────────┐              ┌──────────────────────┐
│       ORDER          │              │    CUSTOM ORDER      │
├──────────────────────┤              ├──────────────────────┤
│ PK  id               │              │ PK  id               │
│ FK  userId (Buyer)   │              │ FK  userId (Buyer)   │
│ FK  sellerId ✅      │              │ FK  sellerId ✅      │
│ UQ  orderNumber      │              │ FK  measurementId    │
│     shippingInfo     │              │ UQ  orderNumber      │
│     subtotal         │              │     title            │
│     shippingFee      │              │     description      │
│     discount         │              │     referenceImages  │
│     tax              │              │     characterName    │
│     total            │              │     animeName        │
│     status           │              │     specialRequests  │
│     paymentStatus    │              │     deadline         │
│     paymentMethod    │              │     status           │
│     createdAt        │              │     estimatedPrice   │
└──────────────────────┘              │     depositAmount    │
         │                            │     finalAmount      │
         │ 1:N                        │     totalPaid        │
         ▼                            │     createdAt        │
┌──────────────────────┐              └──────────────────────┘
│     ORDER ITEM       │                       │
├──────────────────────┤                       │ 1:N
│ PK  id               │                       ├─────────────┐
│ FK  orderId          │                       │             │
│ FK  productId        │                       ▼             ▼
│ FK  variantId?       │              ┌─────────────┐ ┌─────────────┐
│     productName      │              │   QUOTE     │ │  PROGRESS   │
│     variantName?     │              ├─────────────┤ ├─────────────┤
│     price            │              │ PK  id      │ │ PK  id      │
│     quantity         │              │ FK  custId  │ │ FK  custId  │
│     subtotal         │              │ FK  sellerId│ │     title   │
└──────────────────────┘              │     price   │ │     desc    │
                                      │     deposit │ │     images  │
                                      │     days    │ │     percent │
                                      │     desc    │ └─────────────┘
                                      │  isAccepted │
                                      │  isRejected │
                                      └─────────────┘

         USER (as Seller)
         │ 1:N
         ▼
┌──────────────────────────────────────┐
│            PRODUCT                    │
├──────────────────────────────────────┤
│ PK  id                                │
│ FK  sellerId                          │
│ FK  categoryId                        │
│ UQ  slug                              │
│     name                              │
│     description                       │
│     shortDescription                  │
│     price                             │
│     comparePrice                      │
│     stock                             │
│     sku                               │
│     type (SALE/RENTAL/BOTH)           │
│     status                            │
│                                       │
│ === RENTAL FIELDS (nullable) ===     │
│     rentalPricePerDay                 │
│     depositAmount                     │
│     minRentalDays                     │
│     maxRentalDays                     │
│                                       │
│     metaTitle                         │
│     metaDescription                   │
│     tags                              │
│     rating                            │
│     reviewCount                       │
│     viewCount                         │
│     soldCount                         │
│     createdAt                         │
│     updatedAt                         │
│     publishedAt                       │
└──────────────────────────────────────┘
         │
         ├─────────────┬──────────────┬──────────────┐
         │ 1:N         │ 1:N          │ 1:1          │ 1:N
         ▼             ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────┐ ┌──────────┐
│PRODUCT IMAGE │ │   VARIANT    │ │  RENTAL  │ │  REVIEW  │
├──────────────┤ ├──────────────┤ │   ITEM   │ ├──────────┤
│ PK  id       │ │ PK  id       │ ├──────────┤ │ PK  id   │
│ FK  productId│ │ FK  productId│ │ PK  id   │ │ FK  userId│
│     url      │ │ UQ  sku      │ │ FK  prodId│ │ FK  prodId│
│     alt      │ │     name     │ │ FK  sellId│ │ FK  orderId│
│     order    │ │     price?   │ │  priceDay│ │  rating  │
│  isPrimary   │ │     stock    │ │  deposit │ │  title   │
└──────────────┘ │  attributes  │ │  minDays │ │  content │
                 │   (JSON)     │ │  maxDays │ │  images  │
                 └──────────────┘ │ condition│ │sellerReply│
                                  │isAvailable│ │isVerified│
                                  │unavailDates│ └──────────┘
                                  └──────────┘
                                       │ 1:N
                                       ▼
                                  ┌──────────────┐
                                  │RENTAL ORDER  │
                                  ├──────────────┤
                                  │ PK  id       │
                                  │ FK  userId   │
                                  │ FK  rentalId │
                                  │ UQ  orderNum │
                                  │  startDate   │
                                  │  endDate     │
                                  │  actualReturn│
                                  │  pricePerDay │
                                  │  totalDays   │
                                  │  rentalFee   │
                                  │  depositAmt  │
                                  │  lateFee     │
                                  │  damageFee   │
                                  │  refundAmt   │
                                  │  status      │
                                  │condAtPickup  │
                                  │condAtReturn  │
                                  │pickupNotes   │
                                  │returnNotes   │
                                  │damageDesc    │
                                  │damageImages  │
                                  └──────────────┘
```

---

## 🔗 **SUPPORTING ENTITIES**

```
┌──────────────────┐
│    CATEGORY      │
├──────────────────┤
│ PK  id           │
│ UQ  slug         │
│ FK  parentId?    │  ◄─┐ Self-referencing
│     name         │    │ (Hierarchy)
│     description  │    │
│     image        │    │
│     order        │    │
│     isActive     │ ───┘
└──────────────────┘
         │ 1:N
         ▼
    (Product)


┌──────────────────┐
│   MEASUREMENT    │
├──────────────────┤
│ PK  id           │
│ FK  userId       │
│     name         │
│     height       │
│     weight       │
│     chest        │
│     waist        │
│     hips         │
│     shoulder     │
│     armLength    │
│     legLength    │
│     neck         │
│  additionalMeas  │
│   (JSON)         │
│     notes        │
│     isDefault    │
└──────────────────┘
         │ 1:N
         ▼
   (CustomOrder)


┌──────────────────┐
│    CART ITEM     │
├──────────────────┤
│ PK  id           │
│ FK  userId       │
│ FK  productId    │
│ FK  variantId?   │
│     quantity     │
│                  │
│ UNIQUE(userId,   │
│  productId,      │
│  variantId)      │
└──────────────────┘


┌──────────────────┐
│     COMMENT      │
├──────────────────┤
│ PK  id           │
│ FK  userId       │
│ FK  productId    │
│ FK  parentId?    │  ◄─┐ Self-referencing
│     content      │    │ (Replies)
│     isPublished  │    │
│     createdAt    │ ───┘
└──────────────────┘


┌──────────────────┐
│     PAYMENT      │
├──────────────────┤
│ PK  id           │
│ FK  orderId?     │ ─┐
│ FK  customOrderId?│ ├─ Polymorphic
│ FK  rentalOrderId?│ ┘  (1 of 3)
│     amount       │
│  paymentMethod   │
│  paymentType     │
│     status       │
│  transactionId   │
│  transactionData │
│   (JSON)         │
│     paidAt       │
└──────────────────┘


┌──────────────────┐
│  NOTIFICATION    │
├──────────────────┤
│ PK  id           │
│ FK  userId       │
│     type         │
│     title        │
│     content      │
│     link         │
│     data (JSON)  │
│     isRead       │
│     readAt       │
│     createdAt    │
└──────────────────┘


┌──────────────────┐
│ PASSWORD RESET   │
├──────────────────┤
│ PK  id           │
│ FK  userId       │
│ UQ  token        │
│     expiresAt    │
│     usedAt       │
│     createdAt    │
└──────────────────┘


┌──────────────────┐
│   SYSTEM FEE     │
├──────────────────┤
│ PK  id           │
│ UQ  name         │
│     description  │
│     feeType      │
│   (PERCENTAGE/   │
│     FIXED)       │
│     feeValue     │
│     isActive     │
└──────────────────┘


┌──────────────────┐
│ SYSTEM SETTING   │
├──────────────────┤
│ PK  id           │
│ UQ  key          │
│     value        │
│     description  │
│     updatedAt    │
└──────────────────┘


┌──────────────────┐
│ORDER STATUS      │
│   HISTORY        │
├──────────────────┤
│ PK  id           │
│ FK  orderId      │
│     status       │
│     note         │
│     createdBy    │
│     createdAt    │
└──────────────────┘


┌──────────────────┐
│CUSTOM ORDER      │
│   REVISION       │
├──────────────────┤
│ PK  id           │
│ FK  customOrderId│
│     description  │
│     images       │
│  sellerResponse  │
│     respondedAt  │
│     createdAt    │
└──────────────────┘
```

---

## 🔑 **KEY RELATIONSHIPS**

### **1. User Relations**

```
User (as Customer)
├── ordersAsBuyer (Order[])
├── customOrdersAsBuyer (CustomOrder[])
├── rentalOrders (RentalOrder[])
├── cartItems (CartItem[])
├── reviews (Review[])
├── comments (Comment[])
├── measurements (Measurement[])
└── notifications (Notification[])

User (as Seller)
├── ordersAsSeller (Order[]) ✅ NEW
├── customOrdersAsSeller (CustomOrder[]) ✅ NEW
├── products (Product[])
├── customOrderQuotes (CustomOrderQuote[])
└── rentalItems (RentalItem[])
```

### **2. Order Relations**

```
Order
├── user (User) - Buyer
├── seller (User) - Seller ✅ NEW
├── items (OrderItem[])
├── payments (Payment[])
├── statusHistory (OrderStatusHistory[])
└── reviews (Review[]) ✅ NEW
```

### **3. Product Relations**

```
Product
├── seller (User)
├── category (Category)
├── images (ProductImage[])
├── variants (ProductVariant[])
├── reviews (Review[])
├── comments (Comment[])
├── cartItems (CartItem[])
├── orderItems (OrderItem[])
└── rentalItem (RentalItem?) - 1:1 if type = RENTAL/BOTH
```

---

## 📈 **CARDINALITY**

| Relationship                   | Type | Description                                |
| ------------------------------ | ---- | ------------------------------------------ |
| User → Order (as Buyer)        | 1:N  | 1 user có nhiều đơn mua                    |
| User → Order (as Seller)       | 1:N  | 1 seller có nhiều đơn bán ✅               |
| User → CustomOrder (as Buyer)  | 1:N  | 1 user có nhiều đơn đặt may                |
| User → CustomOrder (as Seller) | 1:N  | 1 seller nhận nhiều đơn may ✅             |
| User → Product                 | 1:N  | 1 seller có nhiều sản phẩm                 |
| Order → OrderItem              | 1:N  | 1 đơn có nhiều sản phẩm                    |
| Product → ProductImage         | 1:N  | 1 sản phẩm có nhiều ảnh                    |
| Product → ProductVariant       | 1:N  | 1 sản phẩm có nhiều variant                |
| Product → RentalItem           | 1:1  | 1 sản phẩm có 1 rental item (nếu cho thuê) |
| RentalItem → RentalOrder       | 1:N  | 1 đồ thuê có nhiều đơn thuê                |
| CustomOrder → CustomOrderQuote | 1:N  | 1 đơn may có nhiều báo giá                 |
| Category → Category            | 1:N  | Self-referencing (parent-child)            |
| Comment → Comment              | 1:N  | Self-referencing (replies)                 |

---

## 🎨 **ENUM VALUES**

```sql
-- UserRole
CUSTOMER, SELLER, ADMIN

-- UserStatus
ACTIVE, INACTIVE, SUSPENDED, PENDING_VERIFICATION

-- SellerStatus
PENDING, APPROVED, REJECTED, SUSPENDED

-- ProductType
SALE, RENTAL, BOTH

-- ProductStatus
DRAFT, ACTIVE, OUT_OF_STOCK, DISCONTINUED

-- OrderStatus
PENDING, CONFIRMED, PROCESSING, SHIPPING,
DELIVERED, COMPLETED, CANCELLED, REFUNDED

-- PaymentStatus
PENDING, PAID, FAILED, REFUNDED, PARTIAL

-- PaymentMethod
COD, BANK_TRANSFER, MOMO, VNPAY, ZALOPAY, CREDIT_CARD

-- PaymentType
ORDER, CUSTOM_DEPOSIT, CUSTOM_FINAL, RENTAL_DEPOSIT, RENTAL_FEE

-- CustomOrderStatus
DRAFT, SUBMITTED, QUOTED, QUOTE_ACCEPTED, DEPOSIT_PAID,
IN_PROGRESS, REVISION_REQUESTED, READY, COMPLETED, CANCELLED

-- RentalStatus
PENDING, CONFIRMED, DEPOSIT_PAID, READY_FOR_PICKUP, RENTED,
RETURNED, DEPOSIT_REFUNDED, COMPLETED, CANCELLED, OVERDUE

-- RentalItemCondition
EXCELLENT, GOOD, FAIR, DAMAGED

-- NotificationType
ORDER_STATUS, PAYMENT, CUSTOM_ORDER, RENTAL,
REVIEW, SYSTEM, PROMOTION
```

---

## 🔍 **INDEXES**

```sql
-- User
INDEX(email)
INDEX(role)
INDEX(status)
INDEX(sellerStatus)

-- Product
INDEX(sellerId)
INDEX(categoryId)
INDEX(slug)
INDEX(status)
INDEX(type)

-- Order
INDEX(userId)
INDEX(sellerId) ✅ NEW
INDEX(orderNumber)
INDEX(status)

-- CustomOrder
INDEX(userId)
INDEX(sellerId) ✅ NEW
INDEX(orderNumber)
INDEX(status)

-- Review
INDEX(userId)
INDEX(productId)
INDEX(orderId) ✅ NEW
INDEX(rating)

-- RentalOrder
INDEX(userId)
INDEX(rentalItemId)
INDEX(orderNumber)
INDEX(status)
INDEX(startDate, endDate)

-- Category
INDEX(slug)
INDEX(parentId)

-- Payment
INDEX(orderId)
INDEX(customOrderId)
INDEX(rentalOrderId)
INDEX(transactionId)

-- Notification
INDEX(userId)
INDEX(isRead)
INDEX(createdAt)
```

---

## ✅ **CONSTRAINTS**

### **Unique Constraints**

- User.email
- Product.slug
- Product.sku
- ProductVariant.sku
- Order.orderNumber
- CustomOrder.orderNumber
- RentalOrder.orderNumber
- Category.slug
- Payment.transactionId
- PasswordReset.token
- SystemFee.name
- SystemSetting.key
- CartItem(userId, productId, variantId)

### **Foreign Key Constraints**

- All FK with `onDelete: Cascade` for child records
- All FK with `onDelete: Restrict` for referenced records

---

## 📊 **TOTAL STATISTICS**

- **Total Models:** 19
- **Total Enums:** 11
- **Total Indexes:** 40+
- **Total Unique Constraints:** 13
- **Total Foreign Keys:** 50+

---

**Generated:** 11/05/2026  
**Version:** 1.0.0  
**Tool:** Prisma ORM
