import React, { useState } from "react";
import ChatRoom from "./ChatRoom";
import { MessageCircle } from "lucide-react";
import "../../ChatRoom.css"; // you can add floating chat CSS here too

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="floating-chat-window">
          <ChatRoom onClose={() => setIsOpen(false)} />
        </div>
      )}

      <button
        className="floating-chat-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={28} />
      </button>
    </>
  );
};

export default FloatingChat;
