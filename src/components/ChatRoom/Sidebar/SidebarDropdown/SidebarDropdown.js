import React, { useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import "./SidebarDropdown.css";
import { addConversation } from '../../../../redux/actions/chatActions';
//* Material
import { Avatar } from "@material-ui/core";


// Es llamado por Sidebar.js
const SidebarDropdown = ({ photo, firstName, lastName, id }) => {
   const dispatch = useDispatch();
   //! SOLO PARA PRUEBAS
   const refContador = useRef(1);
   useEffect(() => {
      console.log(`SidebarDropdown: render => ${refContador.current}`);
      refContador.current++;
   })

   const sendConversation = async (id) => {
      alert("sendConversation: preventDefault");
      try {
        console.log("SidebarDropdown: sendConversation");
        const conversation = await dispatch(addConversation(id));
        alert(`SidebarDropdowm: sendConversation => ${conversation}`);
      }catch(error) {
        alert(`SidebarDropdowm: sendConversation er => ${error}`);
      }
    };

   return (
      <div className="sidebarDropdown" onClick={() => sendConversation(id)}>
         <Avatar src={photo} />
         <div className="sidebarDropdown__info">
            <h2>{`${firstName} ${lastName}`}</h2>
            {/* <p>Último mensaje</p> */}
         </div>
      </div>
   );
};


export default SidebarDropdown;
