import React from "react";
import "./SidebarChat.css";
//* Material
import { Avatar } from "@material-ui/core";


// Es llamado por Sidebar.js
const SidebarChat = () => {return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Nombre del Contacto</h2>
        <p>Último mensaje</p>
      </div>
    </div>
  );
};
export default SidebarChat;
