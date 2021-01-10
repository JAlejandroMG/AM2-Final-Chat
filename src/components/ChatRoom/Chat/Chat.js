import React, { useEffect, useRef, memo } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, deleteMessage, fetchMessages, isAtLeastOneMessageSelected, scrollToLastMessage, selectMessage } from '../../../redux/actions/chatActions';
//* Material
import { Avatar, IconButton } from "@material-ui/core";
import {
  /* AttachFile, */
  InsertEmoticon,
  MoreVert,
  /* SearchOutlined, */
  DeleteOutline
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";



//{ Called from ChatRoom.jsx, PrivateChatRoom.jsx
const Chat = memo(() => {
  const messageRef = useRef("");
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { userApp } = useSelector(state => state.contacts);
  const { chatUser, conversationId, messages, scrollChatBody }  = useSelector(state => state.chat);


  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`Chat: render => ${refContador.current}`);
    refContador.current++;
  });

  useEffect(() => {
    if(scrollChatBody) {
      if(messages[0].messages[0]){
        console.log("Chat=>useEffect Dentro del if")
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
      console.log("Chat: sendMessage"); //! SOLO PARA PRUEBAS
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

  const handleDeleteMessageShow = async (i, id) => {
    // Toggle para seleccionar mensaje
    dispatch(selectMessage(i));
    dispatch(isAtLeastOneMessageSelected());
  };

  const removeMessage = async() => {
    try{      
      const idMessagesSelected = []; //Se va a reunir los IDS de los mensajes seleccionados a eliminar
      messages[0].messages.forEach( message =>{
          if(message.messageSelected === true){
            idMessagesSelected.push(message._id)
          }
      });
      await dispatch(deleteMessage(idMessagesSelected));
      // const message = await dispatch(deleteMessage(idMessagesSelected)); //! SOLO PARA PRUEBAS

      const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${conversationId}/messages`;
      // console.log("INICIO FETCH DE MENSAJES!!!") //! SOLO PARA PRUEBAS
      await dispatch(fetchMessages(baseURL, conversationId));
      // console.log("TERMINO FETCH DE MENSAJES!!!") //! SOLO PARA PRUEBAS

      // alert(`Chat: removeMessage => ${message}`); //! SOLO PARA PRUEBAS
    }catch(error){
      alert(`Chat: removeMessage er => ${error.message}`);
    }
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
          {/* <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile/>
          </IconButton> */}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {
        messages[0]._id
        ?

        <div ref={scrollRef} className="chat__body">
          {
            messages[0].messages[0]
            ?

            messages[0].messages.map((message, i) => {
              return (
                (message.userId === userApp[0]._id) ?                  

                  <p
                    key={i}
                    className={
                      `chat__message
                      own-chat__message
                      ${ message.received && "chat__reciever" }
                      ${ message.messageSelected && "own-chat__message-selected" }`
                    }               
                    onClick={() => handleDeleteMessageShow(i, message._id)}
                  >
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                    <br/>
                  </p>
                  
                  :
                  <p
                    key={i}
                    className={
                      `chat__message
                      ${ message.received && "chat__reciever" }
                      ${ message.messageSelected && "chat__message-selected" }`
                    }               
                    onClick={() => handleDeleteMessageShow(i, message._id)}
                  >
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                    <br/>
                  </p>
              );
            })

            :
            <h1>{`Estas por iniciar una conversación con ${chatUser[0].username}`}</h1>
          }
        </div>
        
        :
        <div className="chat__body">          
          <h1>Bienvenida, bienvenide, bienvenidi, bienvenido, bienvenidu</h1>
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
