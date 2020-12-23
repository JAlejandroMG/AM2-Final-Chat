import React from "react";
import "./SidebarDropdown.css";
//* Material
import { Avatar } from "@material-ui/core";

const SidebarDropdown = ({ photo, fName, lName, id }) => {
   return (
      <div className="sidebarDropdown">
         <Avatar src={photo} />
         <div className="sidebarDropdown__info">
            <h2>{`${fName} ${lName}`}</h2>
            <p>Último mensaje</p>
         </div>
      </div>
   );
};
export default SidebarDropdown;
