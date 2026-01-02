

import { useEffect, useState } from "react";
import { getChatrooms, joinChatroom } from "../api/chatromm.api";
import { getUserLocation } from "../utlis/location";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users, Clock } from "lucide-react";

function Chatrooms() {
  const [chatrooms, setChatrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const res = await getChatrooms();
        setChatrooms(res.data.data);
      } catch (err) {
        alert("Failed to load chatrooms", err);
      }
    };

    fetchChatrooms();
  }, []);

  const handleJoin = async (chatroomId) => {
    try {
      setLoading(true);
      const location = await getUserLocation();

      await joinChatroom({
        chatroomId,
        userLat: location.lat,
        userLng: location.lng,
      });

      navigate(`/chat/${chatroomId}`);
    } catch (err) {
      alert(
        err?.response?.data?.message || "You are outside the chatroom radius"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6">
      {/* HEADER */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-gray-900 mb-8"
      >
        📍 Available Chatrooms
      </motion.h2>

      {chatrooms.length === 0 && (
        <p className="text-gray-500">No chatrooms found</p>
      )}

      {/* CHATROOM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatrooms.map((room, index) => (
          <motion.div
            key={room._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className={`rounded-2xl shadow-md p-6 transition
              ${
                room.isExpired
                  ? "bg-gray-100 border border-red-300"
                  : "bg-white hover:shadow-lg"
              }`}
          >
            {/* EXPIRED BADGE */}
            {room.isExpired && (
              <span className="inline-block mb-3 text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                ⛔ Room Expired
              </span>
            )}

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {room.name}
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Radius: <strong>{room.radiusKm} km</strong>
              </p>

              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Created by: <strong>{room.createdBy.username}</strong>
              </p>

              {room.expiresAt && (
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Expires at: {new Date(room.expiresAt).toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={() => handleJoin(room._id)}
              disabled={loading || room.isExpired}
              className={`mt-5 w-full py-2 rounded-xl font-semibold transition
                ${
                  room.isExpired
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              {room.isExpired
                ? "Expired"
                : loading
                ? "Joining..."
                : "Join Chatroom"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Chatrooms;
