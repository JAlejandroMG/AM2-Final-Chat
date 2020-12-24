import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';
//* Components
import ChatRoom from './ChatRoom/ChatRoom';
import Login from './Login/Login';


// Es llamado por App.js
export default function ProtectedRoute({ path, children, messages }) {
   //* React-Redux-hooks
   const { user } = useSelector(state => state.auth);
   
   return (
      <Route path={path}>
         {
            user ? 
            /* (children) : */
            <ChatRoom messages={messages} /> :
            (
               <Login />
            )
         }
      </Route>
   );
};
