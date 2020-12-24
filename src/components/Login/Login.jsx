import React, { useEffect, useRef } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, checkActiveSession, resetPassword } from '../../redux/actions/authActions';


// Es llamado por App.js, ProtectedRoute.jsx
function Login() {
   const emailRef = useRef("");
   const passwordRef = useRef("");
   const history = useHistory();
   const dispatch = useDispatch();


   //* Al entrar a la aplicación, después de montar, Login revisa si ya hay usuario loggeado
   useEffect(() => {
      (async function() {
         try{
            console.log("Login: useEffect");
            const message = await dispatch(checkActiveSession());
            alert(`Login: useEffect ok => ${message}`);
            history.push("/chat");
         }catch(error){
            alert(`Login: useEffect er => ${error.message}`);
         }
      })();
      // eslint-disable-next-line
   }, []);


   const loginUser = async (e, provider) => {
      e.preventDefault();
      try{
         console.log("Login: loginUser");
         const message = await dispatch(login(provider, emailRef.current.value, passwordRef.current.value));
         emailRef.current.value = "";
         passwordRef.current.value = "";
         alert(`Login: loginUser ok => ${message}`);
         history.push("/chat");
      }catch(error) {
         // passwordRef.current.value = ""; //!Cannot set property 'value' of null
         alert(`Login: loginUser er => ${error.message}`);
      }
   };
   

   const resetUserPassword = async() => {
      try{
         console.log("Login: resetUserPassword");
         const actionCodeSettings = { url: `http://localhost:3000/` };
         const message = await dispatch(resetPassword(emailRef.current.value, actionCodeSettings));
         emailRef.current.value = "";
         passwordRef.current.value = "";
         alert(`Login: resetUserPassword ok => ${message}`);
         // alert(`Se ha enviado un correo ${user.email} para reestablecer la contraseña.`);
      }catch(error){
         alert(`Login: resetUserPassword er => ${error}`);
      }
   };


   //* Componente Login
   return (
      <div>
         <form onSubmit={(e) => loginUser(e, "")} >
            <h2>Login</h2>
               <br/>
            <label>Email</label>
            <input type="email" name="email" ref={emailRef} placeholder="My email" required/>
               <br/>
            <label>Password</label>
            <input type="password" name="password" ref={passwordRef} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Password"/>
               <br/>
            <button type="submit">Login</button>
         </form>
               <br />
            <button onClick={(e) => loginUser(e, "google")}>Login with Google</button>
               <br />
            <button onClick={resetUserPassword}>Reset Password</button>
               <br />
            <Link to="/register">
               <button>Register</button>
            </Link>
      </div>
   );
}

export default Login;
