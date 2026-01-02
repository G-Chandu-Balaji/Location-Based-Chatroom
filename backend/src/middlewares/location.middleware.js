import { chatroomModel } from "../models/chatRoom.model.js";
import { calculateDistanceKm } from "../utils/distance.js";

const locationMiddleware = async (req, res, next) => {
  try {
    const { chatroomId, userLat, userLng } = req.body;

    if (!chatroomId || !userLat || !userLng) {
      return res.status(400).json({ message: "Location data missing" });
    }

    const chatroom = await chatroomModel.findById(chatroomId);
    if (!chatroom) {
      return res.status(404).json({ message: "Chatroom not found" });
    }

    const distance = calculateDistanceKm(
      userLat,
      userLng,
      chatroom.location.lat,
      chatroom.location.lng
    );

    if (distance > chatroom.radiusKm) {
      return res
        .status(403)
        .json({ message: "You are outside the chatroom radius" });
    }

    req.chatroom = chatroom;
    next();
  } catch (error) {
    next(error);
  }
};

export default locationMiddleware;
