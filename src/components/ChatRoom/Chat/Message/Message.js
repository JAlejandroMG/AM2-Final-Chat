import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';

const Message = memo(() => {
   const [deleteMessageShow, setDeleteMessageShow] = useState(false);
   const { userApp } = useSelector(state => state.contacts);
   const { chatUser, messages }  = useSelector(state => state.chat);


   const handledeleteMessageShow = () => {
      setDeleteMessageShow(!deleteMessageShow);
   };


   return (
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
            <h1>{`Estas por iniciar una conversación con ${chatUser[0].username}`}</h1>
         }
         </div>
   )
});

export default Message;
