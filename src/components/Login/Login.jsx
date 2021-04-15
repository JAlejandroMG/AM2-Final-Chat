import React, { useEffect, useRef } from "react";
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, checkActiveSession, resetPassword } from '../../redux/actions/authActions';
import { toggleLoader } from '../../redux/actions/loaderActions';



//{ Called from App.js, ProtectedRoute.jsx
function Login() {
   const emailRef = useRef("");
   const passwordRef = useRef("");
   const history = useHistory();
   const dispatch = useDispatch();
   const { loader } = useSelector(state => state.loader);


//*----------------- Checks on Firebase if user is connected ----------------*//
   useEffect(() => {
      (async function() {
         try{
            const message = await dispatch(checkActiveSession());
            alert(message); //! BIENVENIDA
            history.push("/chat");
         }catch(error){
            // alert(error.message); //! MENSAJE ERROR
         }
      })();
      // eslint-disable-next-line
   }, []);

   const loginUser = async (e, provider) => {
      e.preventDefault();
      try{
         dispatch(toggleLoader());
         const message = await dispatch(login(provider, emailRef.current.value, passwordRef.current.value));
         alert(message); //! BIENVENIDA
         dispatch(toggleLoader());
         history.push("/chat");
      }catch(error) {
         alert(error.message); //! MENSAJE ERROR
      }
   };
   
   const resetUserPassword = async() => {
      try{
         const actionCodeSettings = { url: `http://localhost:3000/` };
         const message = await dispatch(resetPassword(emailRef.current.value, actionCodeSettings));
         alert(message);
         emailRef.current.value = "";
      }catch(error){
         alert(error.message); //! MENSAJE ERROR
      }
   };


   //* Componente Login
   return (
      (
         loader ?
         <div id="startup" >
            <svg className="spinner-container" width="65px" height="65px" viewBox="0 0 52 52">
               <circle className="path" cx="26px" cy="26px" r="20px" fill="none" strokeWidth="4px"></circle>
            </svg>
         </div>
      :
      <div className="formLogin">
         <form onSubmit={(e) => loginUser(e, "")} >
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
            <button className="buttonLogin"onClick={(e) => loginUser(e, "google")}>Login with Google</button>
               <br />
            <Link to="/register">
               <button className="buttonRegister">Register</button>
            </Link>
         </form>
            <br />
            <button className="buttonResetPassword" onClick={resetUserPassword}>Reset Password</button>
      </div>
      )
   );
   
}



export default Login;
