import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase"; // Ensure correct path
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { IoIosArrowBack } from "react-icons/io"; // Back button icon

const Chat = ({ setIsChatVisible }) => {
  const { groupId } = useParams(); // Get groupId from URL params
  const [currentUser] = useAuthState(auth); // Get current user
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null); // Reference to the end of chat

  useEffect(() => {
    if (!groupId) return;

    const messagesRef = collection(db, "groups", groupId, "chats");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(chats);
      // Scroll to the bottom when messages change
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [groupId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    const messagesRef = collection(db, "groups", groupId, "chats");
    const userDocRef = doc(db, "users", currentUser.uid);
    const userDoc = await getDoc(userDocRef);
    const name = userDoc.data().name;
    console.log("Data : -->> ", userDoc.data());
    await addDoc(messagesRef, {
      userId: currentUser.uid,
      message: newMessage,
      userName: name || "Anonymous", // Make sure to include userName
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  const handleBackClick = () => {
    console.log("Back Clicked!!!");
    setIsChatVisible(false);
  };

  return (
    <div className="flex flex-col h-screen w-4/5 max-w-4xl mx-auto bg-custom-gradient rounded-lg shadow-lg relative">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center justify-between p-4 z-10">
        <button className="text-xl" onClick={handleBackClick}>
          <IoIosArrowBack />
        </button>
        <h1 className="text-xl font-semibold">Chat Here</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 pt-16 pb-16 px-4 overflow-y-auto mt-16">
        {console.log(messages)}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.userId === currentUser.uid ? "text-right" : "text-left"
            }`}
          >
            {msg.userId !== currentUser.uid && (
              <div className="text-md font-mono text-sd-easy mb-1">
                {msg.userName}
              </div>
            )}
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.userId === currentUser.uid
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              <p>{msg.message}</p>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(msg.timestamp?.toDate()).toLocaleString()}
            </div>
          </div>
        ))}
        {/* Scroll to bottom marker */}
        <div ref={chatEndRef} />
      </div>

      {/* Fixed Input and Button */}
      <div className="fixed bottom-0 w-4/5 max-w-4xl mx-auto flex p-4 border-t border-gray-200 bg-custom-gradient mb-1">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-lg w-24"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
