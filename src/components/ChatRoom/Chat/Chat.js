import React, { useState,useEffect, useRef, memo } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../redux/actions/chatActions';
import { deleteMessage } from '../../../redux/actions/chatActions';
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
  const dispatch = useDispatch();
  const [localMessages, setLocalMessages] = useState([]);
  const [atLeastOneMessageSelected, setAtLeastOneMessageSelected] = useState(false);
  const { userApp } = useSelector(state => state.contacts);
  const { chatUser, messages }  = useSelector(state => state.chat);

  //! SOLO PARA PRUEBAS
  const refContador = useRef(1);
  useEffect(() => {
    console.log(`Chat: render => ${refContador.current}`);
    refContador.current++;
    setLocalMessages(messages[0].messages);
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

  const handleDeleteMessageShow = async (i, id) => {
    // Toggle para seleccionar mensaje
    messages[0].messages[i].messageSelected = !messages[0].messages[i].messageSelected;
    let isAtLeastOneMessageSelected = false;
    isAtLeastOneMessageSelected = messages[0].messages.some(message => {
       return message.messageSelected === true
    });
    console.log(isAtLeastOneMessageSelected);
    isAtLeastOneMessageSelected ? setAtLeastOneMessageSelected(true) : setAtLeastOneMessageSelected(false);
 };

 const removeMessage = async () => {
    try{
      
      const idMessagesSelected = []; //Se va a reunir los IDS de los mensajes seleccionados a eliminar
      messages[0].messages.forEach(message =>{
        if(message.messageSelected === true){
          idMessagesSelected.push(message._id)
          console.log(idMessagesSelected);
        }
      })
      await dispatch(deleteMessage(idMewssagesSelected));
      
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
          <IconButton>
           {atLeastOneMessageSelected && <DeleteOutline onClick={removeMessage} />} 
          </IconButton>
          {/* <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton> */}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {
        messages[0]._id ?


        // <Message /> 

        <div className="chat__body">
          {
            messages[0].messages[0] ?
            messages[0].messages.map((message, i) => {
              return (
              <p
                  key={i}
                  className={`chat__message ${
                    message.received && "chat__reciever"
                  } ${ (message.userId === userApp[0]._id) && "background" }`}
                  onClick={() => handleDeleteMessageShow(i, message._id)}
              >
                  <span className="chat__name">{message.name}</span>
                  {message.message}
                  <span className="chat__timestamp">{message.timestamp}</span>
                  <br/>
                  {/* <span className={`${message.messageSelected ? "delete-message" : "hide"}`}>Eliminar mensaje</span> */}
              </p>
              );
            }) :
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
