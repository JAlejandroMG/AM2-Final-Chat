import React, { useEffect, useRef, memo } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, deleteMessage, fetchMessages, isAtLeastOneMessageSelected, scrollToLastMessage, selectMessage} from '../../../redux/actions/chatActions';
//* Material
import { Avatar, IconButton } from "@material-ui/core";
import {
  InsertEmoticon,
  DeleteOutline,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";



//{ Called from ChatRoom.jsx, PrivateChatRoom.jsx
const Chat = memo(() => {
  const messageRef = useRef("");
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { loader } = useSelector(state => state.loader);
  const { userApp } = useSelector(state => state.contacts);
  const { chatUser, conversationId, messages, scrollChatBody }  = useSelector(state => state.chat);
/* 
  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`Chat: render => ${refContador.current}`);
    refContador.current++;
  });
 */


  useEffect(() => {
    if(scrollChatBody & !loader) {
      if(messages[0].messages[0]){
        // console.log("Chat=>useEffect Dentro del if")
        const scroll = scrollRef.current;
        scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
        dispatch(scrollToLastMessage());
      }
    }
    // eslint-disable-next-line
  }, [messages[0].messages[0]]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      // console.log("Chat: sendMessage"); //! SOLO PARA PRUEBAS
      // const message = await dispatch(addMessage(messageRef.current.value)); //! SOLO PARA PRUEBAS
      await dispatch(addMessage(messageRef.current.value));
      messageRef.current.value = "";
      const scroll = scrollRef.current;
      scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
      // alert(`Chat: sendMessage => ${message}`); //! SOLO PARA PRUEBAS
    } catch(error) {
      alert(`Chat: sendMessage er => ${error.message}`); //! MENSAJE ERROR
    }
  };

  const handleDeleteMessageShow = async (i) => {
    // Toggle para seleccionar mensaje
    dispatch(selectMessage(i));
    dispatch(isAtLeastOneMessageSelected());
  };

  const removeMessage = () => {
    messages[0].messages.forEach( async(message) =>{
      try{
        const messagesLastPosition = messages[0].messages.length - 1;
        if(message.messageSelected === true){
          await dispatch(deleteMessage(message._id));
        }
        if(message._id === messages[0].messages[messagesLastPosition]._id){
          const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${conversationId}/messages`;
          await dispatch(fetchMessages(baseURL, conversationId));
        };
        // alert(`Chat: removeMessage => ${message}`); //! SOLO PARA PRUEBAS    
      }catch(error){
        alert(`Chat: removeMessage er => ${error.message}`);
      }
    });
  };


  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={chatUser[0].photoUrl}/>
        <div className="chat__headerInfo">
          <h3>{chatUser[0].username ? chatUser[0].username : "Nombre del Contacto"}</h3>
          <p>{`Visto por ultima vez a las...`}</p>
        </div>
        <div className="chat__headerRight">
          {messages[0].atLeastOneMessageSelected && 
            <IconButton onClick={removeMessage}>
              <DeleteOutline/>
            </IconButton>
          } 
        </div>
      </div>
      {
        messages[0]._id ?
        
        
        <div ref={scrollRef} className={`chat__body ${ loader === true && "chat_body_loader"}`}>
          
          {
            loader ?
            <div className="loader-container">
              <div className="startup">
                  <svg className="spinner-container" width="65px" height="65px" viewBox="0 0 52 52">
                    <circle className="path" cx="26px" cy="26px" r="20px" fill="none" stroke-width="4px"></circle>
                  </svg>
              </div>
            </div>
          :
          
            (
              messages[0].messages[0] ?
            
              messages[0].messages.map((message, i) => {
                  return (
                    <p
                      key={i}
                      className={
                        `chat__message
                        ${ message.userId === userApp[0]._id && "own-chat__message"}
                        ${ (message.userId === userApp[0]._id & message.messageSelected) && "own-chat__message-selected" }
                        ${ (message.userId !== userApp[0]._id & message.messageSelected) && "chat__message-selected" }
                        ${ message.received && "chat__reciever" }`
                      }               
                      onClick={() => handleDeleteMessageShow(i)}
                    >
                      <span className="chat__name">{message.name}</span>
                      {message.message}
                      <span className="chat__timestamp">{message.timestamp}</span>
                      <br/>
                    </p>
                );
              })
              :
              <div>
                <h2>{`Estas por iniciar una conversación con`}</h2>
                <h2>{`${chatUser[0].username}`}</h2>
              </div>
              
            )
          }
        </div>
        :
        <div className="chat__body">          
          <h2>Hola!</h2>
          <h1>{`${userApp[0].username}`}</h1>
          <h2>Te damos una cordial bienvenida al Chat.</h2>
        </div>
            
      }
           
      <div className="chat__footer">
        <InsertEmoticon />
        <form onSubmit={sendMessage}>
          <input
            ref={messageRef}
            type="text"
            placeholder="Escribe un mensaje"
          />
          <button type="submit">
            Agregar mensaje
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
});



export default Chat;
