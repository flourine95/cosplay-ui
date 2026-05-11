# 💬 Messaging System - Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Hệ thống chat 1-1 giữa Customer và Seller để:

- Trao đổi về sản phẩm
- Thảo luận yêu cầu đặt may
- Hỏi đáp về đơn thuê
- Hỗ trợ khách hàng

---

## 📊 **DATABASE SCHEMA**

### **Conversation (Cuộc trò chuyện)**

```prisma
model Conversation {
  id        Int      @id
  user1Id   Int      // Customer
  user2Id   Int      // Seller

  // Liên kết với đơn hàng (optional)
  orderId       Int?
  customOrderId Int?
  rentalOrderId Int?

  lastMessageAt DateTime?

  messages Message[]

  UNIQUE(user1Id, user2Id) // Mỗi cặp chỉ có 1 conversation
}
```

### **Message (Tin nhắn)**

```prisma
model Message {
  id             Int
  conversationId Int
  senderId       Int

  content        String
  attachments    String[] // URLs

  isRead         Boolean
  readAt         DateTime?

  createdAt      DateTime
}
```

---

## 💻 **CODE EXAMPLES**

### **1. Tạo hoặc Lấy Conversation**

```typescript
async function getOrCreateConversation(
  user1Id: number,
  user2Id: number,
  context?: {
    orderId?: number
    customOrderId?: number
    rentalOrderId?: number
  }
) {
  // Đảm bảo user1Id < user2Id để tránh duplicate
  const [smallerId, largerId] =
    user1Id < user2Id ? [user1Id, user2Id] : [user2Id, user1Id]

  // Tìm hoặc tạo conversation
  let conversation = await prisma.conversation.findUnique({
    where: {
      user1Id_user2Id: {
        user1Id: smallerId,
        user2Id: largerId,
      },
    },
    include: {
      user1: {
        select: { id: true, name: true, avatar: true, role: true },
      },
      user2: {
        select: { id: true, name: true, avatar: true, role: true },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 50, // Lấy 50 tin nhắn gần nhất
      },
    },
  })

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        user1Id: smallerId,
        user2Id: largerId,
        ...context,
      },
      include: {
        user1: {
          select: { id: true, name: true, avatar: true, role: true },
        },
        user2: {
          select: { id: true, name: true, avatar: true, role: true },
        },
        messages: true,
      },
    })
  }

  return conversation
}
```

---

### **2. Gửi Tin Nhắn**

```typescript
async function sendMessage(
  conversationId: number,
  senderId: number,
  content: string,
  attachments?: string[]
) {
  // Validate sender thuộc conversation
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  })

  if (!conversation) {
    throw new Error("Conversation not found")
  }

  if (senderId !== conversation.user1Id && senderId !== conversation.user2Id) {
    throw new Error("You are not part of this conversation")
  }

  // Tạo message
  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
      attachments: attachments || [],
    },
    include: {
      sender: {
        select: { id: true, name: true, avatar: true },
      },
    },
  })

  // Cập nhật lastMessageAt
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { lastMessageAt: new Date() },
  })

  // Gửi notification cho người nhận
  const receiverId =
    senderId === conversation.user1Id
      ? conversation.user2Id
      : conversation.user1Id

  await prisma.notification.create({
    data: {
      userId: receiverId,
      type: "SYSTEM",
      title: "Tin nhắn mới",
      content: `${message.sender.name}: ${content.substring(0, 50)}...`,
      link: `/messages/${conversationId}`,
    },
  })

  return message
}
```

---

### **3. Lấy Danh Sách Conversations**

```typescript
async function getUserConversations(userId: number) {
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [{ user1Id: userId }, { user2Id: userId }],
    },
    include: {
      user1: {
        select: { id: true, name: true, avatar: true, shopName: true },
      },
      user2: {
        select: { id: true, name: true, avatar: true, shopName: true },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1, // Lấy tin nhắn cuối cùng
      },
      _count: {
        select: {
          messages: {
            where: {
              senderId: { not: userId },
              isRead: false,
            },
          },
        },
      },
    },
    orderBy: {
      lastMessageAt: "desc",
    },
  })

  // Format response
  return conversations.map((conv) => {
    const otherUser = conv.user1Id === userId ? conv.user2 : conv.user1
    const lastMessage = conv.messages[0]
    const unreadCount = conv._count.messages

    return {
      id: conv.id,
      otherUser,
      lastMessage,
      unreadCount,
      lastMessageAt: conv.lastMessageAt,
    }
  })
}
```

---

### **4. Đánh Dấu Đã Đọc**

```typescript
async function markMessagesAsRead(conversationId: number, userId: number) {
  // Đánh dấu tất cả tin nhắn chưa đọc của người khác
  await prisma.message.updateMany({
    where: {
      conversationId,
      senderId: { not: userId },
      isRead: false,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  })
}
```

---

### **5. Lấy Messages Của Conversation**

```typescript
async function getMessages(
  conversationId: number,
  userId: number,
  options?: {
    cursor?: number // Message ID
    take?: number
  }
) {
  // Validate user thuộc conversation
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  })

  if (!conversation) {
    throw new Error("Conversation not found")
  }

  if (userId !== conversation.user1Id && userId !== conversation.user2Id) {
    throw new Error("Unauthorized")
  }

  // Lấy messages với pagination
  const messages = await prisma.message.findMany({
    where: { conversationId },
    include: {
      sender: {
        select: { id: true, name: true, avatar: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: options?.take || 50,
    ...(options?.cursor && {
      cursor: { id: options.cursor },
      skip: 1,
    }),
  })

  return messages.reverse() // Đảo ngược để hiển thị từ cũ → mới
}
```

---

## 🎨 **UI/UX FLOWS**

### **Flow 1: Chat từ Product Page**

```typescript
// User click "Nhắn tin cho shop" trên trang sản phẩm
async function startChatFromProduct(userId: number, productId: number) {
  // 1. Lấy thông tin seller
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { sellerId: true },
  })

  // 2. Tạo/lấy conversation
  const conversation = await getOrCreateConversation(userId, product.sellerId)

  // 3. Redirect đến chat
  return { conversationId: conversation.id }
}
```

---

### **Flow 2: Chat từ Custom Order**

```typescript
// Khách muốn hỏi seller về đơn đặt may
async function startChatFromCustomOrder(userId: number, customOrderId: number) {
  // 1. Lấy thông tin đơn
  const customOrder = await prisma.customOrder.findUnique({
    where: { id: customOrderId },
    select: { userId: true, sellerId: true },
  })

  // Validate ownership
  if (customOrder.userId !== userId && customOrder.sellerId !== userId) {
    throw new Error("Unauthorized")
  }

  // 2. Tạo/lấy conversation với context
  const conversation = await getOrCreateConversation(
    customOrder.userId,
    customOrder.sellerId,
    { customOrderId }
  )

  return { conversationId: conversation.id }
}
```

---

### **Flow 3: Seller Browse Yêu Cầu Đặt May (Marketplace)**

```typescript
// Hiển thị danh sách yêu cầu đặt may công khai
async function getPublicCustomOrders(sellerId: number) {
  const orders = await prisma.customOrder.findMany({
    where: {
      status: "SUBMITTED",
      sellerId: 1, // System user (marketplace mode)
    },
    include: {
      user: {
        select: { id: true, name: true, avatar: true },
      },
      measurement: true,
      quotes: {
        where: { sellerId },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return orders.map((order) => ({
    ...order,
    hasQuoted: order.quotes.length > 0,
  }))
}

// Seller gửi báo giá
async function sendQuote(
  sellerId: number,
  customOrderId: number,
  quoteData: {
    quotedPrice: number
    depositAmount: number
    estimatedDays: number
    description: string
  }
) {
  // 1. Tạo báo giá
  const quote = await prisma.customOrderQuote.create({
    data: {
      customOrderId,
      sellerId,
      ...quoteData,
    },
  })

  // 2. Cập nhật trạng thái order
  await prisma.customOrder.update({
    where: { id: customOrderId },
    data: { status: "QUOTED" },
  })

  // 3. Tạo conversation để khách có thể chat với seller
  const order = await prisma.customOrder.findUnique({
    where: { id: customOrderId },
  })

  await getOrCreateConversation(order.userId, sellerId, { customOrderId })

  // 4. Gửi notification cho khách
  await prisma.notification.create({
    data: {
      userId: order.userId,
      type: "CUSTOM_ORDER",
      title: "Có báo giá mới",
      content: `Bạn nhận được báo giá ${quoteData.quotedPrice.toLocaleString()}đ`,
      link: `/custom-order/${customOrderId}`,
    },
  })

  return quote
}
```

---

### **Flow 4: Seller Từ Chối Đơn Direct Order**

```typescript
async function rejectCustomOrder(
  sellerId: number,
  customOrderId: number,
  reason: string
) {
  // Validate ownership
  const order = await prisma.customOrder.findUnique({
    where: { id: customOrderId },
  })

  if (order.sellerId !== sellerId) {
    throw new Error("Unauthorized")
  }

  // Cập nhật trạng thái
  await prisma.customOrder.update({
    where: { id: customOrderId },
    data: {
      status: "CANCELLED",
      adminNote: `Seller từ chối: ${reason}`,
    },
  })

  // Gửi tin nhắn cho khách
  const conversation = await getOrCreateConversation(order.userId, sellerId, {
    customOrderId,
  })

  await sendMessage(
    conversation.id,
    sellerId,
    `Xin lỗi, tôi không thể nhận đơn này. Lý do: ${reason}`
  )

  // Notification
  await prisma.notification.create({
    data: {
      userId: order.userId,
      type: "CUSTOM_ORDER",
      title: "Đơn đặt may bị từ chối",
      content: reason,
      link: `/custom-order/${customOrderId}`,
    },
  })
}
```

---

## 🔔 **REAL-TIME với WebSocket**

### **Setup Socket.IO (Example)**

```typescript
// server.ts
import { Server } from "socket.io"

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL },
})

// Authentication middleware
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token
  const user = await verifyToken(token)
  socket.data.userId = user.id
  next()
})

io.on("connection", (socket) => {
  const userId = socket.data.userId

  // Join user's room
  socket.join(`user:${userId}`)

  // Join conversation rooms
  socket.on("join-conversation", (conversationId) => {
    socket.join(`conversation:${conversationId}`)
  })

  // Send message
  socket.on("send-message", async (data) => {
    const message = await sendMessage(
      data.conversationId,
      userId,
      data.content,
      data.attachments
    )

    // Broadcast to conversation
    io.to(`conversation:${data.conversationId}`).emit("new-message", message)
  })

  // Typing indicator
  socket.on("typing", (conversationId) => {
    socket.to(`conversation:${conversationId}`).emit("user-typing", { userId })
  })
})
```

---

## 📱 **UI COMPONENTS**

### **1. Conversation List**

```tsx
// components/ConversationList.tsx
function ConversationList() {
  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetch("/api/conversations").then((r) => r.json()),
  })

  return (
    <div className="conversation-list">
      {conversations?.map((conv) => (
        <ConversationItem
          key={conv.id}
          conversation={conv}
          onClick={() => router.push(`/messages/${conv.id}`)}
        />
      ))}
    </div>
  )
}

function ConversationItem({ conversation }) {
  return (
    <div className="conversation-item">
      <Avatar src={conversation.otherUser.avatar} />
      <div className="info">
        <h4>{conversation.otherUser.name}</h4>
        <p className="last-message">{conversation.lastMessage?.content}</p>
      </div>
      {conversation.unreadCount > 0 && (
        <Badge>{conversation.unreadCount}</Badge>
      )}
    </div>
  )
}
```

### **2. Chat Window**

```tsx
// components/ChatWindow.tsx
function ChatWindow({ conversationId }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  // Load messages
  useEffect(() => {
    fetch(`/api/conversations/${conversationId}/messages`)
      .then((r) => r.json())
      .then(setMessages)
  }, [conversationId])

  // Socket.IO
  useEffect(() => {
    socket.emit("join-conversation", conversationId)

    socket.on("new-message", (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.off("new-message")
    }
  }, [conversationId])

  const sendMessage = () => {
    socket.emit("send-message", {
      conversationId,
      content: input,
    })
    setInput("")
  }

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  )
}
```

---

## 🎯 **TỔNG KẾT**

### ✅ **Đã Giải Quyết:**

1. **Custom Order Flow:**
   - ✅ Direct Order: Khách chọn seller → Seller chấp nhận/từ chối
   - ✅ Marketplace: Khách đăng công khai → Nhiều seller báo giá
   - ✅ Seller có thể từ chối đơn với lý do

2. **Messaging:**
   - ✅ Chat 1-1 giữa Customer và Seller
   - ✅ Liên kết với Order/CustomOrder/RentalOrder
   - ✅ Unread count
   - ✅ Real-time với Socket.IO
   - ✅ Attachments support

---

**Happy Coding! 💬🚀**
