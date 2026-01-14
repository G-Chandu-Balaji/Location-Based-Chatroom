import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import "./config/passport.js";
import authRoutes from "./routes/user.routes.js";
import chatroomRoutes from "./routes/chatroom.routes.js";
import messageRoutes from "./routes/message.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

/* ✅ FIXED CORS CONFIG */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://location-based-chatroom-gchandubalaji.netlify.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());
app.use(express.json());
import passport from "passport";

app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/chatrooms", chatroomRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorMiddleware);

export default app;
