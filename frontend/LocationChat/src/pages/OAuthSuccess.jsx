import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket } from "../socket/socket";
import toast from "react-hot-toast";

function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const username = params.get("username");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    // ✅ THIS IS THE MISSING PIECE
    if (username) {
      localStorage.setItem("username", username);
    }

    connectSocket(token);
    toast.success("Logged-in successfully");
    navigate("/chatrooms", { replace: true });
  }, [navigate]);

  return <p className="text-center mt-10">Logging you in…</p>;
}

export default OAuthSuccess;
