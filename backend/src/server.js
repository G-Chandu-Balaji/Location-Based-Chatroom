import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import chatSocket from "./sockets/chat.socket.js";

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://location-based-chatroom-gchandubalaji.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

chatSocket(io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
