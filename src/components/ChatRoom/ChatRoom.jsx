import React/* , { useEffect, useRef } */ from "react";
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";



//{ Called from ProtectedRoute.jsx
const ChatRoom = () => {
   /* 
   //! SOLO PARA PRUEBAS
   const refContador = useRef(1);
   useEffect(() => {
      console.log(`ChatRoom: render => ${refContador.current}`);
      refContador.current++;
   })
   */


   return (
      <div className="app__body">
            <Sidebar />
            <Chat />
      </div>
   )
};



export default ChatRoom;


