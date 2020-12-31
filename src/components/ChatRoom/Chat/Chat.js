import React, { useState, useEffect, useRef, memo } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../redux/actions/chatActions';
//* Material
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";


//{ Called from ChatRoom.jsx
const Chat = memo(() => {
  const [deleteMessageShow, setDeleteMessageShow] = useState(false);
  const messageRef = useRef("");
  const dispatch = useDispatch();
  const { userApp } = useSelector(state => state.contacts);
  const { chatUser, messages }  = useSelector(state => state.chat);

  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`Chat: render => ${refContador.current}`);
    refContador.current++;
  })
  

  const sendMessage = async (e) => {
    e.preventDefault();
    alert("sendMessage preventDefault");
    try {
      console.log("Chat: sendMessage");
      console.log(messageRef.current.value);
      const message = await dispatch(addMessage(messageRef.current.value));
      messageRef.current.value = "";
      alert(`Chat: sendMessage => ${message}`);
    } catch(error) {
      alert(`Chat: sendMessage er => ${error}`);
    }
  };

  const handledeleteMessageShow = () => {
    setDeleteMessageShow(!deleteMessageShow);
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

      <div className="chat__body">
        {
          messages[0]._id ?
          messages[0].messages.map((message, i) => {
            return (
              <p
                key={i}
                className={`chat__message ${
                  message.received && "chat__reciever"
                } ${ (message.userId === userApp[0]._id) && "background" }`}
                onClick={() => handledeleteMessageShow()}
              >
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">{message.timestamp}</span>
                <br/>
                <span className={`${deleteMessageShow ? "delete-message" : "hide"}`}>Eliminar mensaje</span>
              </p>
            );
          }) :
          <h1>Bienvenda, bienvenide, bienvenidi, bienvenido, bienvenidu</h1>
        }
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form onSubmit={sendMessage}>
          <input
            /* value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }} */
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
