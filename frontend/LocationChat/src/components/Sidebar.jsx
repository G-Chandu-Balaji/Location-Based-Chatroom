import { Plus, LogOut, MessageCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-indigo-50 via-white to-emerald-50 flex flex-col shadow-lg">
      {/* HEADER / USER INFO */}
      <div className="p-6 border-b bg-white flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold mb-2">
          {username?.[0] || "U"}
        </div>
        <p className="text-gray-500 text-sm">Logged in as</p>
        <p className="text-gray-900 font-semibold">{username || "User"}</p>
      </div>

      {/* NAVIGATION SECTIONS */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Available Rooms */}
          <div className="px-6 py-4">
            <p className="text-xs text-gray-400 uppercase mb-2 font-medium tracking-wide">
              Available Rooms
            </p>
            <button
              onClick={() => navigate("/chatrooms")}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-100 transition font-medium text-gray-700"
            >
              <MessageCircle size={20} className="text-indigo-600" />
              Location Chat
            </button>
          </div>

          {/* Create Room */}
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 uppercase mb-2 font-medium tracking-wide">
              Create Room
            </p>
            <button
              onClick={() => navigate("/create-chatroom")}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium justify-center"
            >
              <Plus size={20} />
              New Chatroom
            </button>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="px-6 py-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition font-medium justify-center"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
