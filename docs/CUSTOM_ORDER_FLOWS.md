# 🎨 Custom Order - UI/UX Flows

## 🎯 2 Luồng Đặt May

---

## 📍 **FLOW 1: DIRECT ORDER** (Khách chọn seller trước)

### **Bước 1: Browse Sellers**

```
┌─────────────────────────────────────────┐
│        Danh Sách Seller / Shop          │
├─────────────────────────────────────────┤
│                                         │
│  🏪 Shop A - Cosplay Việt Nam          │
│     ⭐ 4.8 (120 reviews)               │
│     📦 150 đơn hoàn thành              │
│     💬 Phản hồi trong 2h               │
│     [Xem Portfolio] [Đặt May]          │
│                                         │
│  🏪 Shop B - May Đồ Anime              │
│     ⭐ 4.9 (85 reviews)                │
│     📦 95 đơn hoàn thành               │
│     💬 Phản hồi trong 1h               │
│     [Xem Portfolio] [Đặt May]          │
│                                         │
└─────────────────────────────────────────┘
```

**Code:**

```typescript
// pages/sellers/index.tsx
function SellersPage() {
  const { data: sellers } = useQuery({
    queryKey: ['sellers'],
    queryFn: async () => {
      const res = await fetch('/api/sellers?status=APPROVED');
      return res.json();
    }
  });

  return (
    <div className="sellers-grid">
      {sellers?.map(seller => (
        <SellerCard
          key={seller.id}
          seller={seller}
          onViewPortfolio={() => router.push(`/sellers/${seller.id}`)}
          onOrderCustom={() => router.push(`/custom-order/new?sellerId=${seller.id}`)}
        />
      ))}
    </div>
  );
}
```

---

### **Bước 2: Xem Portfolio Seller**

```
┌─────────────────────────────────────────┐
│         Shop A - Cosplay Việt Nam       │
├─────────────────────────────────────────┤
│  📷 [Ảnh 1] [Ảnh 2] [Ảnh 3] [Ảnh 4]   │
│                                         │
│  📝 Giới thiệu:                        │
│  Chuyên may đồ cosplay anime, game...  │
│                                         │
│  ⭐ Đánh giá: 4.8/5 (120 reviews)      │
│  📦 Hoàn thành: 150 đơn                │
│  ⏱️ Thời gian: 20-30 ngày              │
│  💰 Giá: 1.5M - 5M                     │
│                                         │
│  🎨 Portfolio (Các đơn đã làm):        │
│  [Ảnh đơn 1] [Ảnh đơn 2] [Ảnh đơn 3]  │
│                                         │
│  💬 Reviews:                           │
│  ⭐⭐⭐⭐⭐ "Rất đẹp, may tỉ mỉ"       │
│  ⭐⭐⭐⭐⭐ "Đúng deadline, chất lượng" │
│                                         │
│  [💬 Nhắn tin] [✂️ Đặt May Ngay]      │
└─────────────────────────────────────────┘
```

**Code:**

```typescript
// pages/sellers/[id].tsx
function SellerProfilePage({ sellerId }) {
  const { data: seller } = useQuery({
    queryKey: ['seller', sellerId],
    queryFn: async () => {
      const res = await fetch(`/api/sellers/${sellerId}`);
      return res.json();
    }
  });

  // Lấy portfolio (các đơn đã hoàn thành)
  const { data: portfolio } = useQuery({
    queryKey: ['seller-portfolio', sellerId],
    queryFn: async () => {
      const res = await fetch(`/api/sellers/${sellerId}/portfolio`);
      return res.json();
    }
  });

  return (
    <div>
      <SellerHeader seller={seller} />
      <SellerStats seller={seller} />
      <SellerPortfolio items={portfolio} />
      <SellerReviews sellerId={sellerId} />

      <div className="actions">
        <Button onClick={() => startChat(sellerId)}>
          💬 Nhắn tin
        </Button>
        <Button
          variant="primary"
          onClick={() => router.push(`/custom-order/new?sellerId=${sellerId}`)}
        >
          ✂️ Đặt May Ngay
        </Button>
      </div>
    </div>
  );
}
```

---

### **Bước 3: Tạo Yêu Cầu Đặt May**

```
┌─────────────────────────────────────────┐
│       Tạo Yêu Cầu Đặt May               │
│       Gửi đến: Shop A                   │
├─────────────────────────────────────────┤
│                                         │
│  📝 Tiêu đề:                           │
│  [Đặt may bộ đồ Naruto Sage Mode]      │
│                                         │
│  📄 Mô tả chi tiết:                    │
│  [Cần may bộ đồ Naruto Sage Mode...]   │
│                                         │
│  🎭 Nhân vật:                          │
│  [Naruto Uzumaki]                      │
│                                         │
│  📺 Anime/Game:                        │
│  [Naruto Shippuden]                    │
│                                         │
│  📷 Ảnh tham khảo:                     │
│  [Upload] [Ảnh 1] [Ảnh 2]             │
│                                         │
│  📏 Số đo:                             │
│  [Chọn số đo đã lưu ▼]                 │
│  hoặc [Nhập số đo mới]                 │
│                                         │
│  📅 Deadline mong muốn:                │
│  [01/07/2026]                          │
│                                         │
│  📝 Yêu cầu đặc biệt:                  │
│  [Cần thêm chi tiết rồng ở lưng áo...] │
│                                         │
│  [Hủy] [Gửi Yêu Cầu]                  │
└─────────────────────────────────────────┘
```

**Code:**

```typescript
// pages/custom-order/new.tsx
function CreateCustomOrderPage() {
  const router = useRouter();
  const { sellerId } = router.query;

  const [form, setForm] = useState({
    title: '',
    description: '',
    characterName: '',
    animeName: '',
    referenceImages: [],
    measurementId: null,
    deadline: null,
    specialRequests: ''
  });

  const createOrder = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          sellerId: parseInt(sellerId), // ✅ Gửi cho seller cụ thể
          status: 'SUBMITTED'
        })
      });
      return res.json();
    },
    onSuccess: (order) => {
      toast.success('Đã gửi yêu cầu đến seller!');
      router.push(`/custom-order/${order.id}`);
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createOrder.mutate(form);
    }}>
      <Input
        label="Tiêu đề"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <Textarea
        label="Mô tả chi tiết"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <ImageUpload
        label="Ảnh tham khảo"
        value={form.referenceImages}
        onChange={(images) => setForm({ ...form, referenceImages: images })}
      />

      <MeasurementSelector
        value={form.measurementId}
        onChange={(id) => setForm({ ...form, measurementId: id })}
      />

      <DatePicker
        label="Deadline mong muốn"
        value={form.deadline}
        onChange={(date) => setForm({ ...form, deadline: date })}
      />

      <Button type="submit">Gửi Yêu Cầu</Button>
    </form>
  );
}
```

---

### **Bước 4: Seller Nhận & Xử Lý**

**Seller Dashboard:**

```
┌─────────────────────────────────────────┐
│       Đơn Đặt May Mới                   │
├─────────────────────────────────────────┤
│                                         │
│  📋 #CM001 - Bộ đồ Naruto Sage Mode    │
│  👤 Khách: Nguyễn Văn A                │
│  📅 Deadline: 01/07/2026               │
│  📏 Số đo: Đã cung cấp                 │
│  📷 Ảnh tham khảo: 3 ảnh               │
│                                         │
│  [Xem Chi Tiết] [💬 Chat] [Báo Giá]   │
│                                         │
└─────────────────────────────────────────┘
```

**Seller có 2 lựa chọn:**

#### **Option A: Chấp Nhận & Báo Giá**

```typescript
async function acceptAndQuote(customOrderId, quoteData) {
  // Tạo báo giá
  await fetch(`/api/custom-orders/${customOrderId}/quotes`, {
    method: "POST",
    body: JSON.stringify({
      quotedPrice: 2000000,
      depositAmount: 1000000,
      estimatedDays: 30,
      description: "Tôi sẽ sử dụng vải cao cấp...",
    }),
  })

  // Cập nhật trạng thái
  await fetch(`/api/custom-orders/${customOrderId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "QUOTED" }),
  })
}
```

#### **Option B: Từ Chối**

```typescript
async function rejectOrder(customOrderId, reason) {
  await fetch(`/api/custom-orders/${customOrderId}/reject`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  })

  // Hệ thống tự động:
  // 1. Cập nhật status = CANCELLED
  // 2. Gửi tin nhắn cho khách
  // 3. Gửi notification
}
```

---

### **Bước 5: Khách Nhận Báo Giá**

```
┌─────────────────────────────────────────┐
│       Báo Giá Từ Shop A                 │
├─────────────────────────────────────────┤
│                                         │
│  💰 Giá: 2,000,000đ                    │
│  💵 Cọc: 1,000,000đ (50%)              │
│  ⏱️ Thời gian: 30 ngày                 │
│                                         │
│  📝 Chi tiết:                          │
│  Tôi sẽ sử dụng vải cao cấp từ Nhật... │
│                                         │
│  [💬 Chat với Seller]                  │
│  [❌ Từ Chối] [✅ Chấp Nhận]           │
└─────────────────────────────────────────┘
```

**Code:**

```typescript
function QuoteView({ quote, customOrderId }) {
  const acceptQuote = useMutation({
    mutationFn: async () => {
      await fetch(`/api/custom-orders/${customOrderId}/accept-quote`, {
        method: 'POST',
        body: JSON.stringify({ quoteId: quote.id })
      });
    },
    onSuccess: () => {
      toast.success('Đã chấp nhận báo giá!');
      router.push(`/checkout/custom-order/${customOrderId}`);
    }
  });

  return (
    <div className="quote-card">
      <h3>Báo Giá Từ {quote.seller.shopName}</h3>
      <div className="price">
        <span>Giá: {formatMoney(quote.quotedPrice)}</span>
        <span>Cọc: {formatMoney(quote.depositAmount)}</span>
        <span>Thời gian: {quote.estimatedDays} ngày</span>
      </div>
      <p>{quote.description}</p>

      <div className="actions">
        <Button onClick={() => startChat(quote.sellerId)}>
          💬 Chat với Seller
        </Button>
        <Button variant="primary" onClick={() => acceptQuote.mutate()}>
          ✅ Chấp Nhận
        </Button>
      </div>
    </div>
  );
}
```

---

## 📍 **FLOW 2: MARKETPLACE** (Khách đăng công khai)

### **Bước 1: Tạo Yêu Cầu Công Khai**

```
┌─────────────────────────────────────────┐
│       Đăng Yêu Cầu Đặt May              │
│       (Nhận báo giá từ nhiều seller)    │
├─────────────────────────────────────────┤
│                                         │
│  📝 Tiêu đề:                           │
│  [Cần may bộ đồ Genshin Impact]        │
│                                         │
│  📄 Mô tả:                             │
│  [Cần may bộ đồ Raiden Shogun...]      │
│                                         │
│  💰 Ngân sách dự kiến:                 │
│  [2,000,000đ - 3,000,000đ]             │
│                                         │
│  📅 Deadline:                          │
│  [15/07/2026]                          │
│                                         │
│  📷 Ảnh tham khảo: [Upload]            │
│  📏 Số đo: [Chọn số đo]                │
│                                         │
│  [Hủy] [Đăng Yêu Cầu]                 │
└─────────────────────────────────────────┘
```

**Code:**

```typescript
function CreatePublicCustomOrder() {
  const createOrder = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          sellerId: 1, // ✅ System user (marketplace mode)
          status: 'DRAFT' // Chưa gửi cho ai
        })
      });
      return res.json();
    },
    onSuccess: (order) => {
      toast.success('Đã đăng yêu cầu! Chờ seller báo giá.');
      router.push(`/custom-order/${order.id}`);
    }
  });

  return <CustomOrderForm onSubmit={createOrder.mutate} />;
}
```

---

### **Bước 2: Sellers Browse & Gửi Báo Giá**

**Seller Dashboard:**

```
┌─────────────────────────────────────────┐
│       Yêu Cầu Đặt May Công Khai         │
├─────────────────────────────────────────┤
│                                         │
│  📋 Bộ đồ Genshin Impact               │
│  👤 Khách: Nguyễn Văn B                │
│  💰 Ngân sách: 2M - 3M                 │
│  📅 Deadline: 15/07/2026               │
│  📷 3 ảnh tham khảo                    │
│  💬 2 seller đã báo giá                │
│                                         │
│  [Xem Chi Tiết] [Gửi Báo Giá]         │
│                                         │
│  📋 Bộ đồ Naruto Hokage                │
│  👤 Khách: Trần Thị C                  │
│  💰 Ngân sách: 1.5M - 2M               │
│  📅 Deadline: 20/07/2026               │
│  ✅ Bạn đã báo giá                     │
│                                         │
└─────────────────────────────────────────┘
```

**Code:**

```typescript
// pages/seller/custom-orders/marketplace.tsx
function MarketplaceOrders() {
  const { data: orders } = useQuery({
    queryKey: ['marketplace-orders'],
    queryFn: async () => {
      const res = await fetch('/api/seller/marketplace-orders');
      return res.json();
    }
  });

  return (
    <div>
      {orders?.map(order => (
        <OrderCard
          key={order.id}
          order={order}
          onViewDetail={() => router.push(`/seller/custom-orders/${order.id}`)}
          onSendQuote={() => openQuoteModal(order.id)}
        />
      ))}
    </div>
  );
}

function sendQuote(customOrderId, quoteData) {
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/custom-orders/${customOrderId}/quotes`, {
        method: 'POST',
        body: JSON.stringify(quoteData)
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success('Đã gửi báo giá!');
      // Tự động tạo conversation để khách có thể chat
    }
  });

  return mutation;
}
```

---

### **Bước 3: Khách Nhận Nhiều Báo Giá**

```
┌─────────────────────────────────────────┐
│       Yêu Cầu #CM002                    │
│       Bộ đồ Genshin Impact              │
├─────────────────────────────────────────┤
│                                         │
│  📊 Đã nhận 3 báo giá:                 │
│                                         │
│  🏪 Shop A - Cosplay Việt Nam          │
│     💰 2,500,000đ | ⏱️ 25 ngày         │
│     ⭐ 4.8 (120 reviews)               │
│     [Xem Chi Tiết] [💬 Chat] [Chọn]   │
│                                         │
│  🏪 Shop B - May Đồ Anime              │
│     💰 2,200,000đ | ⏱️ 30 ngày         │
│     ⭐ 4.9 (85 reviews)                │
│     [Xem Chi Tiết] [💬 Chat] [Chọn]   │
│                                         │
│  🏪 Shop C - Cosplay Pro               │
│     💰 2,800,000đ | ⏱️ 20 ngày         │
│     ⭐ 4.7 (50 reviews)                │
│     [Xem Chi Tiết] [💬 Chat] [Chọn]   │
│                                         │
└─────────────────────────────────────────┘
```

**Code:**

```typescript
function CustomOrderQuotes({ customOrderId }) {
  const { data: quotes } = useQuery({
    queryKey: ['custom-order-quotes', customOrderId],
    queryFn: async () => {
      const res = await fetch(`/api/custom-orders/${customOrderId}/quotes`);
      return res.json();
    }
  });

  const selectQuote = useMutation({
    mutationFn: async (quoteId) => {
      await fetch(`/api/custom-orders/${customOrderId}/select-quote`, {
        method: 'POST',
        body: JSON.stringify({ quoteId })
      });
    },
    onSuccess: (_, quoteId) => {
      const selectedQuote = quotes.find(q => q.id === quoteId);
      toast.success(`Đã chọn ${selectedQuote.seller.shopName}!`);
      router.push(`/checkout/custom-order/${customOrderId}`);
    }
  });

  return (
    <div className="quotes-list">
      <h2>Đã nhận {quotes?.length} báo giá</h2>

      {quotes?.map(quote => (
        <QuoteCard
          key={quote.id}
          quote={quote}
          onViewDetail={() => openQuoteDetail(quote)}
          onChat={() => startChat(quote.sellerId)}
          onSelect={() => selectQuote.mutate(quote.id)}
        />
      ))}
    </div>
  );
}
```

---

## 💬 **CHAT INTEGRATION**

### **Chat từ Custom Order**

```typescript
// Trong trang chi tiết custom order
function CustomOrderDetail({ order }) {
  const startChat = async () => {
    // Tạo/lấy conversation
    const res = await fetch('/api/conversations/get-or-create', {
      method: 'POST',
      body: JSON.stringify({
        otherUserId: order.sellerId,
        customOrderId: order.id
      })
    });

    const { conversationId } = await res.json();
    router.push(`/messages/${conversationId}`);
  };

  return (
    <div>
      <OrderInfo order={order} />

      <Button onClick={startChat}>
        💬 Chat với Seller
      </Button>
    </div>
  );
}
```

---

## 🎯 **TỔNG KẾT**

### ✅ **2 Luồng Đã Được Thiết Kế:**

1. **Direct Order:**
   - Khách browse sellers → Xem portfolio → Chọn 1 seller → Tạo yêu cầu
   - Seller nhận → Báo giá hoặc từ chối
   - Khách chấp nhận → Thanh toán cọc

2. **Marketplace:**
   - Khách tạo yêu cầu công khai
   - Nhiều seller gửi báo giá
   - Khách so sánh → Chọn 1 seller → Thanh toán cọc

### ✅ **Chat Integration:**

- Chat từ product page
- Chat từ custom order
- Chat từ báo giá
- Real-time với Socket.IO

---

**Ready to implement! 🚀**
