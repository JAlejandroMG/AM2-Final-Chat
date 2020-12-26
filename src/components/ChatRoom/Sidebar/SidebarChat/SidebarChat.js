import React from "react";
import "./SidebarChat.css";
//*React-Redux
import { useDispatch } from 'react-redux';
import { fetchMessages } from '../../../../redux/actions/chatActions';
//* Material
import { Avatar } from "@material-ui/core";


// Es llamado por Sidebar.js
const SidebarChat = ({ photo, userName, conversationId }) => {
  const dispatch = useDispatch();


  const getMessages = async(conversationId) => {
    try{
      console.log("SidebarChat: getMessages");
      // const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${conversationId}/messages`;
      const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/5fe15a225901e80017f682d3/messages`;
      const message = await dispatch(fetchMessages(baseURL));
      alert(`SidebarChat: getMessages => Se han recibido los mensajes. ${message}`);
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
