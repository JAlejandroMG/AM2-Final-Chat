import React from "react";
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";



//{ Called from ProtectedRoute.jsx
const ChatRoom = () => {
   return (
      <div className="app__body">
            <Sidebar />
            <Chat />
      </div>
   )
};



export default ChatRoom;
