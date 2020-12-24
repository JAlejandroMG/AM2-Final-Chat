import React from "react";
//* Componentes
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";

// Es llamado por ProtectedRoute.jsx
const ChatRoom = ({ messages }) => {
      return (
      <div className="app__body">
            <Sidebar />
            <Chat messages={messages} />
      </div>
)};

export default ChatRoom;
