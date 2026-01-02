import API from "./auth.api";

export const getMessages = (chatroomId) => {
  return API.get(`/messages/${chatroomId}`);
};
