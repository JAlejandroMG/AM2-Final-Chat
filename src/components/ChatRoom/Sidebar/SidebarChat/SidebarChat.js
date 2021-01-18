import React, { memo } from "react";
import "./SidebarChat.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, isAtLeastOneConversationSelected, selectConversation/* , showMessageReceived */ } from '../../../../redux/actions/chatActions';
import { toggleLoader } from '../../../../redux/actions/loaderActions';
//* Material
import { Avatar } from "@material-ui/core";



//{ Called from Sidebar.js
const SidebarChat = memo(({ photo, userName, conversationId, conversationSelected}) => {
  const { messages }  = useSelector(state => state.chat);
  const dispatch = useDispatch();


  let incomingMessages;
  const getMessages = (conversationId) => {
    if(incomingMessages) clearTimeout(incomingMessages);
    // Se crea un lapso de tiempo con setTimeout antes de activar onClick para dar tiempo a activar onDoubleClick
    incomingMessages = setTimeout(
      async() => {
        try{
          const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${conversationId}/messages`;
          dispatch(toggleLoader());
          await dispatch(fetchMessages(baseURL, conversationId));
          // messageReceived();
          dispatch(toggleLoader());
        }catch(error){
          alert(`SidebarChat: getMessages er => ${error.message}`); //! MENSAJE ERROR
        }
      }, 1000);
  };

  /* const messageReceived = () => {
    dispatch(showMessageReceived());
  }; */

  const handleDeleteConversationShow = (conversationPosition) => {
    if(messages[0]._id) {
      clearTimeout(incomingMessages);
      // Toggle para seleccionar conversación
      dispatch(selectConversation(conversationPosition));
      dispatch(isAtLeastOneConversationSelected());
    };
  };


  return (
    <div className={`sidebarChat ${conversationSelected && "sidebarChat-selected"}`} onClick={() => getMessages(conversationId)} onDoubleClick={() => handleDeleteConversationShow(conversationId)}>
      <Avatar src={photo} />
      <div className="sidebarChat__info">
        <h2>{userName}</h2>
        <p>Último mensaje</p>
      </div>
    </div>
  );
});



export default SidebarChat;
