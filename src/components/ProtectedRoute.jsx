import React from "react";
import { Route } from "react-router-dom";
//* Components
import Login from './Login/Login';


export default function ProtectedRoute({ path, user, setUser, children }) {
   return (
      <Route path={path}>
         {
            user ? 
            (children) :
            (
               <Login setUserFn={setUser} />
            )
         }
      </Route>
   );
}