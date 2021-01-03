import React, { useEffect, useRef } from "react";
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, checkActiveSession, resetPassword } from '../../redux/actions/authActions';



//{ Called from App.js, ProtectedRoute.jsx
function Login() {
   const emailRef = useRef("");
   const passwordRef = useRef("");
   const history = useHistory();
   const dispatch = useDispatch();
   //[Pendiente...
   // const wellcomeRef = useRef("Esto es una prueba");
   // const showWellcomeRef = useRef(true);


   //! SOLO PARA PRUEBAS
   const refContador = useRef(1);
   useEffect(() => {
      console.log(`Login: render => ${refContador.current}`);
      refContador.current++;
   })


//*----------------- Checks on Firebase if user is connected ----------------*//
   useEffect(() => {
      (async function() {
         try{
            console.log("Login: useEffect: checkActiveSession"); //! SOLO PARA PRUEBAS
            const message = await dispatch(checkActiveSession());
            alert(`Login: useEffect: checkActiveSession => ${message}`); //! BIENVENIDA
            history.push("/chat");
         }catch(error){
            alert(`Login: useEffect: checkActiveSession er => ${error}`); //! MENSAJE ERROR
         }
      })();
      // eslint-disable-next-line
   }, []);


   const loginUser = async (e, provider) => {
      e.preventDefault();
      try{
         console.log("Login: loginUser"); //! SOLO PARA PRUEBAS
         const message = await dispatch(login(provider, emailRef.current.value, passwordRef.current.value));
         emailRef.current.value = "";
         passwordRef.current.value = "";
         alert(`Login: loginUser => ${message}`); //! BIENVENIDA
         history.push("/chat");
      }catch(error) {
         // passwordRef.current.value = ""; //!Cannot set property 'value' of null
         alert(`Login: loginUser er => ${error.message}`); //! MENSAJE ERROR
      }
   };
   

   const resetUserPassword = async() => {
      try{
         console.log("Login: resetUserPassword"); //! SOLO PARA PRUEBAS
         const actionCodeSettings = { url: `http://localhost:3000/` };
         const message = await dispatch(resetPassword(emailRef.current.value, actionCodeSettings));
         emailRef.current.value = "";
         passwordRef.current.value = "";
         alert(`Login: resetUserPassword => ${message}`); //! CORREO ENVIADO PARA REESTABLECER CONTRASEÑA
      }catch(error){
         alert(`Login: resetUserPassword er => ${error.message}`); //! MENSAJE ERROR
      }
   };


   //* Componente Login
   return (
      <div>
         <form className="formLogin" onSubmit={(e) => loginUser(e, "")} >
            <h2 className="titleLogin">Login</h2>
               <br/>
            <label>Email</label>
            <input className="inputLogin" type="email" name="email" ref={emailRef} placeholder="My email" required/>
               <br/>
            <label>Password</label>
            <input className="inputLogin" type="password" name="password" ref={passwordRef} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Password"/>
               <br/>
            <button className="buttonLogin" type="submit">Login</button>
            <br />
            <button className="buttonResetPassword" onClick={resetUserPassword}>Reset Password</button>
               
            <br />
            <button className="buttonLogin"onClick={(e) => loginUser(e, "google")}>Login with Google</button>
               <br />
            <Link to="/register">
               <button className="buttonRegister">Register</button>
            </Link>
         </form>
      </div>
   );
}



export default Login;
