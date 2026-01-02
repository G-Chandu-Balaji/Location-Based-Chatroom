import API from "./auth.api";

export const createChatroom = (data) => {
  console.log("charoom", data);
  return API.post("/chatrooms", data);
};

export const getChatrooms = () => API.get("/chatrooms");

export const joinChatroom = (data) => API.post("/chatrooms/join", data);
