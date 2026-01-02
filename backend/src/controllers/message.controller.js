import { messageModel } from "../models/message.model.js";

export const getChatroomMessages = async (req, res, next) => {
  try {
    const { chatroomId } = req.params;

    const messages = await messageModel
      .find({ chatroomId })
      .sort({ createdAt: 1 }) // oldest → newest
      .select("username text createdAt");

    res.json({ data: messages });
  } catch (error) {
    next(error);
  }
};
