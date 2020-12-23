import React from "react";
//* Componentes
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";

const ChatRoom = ({ messages, user, setUser }) => {
      return (
      <div className="app__body">
            <Sidebar user={user} />
            <Chat messages={messages} setUser={setUser} />
      </div>
)};

export default ChatRoom;
