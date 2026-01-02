import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import { login } from "../api/auth.api";
import { connectSocket } from "../socket/socket";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chatrooms", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await login({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);

      // 🔌 Connect socket AFTER login
      connectSocket(res.data.token);

      navigate("/chatrooms", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-gray-900 text-center"
        >
          Welcome back 👋
        </motion.h2>

        <p className="text-center text-gray-500 mt-2">
          Login to continue chatting locally
        </p>

        {/* ERROR */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
          >
            {error}
          </motion.div>
        )}

        {/* FORM */}
        <div className="mt-6 space-y-4">
          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* LOGIN BUTTON */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={() =>
              (window.location.href = "http://localhost:5000/api/auth/google")
            }
            className="w-full border py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}
