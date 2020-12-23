import React from "react";
import { Route } from "react-router-dom";
//* Components
import ChatRoom from './ChatRoom/ChatRoom';
import Login from './Login/Login';


export default function ProtectedRoute({ path, user, setUser, children, messages }) {return (
      <Route path={path}>
         {
            user ? 
            /* (children) : */
            <ChatRoom messages={messages} user={user} setUser={setUser} /> :
            (
               <Login setUser={setUser} />
            )
         }
      </Route>
   );
}
