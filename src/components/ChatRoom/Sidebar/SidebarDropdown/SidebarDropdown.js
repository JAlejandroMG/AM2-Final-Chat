import React from "react";
import "./SidebarDropdown.css";
//* Material
import { Avatar } from "@material-ui/core";
//*React-Redux
// import { addConversation } from '../../../redux/actions/chatActions';
// import { useDispatch } from 'react-redux';


// Es llamado por Sidebar.js
const SidebarDropdown = ({ photo, firstName, lastName, id }) => {
   //{ Estado Global
   // const dispatch = useDispatch(); //Para agregar una conversación


   return (
      <div className="sidebarDropdown" /* onClick={() => addConversation(id)} */>
         <Avatar src={photo} />
         <div className="sidebarDropdown__info">
            <h2>{`${firstName} ${lastName}`}</h2>
            <p>Último mensaje</p>
         </div>
      </div>
   );
};


export default SidebarDropdown;
