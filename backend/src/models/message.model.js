import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatroom",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200, // 2 hours (TTL)
  },
});

export const messageModel = mongoose.model("Message", messageSchema);
