import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import ChatRoom from './ChatRoom/ChatRoom';
import Login from './Login/Login';


// Es llamado por App.js
export default function ProtectedRoute({ path, children}) {
   //* React-Redux-hooks
   const { user } = useSelector(state => state.auth);
   
   return (
      <Route path={path}>
         {
            user ? 
            /* (children) : */
            <ChatRoom /> :
            (
               <Login />
            )
         }
      </Route>
   );
};
