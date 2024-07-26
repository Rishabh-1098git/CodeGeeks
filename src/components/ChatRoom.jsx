import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import ChatMessage from "./ChatMessage";
import { Input, Button } from "antd";

const ChatRoom = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();

  useEffect(() => {
    const messagesRef = collection(db, `chats/${groupId}/messages`);
    const q = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });

    return unsubscribe;
  }, [groupId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(collection(db, `chats/${groupId}/messages`), {
      text: formValue,
      createdAt: new Date(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <main>
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <Input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message..."
        />
        <Button type="primary" htmlType="submit" disabled={!formValue}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatRoom;
