import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";



//{ Called from SidebarChat.js
const PrivateChatRoom = () => {
   return (
      <div className="app__body">
            <Sidebar />
            <Chat />
      </div>
   )
};



export default PrivateChatRoom;
