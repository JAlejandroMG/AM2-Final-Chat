import React, { useState,useEffect, useRef, memo } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, deleteMessage, scrollToLastMessage, selectMessage } from '../../../redux/actions/chatActions';
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
  const [atLeastOneMessageSelected, setAtLeastOneMessageSelected] = useState(false);
  const { userApp } = useSelector(state => state.contacts);
  const { chatUser, messages, scrollChatBody }  = useSelector(state => state.chat);


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
      // console.log(messageRef.current.value);
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
    dispatch(selectMessage(i))
    // messages[0].messages[i].messageSelected = !messages[0].messages[i].messageSelected; //!REDUCER


    let isAtLeastOneMessageSelected = false;
    isAtLeastOneMessageSelected = messages[0].messages.some(message => {
      return message.messageSelected === true
    });
    // console.log(isAtLeastOneMessageSelected);
    isAtLeastOneMessageSelected ? setAtLeastOneMessageSelected(true) : setAtLeastOneMessageSelected(false);
  };

  const removeMessage = async() => {
    try{      
      const idMessagesSelected = []; //Se va a reunir los IDS de los mensajes seleccionados a eliminar
      messages[0].messages.forEach( message =>{
          if(message.messageSelected === true){
            idMessagesSelected.push(message._id)
          }
      });
      alert("Chat=>removeMessage: Terminé forEach")
      console.log(idMessagesSelected);
      // await dispatch(deleteMessage(idMessagesSelected));
      const message = await dispatch(deleteMessage(idMessagesSelected)); //! SOLO PARA PRUEBAS
      if(messages[0].messages[0]){
        const scroll = scrollRef.current;
        scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
      }
      alert(`Chat: removeMessage => ${message}`); //! SOLO PARA PRUEBAS
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
          {atLeastOneMessageSelected && 
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
                  <p
                    key={i}
                    className={
                      `chat__message
                      ${ message.userId === userApp[0]._id && "own-chat__message"}
                      ${ (message.userId === userApp[0]._id & message.messageSelected) && "own-chat__message-selected" }
                      ${ (message.userId !== userApp[0]._id & message.messageSelected) && "chat__message-selected" }
                      ${ message.received && "chat__reciever" }`
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
