import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatrooms from "./pages/Chatroom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import CreateChatroom from "./pages/CreateChatroom";
import { useEffect } from "react";
import { connectSocket } from "./socket/socket";
import Landing from "./pages/Home";
import "./App.css";
import Signup from "./pages/Signup";
import ChatLayout from "./components/ChatLayout";
import OAuthSuccess from "./pages/OAuthSuccess";
function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      connectSocket(token);
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      <Route element={<ChatLayout />}>
        <Route path="/chatrooms" element={<Chatrooms />} />
        <Route path="/create-chatroom" element={<CreateChatroom />} />
        <Route path="/chat/:chatroomId" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
