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
    incomingMessages = setTimeout(
      async() => {
        try{
          console.log("SidebarChat: getMessages");
          const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${conversationId}/messages`;
          // const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/5fed3094794c290017d822b0/messages`;
          const message = await dispatch(fetchMessages(baseURL, conversationId));
          alert(`SidebarChat: getMessages => ${message}`);
        }catch(error){
          alert(`SidebarChat: getMessages er => ${error.message}`);
        } //Conversation Forest-Jason 5fe15a225901e80017f682d3
      }, 1000);
  };

  const selectConversation = (conversationId) => {
    clearTimeout(incomingMessages);
    console.log(conversationId);
    console.log(conversations);
  };


  return (
    <div className="sidebarChat" onClick={() => getMessages(conversationId)} onDoubleClick={() => selectConversation(conversationId)}>
      <Avatar src={photo} />
      <div className="sidebarChat__info">
        {/* <h2>Nombre del Contacto</h2> */}
        <h2>{userName}</h2>
        <p>Último mensaje</p>
      </div>
    </div>
  );
});


export default SidebarChat;
