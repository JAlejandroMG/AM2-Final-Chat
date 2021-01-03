import React, { useEffect, useRef, memo } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../redux/actions/chatActions';
import Message from './Message/Message';
//* Material
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";



//{ Called from ChatRoom.jsx, PrivateChatRoom.jsx
const Chat = memo(() => {
  const messageRef = useRef("");
  const dispatch = useDispatch();
  const { chatUser, messages }  = useSelector(state => state.chat);

  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`Chat: render => ${refContador.current}`);
    refContador.current++;
  })
  

  const sendMessage = async (e) => {
    e.preventDefault();
    // alert("sendMessage preventDefault"); //! SOLO PARA PRUEBAS
    try {
      console.log("Chat: sendMessage"); //! SOLO PARA PRUEBAS
      console.log(messageRef.current.value);
      // const message = await dispatch(addMessage(messageRef.current.value)); //! SOLO PARA PRUEBAS
      await dispatch(addMessage(messageRef.current.value));
      messageRef.current.value = "";
      // alert(`Chat: sendMessage => ${message}`); //! SOLO PARA PRUEBAS
    } catch(error) {
      alert(`Chat: sendMessage er => ${error.message}`); //! MENSAJE ERROR
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
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {
        messages[0]._id ?
        <Message /> :
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
