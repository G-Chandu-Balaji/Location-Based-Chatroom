import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { connectSocket } from "../socket/socket";

function ChatLayout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // 🔌 reconnect socket after OAuth or refresh
    connectSocket(token);
  }, [token, navigate]);

  if (!token) return null; // prevent flicker
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default ChatLayout;
