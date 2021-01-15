import React, { /* useEffect, useRef, */ memo } from "react";
import "./SidebarChat.css";
import { useDispatch } from 'react-redux';
import { fetchMessages, isAtLeastOneConversationSelected, selectConversation } from '../../../../redux/actions/chatActions';
import { toggleLoader } from '../../../../redux/actions/loaderActions';
//* Material
import { Avatar } from "@material-ui/core";



//{ Called from Sidebar.js
const SidebarChat = memo(({ photo, userName, conversationId, conversationSelected}) => {
  const dispatch = useDispatch();
  
/* 
  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`SidebarChat: render => ${refContador.current}`);
    refContador.current++;
  })
   */


  let incomingMessages;
  const getMessages = (conversationId) => {
    if(incomingMessages) clearTimeout(incomingMessages);
    // Se crea un lapso de tiempo con setTimeout antes de activar onClick para dar tiempo a activar onDoubleClick
    incomingMessages = setTimeout(
      async() => {
        try{
          // console.log("SidebarChat: getMessages"); //! SOLO PARA PRUEBAS
          const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${conversationId}/messages`;
          dispatch(toggleLoader());
          await dispatch(fetchMessages(baseURL, conversationId));
          dispatch(toggleLoader());
          // alert(`SidebarChat: getMessages => ${message}`); //! SOLO PARA PRUEBAS
        }catch(error){
          alert(`SidebarChat: getMessages er => ${error.message}`); //! MENSAJE ERROR
        }
      }, 1000);
  };

  const handleDeleteConversationShow = (conversationPosition) => { //! FALTA FUNCIONALIDAD
    clearTimeout(incomingMessages);
    // Toggle para seleccionar conversación
    dispatch(selectConversation(conversationPosition));
    dispatch(isAtLeastOneConversationSelected());
  };


  return (
    <div className={`sidebarChat ${conversationSelected && "sidebarChat-selected"}`} onClick={() => getMessages(conversationId)} onDoubleClick={() => handleDeleteConversationShow(conversationId)}>
      <Avatar src={photo} />
      <div className="sidebarChat__info">
        <h2>{userName}</h2>
        <p>Último mensaje</p> {/* REVISAR */}
      </div>
    </div>
  );
});



export default SidebarChat;
