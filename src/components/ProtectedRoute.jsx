import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from './Login/Login';



//{ Called from App.js
function ProtectedRoute({ path, children}) {
   const { user } = useSelector(state => state.auth);

   
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
