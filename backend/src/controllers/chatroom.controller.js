import { chatroomModel } from "../models/chatRoom.model.js";

/**
 * CREATE CHATROOM
 */
export const createChatroom = async (req, res, next) => {
  try {
    console.log("chatroom details", req.body);

    const {
      name,
      location: { lat, lng },
      radiusKm,
    } = req.body;

    const chatroom = await chatroomModel.create({
      name,
      location: { lat, lng },
      radiusKm,
      createdBy: req.user._id,
    });

    res.status(201).json(chatroom);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL CHATROOMS
 */
export const getChatrooms = async (req, res, next) => {
  try {
    const CHAT_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours
    const chatrooms = await chatroomModel
      .find()
      .populate("createdBy", "username");
    const formattedChatrooms = chatrooms.map((room) => {
      const expiresAt = new Date(room.createdAt).getTime() + CHAT_DURATION_MS;
      const isExpired = Date.now() > expiresAt;

      return {
        ...room.toObject(),
        isExpired,
        expiresAt,
      };
    });
    res.json({ data: formattedChatrooms });
  } catch (error) {
    next(error);
  }
};

/**
 * JOIN CHATROOM (Location validated)
 */
export const joinChatroom = async (req, res) => {
  res.json({
    message: "Access granted",
    chatroom: req.chatroom,
  });
};
