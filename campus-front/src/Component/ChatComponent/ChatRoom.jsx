// src/components/ChatComponent/ChatRoom.jsx
import React, { useState, useEffect } from "react";
import ChatService from "../../Services/ChatService";
import ChatUserList from "./ChatUserList";
import ChatMessageBox from "./ChatMessageBox";
import "../../ChatRoom.css";

const ChatRoom = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return () => {
      if (connected) ChatService.disconnect(username);
    };
  }, [connected, username]);

  const connect = () => {
    if (!username.trim()) return alert("Enter a name!");
    ChatService.connect(
      username,
      (msg) => setMessages((prev) => [...prev, msg]),
      (userList) => setUsers(userList)
    );
    setConnected(true);
  };

  const sendMessage = (message) => {
    ChatService.sendMessage(username, message);
  };

  const disconnect = () => {
    ChatService.disconnect(username);
    setConnected(false);
  };

  return (
    <div className="chat-room-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="chat-controls">
        <input
          type="text"
          placeholder="Enter your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={connected}
        />
        {!connected ? (
          <button onClick={connect}>Enter</button>
        ) : (
          <button onClick={disconnect}>Exit</button>
        )}
      </div>

      <div className="chat-body">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.sender === username ? "own" : ""}`}
            >
              <strong>{msg.sender}: </strong>
              {msg.content}
            </div>
          ))}
        </div>

        <ChatUserList users={users} />
      </div>

      <ChatMessageBox onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
