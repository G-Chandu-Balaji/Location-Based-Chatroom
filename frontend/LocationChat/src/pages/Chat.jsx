import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../socket/socket";
import { getMessages } from "../api/message.api";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Clock } from "lucide-react";
import { formatTime } from "../utlis/formatTIme";

function Chat() {
  const currentUser = localStorage.getItem("username");
  const [roomName, setRoomName] = useState("");

  const [chatExpired, setChatExpired] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);

  const { chatroomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // 🔹 LOAD OLD MESSAGES
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await getMessages(chatroomId);
        setMessages(res.data?.data || []);
      } catch (err) {
        console.error("Failed to load messages", err.message);
      }
    };

    loadMessages();
  }, [chatroomId]);

  // 🔹 SOCKET LOGIC
  useEffect(() => {
    socket.emit("joinRoom", { chatroomId });

    socket.on("joinedRoom", ({ chatExpired, expiresAt, roomName }) => {
      setChatExpired(chatExpired);
      setExpiresAt(expiresAt);
      setRoomName(roomName);
    });

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chatExpired", () => {
      setChatExpired(true);
    });

    return () => {
      socket.emit("leaveRoom", { chatroomId });
      socket.off("joinedRoom");
      socket.off("newMessage");
      socket.off("chatExpired");
    };
  }, [chatroomId]);

  // 🔹 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBack = () => {
    socket.emit("leaveRoom", { chatroomId });
    navigate("/chatrooms");
  };

  const sendMessage = () => {
    if (chatExpired || !text.trim()) return;
    socket.emit("sendMessage", { chatroomId, text });
    setText("");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* HEADER */}
      <div className="flex items-center gap-4 p-4 bg-white shadow">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft />
        </button>

        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {" "}
            {roomName || "Chatroom"}
          </h3>
          {expiresAt && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Expires at {new Date(expiresAt).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((m, i) => {
            const isMine = m.username === currentUser;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl shadow
            ${
              isMine
                ? "bg-indigo-600 text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none"
            }
          `}
                >
                  {!isMine && (
                    <p className="text-xs font-semibold text-indigo-500 mb-1">
                      {m.username}
                    </p>
                  )}
                  <p>{m.text}</p>
                  {/* 🕒 Timestamp */}
                  <p
                    className={`text-[10px] mt-1 text-right ${
                      isMine ? "text-indigo-200" : "text-gray-400"
                    }`}
                  >
                    {formatTime(m.createdAt)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* EXPIRED WARNING */}
      {chatExpired && (
        <div className="text-center text-sm text-red-600 bg-red-100 py-2">
          ⛔ Chat is disabled. Time expired.
        </div>
      )}

      {/* INPUT */}
      <div className="p-4 bg-white border-t flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={chatExpired}
          placeholder={chatExpired ? "Chat expired" : "Type a message..."}
          className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
        />

        <button
          onClick={sendMessage}
          disabled={chatExpired}
          className={`p-3 rounded-xl transition ${
            chatExpired
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          <Send />
        </button>
      </div>
    </div>
  );
}

export default Chat;
