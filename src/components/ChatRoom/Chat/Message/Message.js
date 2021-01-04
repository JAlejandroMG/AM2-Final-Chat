import React, { useState, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessage } from '../../../../redux/actions/chatActions';


//{ Called from Chat.js
const Message = memo(() => {
   const messageRef = useRef("");
   const dispatch = useDispatch();
   const [localMessages, setLocalMessages] = useState([]);
   const [atLeastOneMessageSelected, setAtLeastOneMessageSelected] = useState(false);
   const { userApp } = useSelector(state => state.contacts);
   const { chatUser, messages }  = useSelector(state => state.chat);
   

   //! SOLO PARA PRUEBAS + USANDO
   const refContador = useRef(1);
   useEffect(() => {
      console.log(`Message: render => ${refContador.current}`);
      refContador.current++;
      setLocalMessages(messages[0].messages);
      console.log(localMessages);
      // eslint-disable-next-line
   },[]);


   const handleDeleteMessageShow = (i, id) => {
      messages[0].messages[i].messageSelected = !messages[0].messages[i].messageSelected;
      alert(messages[0].messages[i].messageSelected);
      const isAtLeastOneMessageSelect = messages[0].messages.some(message =>{ return message.messageSelected === true });
      alert(isAtLeastOneMessageSelect);
      if(isAtLeastOneMessageSelect === true) {
         setAtLeastOneMessageSelected(true);

      }else{
         setAtLeastOneMessageSelected(false);
      }
       alert(atLeastOneMessageSelected);
   };

   const removeMessage = async () => {
      try{
         await dispatch(deleteMessage(messageRef.current.value));
         messageRef.current.value = "";
      }catch(error){
         alert(`Chat: removeMessage er => ${error.message}`);
      }
      
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
   )
});



export default Message;


