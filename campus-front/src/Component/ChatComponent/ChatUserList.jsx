import React from "react";

const ChatUserList = ({ users }) => {
  return (
    <div className="chat-user-list">
      <h3>Users Online</h3>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => <li key={index}>{user}</li>)
        ) : (
          <li>No users online</li>
        )}
      </ul>
    </div>
  );
};

export default ChatUserList;
