import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";

// Es llamado por ProtectedRoute.jsx
const ChatRoom = () => {
      return (
      <div className="app__body">
            <Sidebar />
            <Chat />
      </div>
)};

export default ChatRoom;
