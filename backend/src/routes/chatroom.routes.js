import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createChatroom,
  getChatrooms,
  joinChatroom,
} from "../controllers/chatroom.controller.js";
import locationMiddleware from "../middlewares/location.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createChatroom);
router.get("/", authMiddleware, getChatrooms);
router.post("/join", authMiddleware, locationMiddleware, joinChatroom);

export default router;
