import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const authSocketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) return next(new Error("User not found"));

    socket.user = user; // attach user to socket
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};

export default authSocketMiddleware;
