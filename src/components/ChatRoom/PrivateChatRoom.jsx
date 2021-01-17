import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";

//{ Called from SidebarChat.js
const PrivateChatRoom = () => {
/* 
   //! SOLO PARA PRUEBAS
   const refContador = useRef(1);
   useEffect(() => {
      console.log(`PrivateChatRoom: render => ${refContador.current}`);
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

export default PrivateChatRoom;
