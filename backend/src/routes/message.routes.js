import express from "express";
import { getChatroomMessages } from "../controllers/message.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:chatroomId", authMiddleware, getChatroomMessages);

export default router;
