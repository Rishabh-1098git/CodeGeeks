import React from "react";
import { Avatar } from "antd";

const ChatMessage = ({ message }) => {
  const { text, uid, photoURL } = message;
  return (
    <div
      className={`chat-message ${
        uid === auth.currentUser.uid ? "sent" : "received"
      }`}
    >
      <Avatar size={40} src={photoURL} />
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
