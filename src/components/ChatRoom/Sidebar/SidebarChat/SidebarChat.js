import React, { useEffect, useRef, memo } from "react";
import "./SidebarChat.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../../../redux/actions/chatActions';
//* Material
import { Avatar } from "@material-ui/core";



//{ Called from Sidebar.js
const SidebarChat = memo(({ photo, userName, conversationId }) => {
  const dispatch = useDispatch();
  const { conversations } = useSelector(state => state.chat);

  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`SidebarChat: render => ${refContador.current}`);
    refContador.current++;
  })


  let incomingMessages;
  const getMessages = (conversationId) => {
    if(incomingMessages) clearTimeout(incomingMessages);
    // Se crea un lapso de tiempo con setTimeout antes de activar onClick para dar tiempo a activar onDoubleClick
    incomingMessages = setTimeout(
      async() => {
        try{
          console.log("SidebarChat: getMessages"); //! SOLO PARA PRUEBAS
          const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${conversationId}/messages`;
          await dispatch(fetchMessages(baseURL, conversationId));
          // const message = await dispatch(fetchMessages(baseURL, conversationId));
          // alert(`SidebarChat: getMessages => ${message}`); //! SOLO PARA PRUEBAS
        }catch(error){
          alert(`SidebarChat: getMessages er => ${error.message}`); //! MENSAJE ERROR
        }
      }, 1000);
  };

  const selectConversation = (conversationId) => { //! FALTA FUNCIONALIDAD
    clearTimeout(incomingMessages);
    console.log(conversationId); //! SOLO PARA PRUEBAS
    console.log(conversations); //! SOLO PARA PRUEBAS
  };


  return (
    <div className="sidebarChat" onClick={() => getMessages(conversationId)} onDoubleClick={() => selectConversation(conversationId)}>
      <Avatar src={photo} />
      <div className="sidebarChat__info">
        <h2>{userName}</h2>
        <p>Último mensaje</p> {/* REVISAR */}
      </div>
    </div>
  );
});



export default SidebarChat;
