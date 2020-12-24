import React from "react";
import "./SidebarDropdown.css";
//* Material
import { Avatar } from "@material-ui/core";


// Es llamado por Sidebar.js
const SidebarDropdown = ({ photo, firstName, lastName, id }) => {
   return (
      <div className="sidebarDropdown">
         <Avatar src={photo} />
         <div className="sidebarDropdown__info">
            <h2>{`${firstName} ${lastName}`}</h2>
            <p>Último mensaje</p>
         </div>
      </div>
   );
};
export default SidebarDropdown;
