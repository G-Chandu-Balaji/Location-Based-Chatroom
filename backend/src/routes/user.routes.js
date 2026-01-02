import express from "express";
import { login, register } from "../controllers/user.controller.js";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

// 🔐 Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 🔁 Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);

    // redirect to frontend with token
    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}&username=${encodeURIComponent(
        req.user.username
      )}`
    );
  }
);

export default router;
