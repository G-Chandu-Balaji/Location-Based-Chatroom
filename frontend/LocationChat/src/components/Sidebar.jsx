import { Plus, LogOut, MessageCircle, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <>
      {/* HAMBURGER ICON (Mobile) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow"
      >
        <Menu className="text-indigo-600" />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-gradient-to-b from-indigo-50 via-white to-emerald-50 shadow-lg z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        {/* HEADER */}
        <div className="p-6 border-b bg-white flex flex-col items-center relative">
          {/* CLOSE ICON (Mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden absolute top-4 right-4"
          >
            <X className="text-gray-600" />
          </button>

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold mb-2">
            {username?.[0] || "U"}
          </div>
          <p className="text-gray-500 text-sm">Logged in as</p>
          <p className="text-gray-900 font-semibold">{username || "User"}</p>
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col  ">
          <div>
            {/* Available Rooms */}
            <div className="px-6 py-4">
              <p className="text-xs text-gray-400 uppercase mb-2 font-medium tracking-wide">
                Available Rooms
              </p>
              <button
                onClick={() => {
                  navigate("/chatrooms");
                  setOpen(false);
                }}
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
                onClick={() => {
                  navigate("/create-chatroom");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium justify-center"
              >
                <Plus size={20} />
                New Chatroom
              </button>
            </div>
          </div>

          {/* LOGOUT — ALWAYS AT BOTTOM */}
          <div className="mt-auto px-6 py-6 border-t border-gray-200">
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
    </>
  );
}

export default Sidebar;
