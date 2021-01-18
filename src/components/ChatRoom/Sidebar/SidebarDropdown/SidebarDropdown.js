import React from "react";
import "./SidebarDropdown.css";
import { useDispatch } from 'react-redux';
import { addConversation } from '../../../../redux/actions/chatActions';
//* Material
import { Avatar } from "@material-ui/core";



// Es llamado por Sidebar.js
const SidebarDropdown = ({ photo, firstName, lastName, id, handleFocusFn }) => {
   const dispatch = useDispatch();


   const sendConversation = async (id) => {
      try {
         await dispatch(addConversation(id));
         handleFocusFn();
      }catch(error) {
         alert(`SidebarDropdowm: sendConversation er => ${error.message}`);
      }
   };

   return (
      <div className="sidebarDropdown" onClick={() => sendConversation(id)}>
         <Avatar src={photo} />
         <div className="sidebarDropdown__info">
            <h2>{`${firstName} ${lastName}`}</h2>
         </div>
      </div>
   );
};



export default SidebarDropdown;
