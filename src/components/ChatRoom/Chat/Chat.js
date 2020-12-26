import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { useSelector } from 'react-redux';
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
const Chat = () => {
  //{ Estado Local
  const [input, setInput] = useState("");
  //{ Estado Global
  const { userApp } = useSelector(state => state.contacts);
  const { messages }  = useSelector(state => state.chat);

  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`Chat: render => ${refContador.current}`);
    refContador.current++;
  })
  

  const sendMessage = async (e) => {
    e.prevenpptDefault();

    setInput("");
  };
  
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Nombre del Contacto</h3>
          <p>Visto por ultima vez a las... </p>
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
          messages[0].messages[0].userId ?
          messages[0].messages.map((message, i) => {
            return (
              <p
                key={i}
                className={`chat__message ${
                  message.received && "chat__reciever"
                } ${ message.userId === userApp[0]._id && "background" }`}
              >
                <span className="chat__name">{message.name}</span>
                {message.message}
                <span className="chat__timestamp">{message.timestamp}</span>
              </p>
            );
          }) :
          <h1>Bienvenda, bienvenide, bienvenidi, bienvenido, bienvenidu</h1>
        }
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Escribe un mensaje"
          />
          <button onClick={sendMessage} type="submit">
            Enviar
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};


export default Chat;
