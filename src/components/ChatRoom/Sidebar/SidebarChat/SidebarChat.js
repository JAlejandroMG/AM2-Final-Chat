import React, { useEffect, useRef } from "react";
import "./SidebarChat.css";
import { useDispatch } from 'react-redux';
import { fetchMessages } from '../../../../redux/actions/chatActions';
//* Material
import { Avatar } from "@material-ui/core";


//{ Called from Sidebar.js
const SidebarChat = ({ photo, userName, conversationId }) => {
  const dispatch = useDispatch();

  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`SidebarChat: render => ${refContador.current}`);
    refContador.current++;
  })


  const getMessages = async(conversationId) => {
    try{
      // console.log(conversationId)
      console.log("SidebarChat: getMessages");
      // const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${conversationId}/messages`;
      const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/5fed3094794c290017d822b0/messages`;
      const message = await dispatch(fetchMessages(baseURL, conversationId));
      alert(`SidebarChat: getMessages => ${message}`);
    }catch(error){
      alert(`SidebarChat: getMessages er => ${error.message}`);
    }
  };


  return (
    <div className="sidebarChat" onClick={() => getMessages(conversationId)}>
      <Avatar src={photo} />
      <div className="sidebarChat__info">
        {/* <h2>Nombre del Contacto</h2> */}
        <h2>{userName}</h2>
        <p>Último mensaje</p>
      </div>
    </div>
  );
};


export default SidebarChat;
