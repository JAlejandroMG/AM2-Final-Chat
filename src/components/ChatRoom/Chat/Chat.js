import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
//* Material
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";


const Chat = ({ messages }) => {
  const [input, setInput] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const message = await dispatch(logout());
      alert(`Chat: logoutUser ok => ${message}`);
      console.log("Chat: logout exitoso");  //! Ejecuta después de history.push()
      history.push("/");
    } catch(error) {
      alert(`Chat: logoutUser er => ${error}`);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

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
          <IconButton onClick={logoutUser}>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {
        messages.map((message, i) => {
          return (
            <p
              key={i}
              className={`chat__message ${
                message.received && "chat__reciever"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          );
        })
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
