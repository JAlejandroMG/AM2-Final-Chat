import React, { useEffect, useRef } from "react";
import "./SidebarDropdown.css";
//* Material
import { Avatar } from "@material-ui/core";


// Es llamado por Sidebar.js
const SidebarDropdown = ({ photo, firstName, lastName, id }) => {

   //! SOLO PARA PRUEBAS
   const refContador = useRef(1);
   useEffect(() => {
      console.log(`SidebarDropdown: render => ${refContador.current}`);
      refContador.current++;
   })


   return (
      <div className="sidebarDropdown" onClick={() => alert("Hola!")}>
         <Avatar src={photo} />
         <div className="sidebarDropdown__info">
            <h2>{`${firstName} ${lastName}`}</h2>
            {/* <p>Último mensaje</p> */}
         </div>
      </div>
   );
};


export default SidebarDropdown;
