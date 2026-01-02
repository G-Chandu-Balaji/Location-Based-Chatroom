import { chatroomModel } from "../models/chatRoom.model.js";
import { messageModel } from "../models/message.model.js";
import authSocketMiddleware from "./auth.socket.middleware.js";

export default function chatSocket(io) {
  console.log("🔥 chatSocket initialized");

  // 🔐 Socket authentication
  io.use((socket, next) => {
    console.log("🔐 auth middleware hit");
    authSocketMiddleware(socket, next);
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.user?.username);

    /**
     * JOIN CHATROOM
     */
    socket.on("joinRoom", async ({ chatroomId }) => {
      console.log("📥 joinRoom event received:", chatroomId);

      const chatroom = await chatroomModel.findById(chatroomId);
      if (!chatroom) {
        console.log("❌ Chatroom not found");
        return socket.emit("error", "Chatroom not found");
      }

      socket.join(chatroomId);
      const CHAT_LIFETIME = 2 * 60 * 60 * 1000;
      const chatExpired =
        Date.now() - new Date(chatroom.createdAt).getTime() > CHAT_LIFETIME;

      socket.emit("joinedRoom", {
        chatroomId,
        chatExpired,
        expiresAt: new Date(
          new Date(chatroom.createdAt).getTime() + CHAT_LIFETIME
        ),
        roomName: chatroom.name,
      });

      console.log(chatExpired ? "🚫 Chat disabled" : "🏠 Joined room");
    });

    /**
     * SEND MESSAGE
     */
    socket.on("sendMessage", async ({ chatroomId, text, createdAt }) => {
      console.log("📨 sendMessage received:", {
        chatroomId,
        text,
        user: socket.user?.username,
        createdAt,
      });

      if (!text?.trim()) {
        console.log("⚠️ Empty message blocked");
        return;
      }

      const chatroom = await chatroomModel.findById(chatroomId);
      if (!chatroom) {
        console.log("❌ Chatroom not found while sending message");
        return;
      }

      // ⏱ 2-hour chat limit
      const CHAT_LIFETIME = 2 * 60 * 60 * 1000;
      const chatExpired =
        Date.now() - new Date(chatroom.createdAt).getTime() > CHAT_LIFETIME;
      // console.log("⏱ Chat age (ms):", chatAge);

      if (chatExpired) {
        return socket.emit("chatDisabled", "Chat is disabled. Time expired.");
      }

      const message = await messageModel.create({
        chatroomId,
        userId: socket.user._id,
        username: socket.user.username,
        text,
      });

      console.log("💾 Message saved:", message._id);

      io.to(chatroomId).emit("newMessage", {
        id: message._id,
        username: message.username,
        text: message.text,
        createdAt: message.createdAt,
      });

      console.log("📤 newMessage emitted to room:", chatroomId);
    });
    /**
     * LEAVE CHATROOM
     */
    socket.on("leaveRoom", ({ chatroomId }) => {
      console.log("🚪 Leaving room:", chatroomId);

      socket.leave(chatroomId);
    });

    /**
     * DISCONNECT
     */
    socket.on("disconnect", () => {
      console.log("👋 User disconnected:", socket.user?.username);
    });
  });
}
