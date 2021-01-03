import React, { useEffect, useRef } from "react";
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from './Login/Login';



//{ Called from App.js
function ProtectedRoute({ path, children}) {
   const { user } = useSelector(state => state.auth);

   //! SOLO PARA PRUEBAS
   const refContador = useRef(1);
   useEffect(() => {
      console.log(`ProtectedRoute: render => ${refContador.current}`);
      refContador.current++;
   })
   
   return (
      <Route path={path}>
         {
            user ? 
            (children) :
            ( <Login /> )
         }
      </Route>
   );
};



export default ProtectedRoute;
