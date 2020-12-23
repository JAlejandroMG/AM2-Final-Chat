import React, { useState, useEffect, useCallback } from "react";
//* React Router
import { Link, useHistory } from 'react-router-dom';
//* Firebase
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';



function Login({ setUser }) {
   //{ Estados que se comparten entre los componentes Register y Login
   const [inputEmail, setInputEmail] = useState("");
   const [inputPassword, setInputPassword] = useState("");
   //* Hooks
   const history = useHistory();
   //* Poveedor
   const googleProvider = new firebase.auth.GoogleAuthProvider();


   //* Al entrar a la aplicación después de montar Login revisa si ya hay usuario loggeado
   useEffect(() => {
      // componentDidMount
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            setUser(user);
            history.push("/chat");
         }
      });
      // eslint-disable-next-line
      }, []);


   //* Se guarda la captura de datos del usuario
   const handleInputEmailChange = (e) => {
      setInputEmail(e.target.value);
   };
   const handleInputPasswordChange = (e) => {
      setInputPassword(e.target.value);
   };
   
   const loginUser = async (e) => { //! Login ejecuta ProtectedRoute 8 veces useCallback
      try {
         e.preventDefault();
         const { user } = await auth.signInWithEmailAndPassword(inputEmail, inputPassword)
         //Para actualizar el estado y redireccionar al usuario a otra pagina
         // console.log("Login: user");
         console.log(user);
         await setUser(user);
         history.push("/chat");
      } catch (error) {
         setInputPassword("");
         //En caso de que las credenciales de acceso sean incorrectas
         console.log("Error en la autenticacion: ", error.message);
      }
   };

   
   const showGooglePopup = async () => { //! Login ejecuta ProtectedRoute 8 veces useCallback
      try {
         let { user } = await firebase.auth().signInWithPopup(googleProvider);
         //Para actualizar el estado y redireccionar al usuario a otra pagina
         console.log(user);
         await setUser(user);
         history.push("/chat");
      } catch (error) {
         //En caso de que las credenciales de acceso sean incorrectas
         console.log("Error en la autenticacion: ", error.message);
      }
      };
   
   
   const resetPassword = () => {
      // Para redireccionar después de reestablecer la contraseña
      const actionCodeSettings = {
         url: `http://localhost:3000/`
      };
      //Método de Firebase para reestablecer contraseña con parámetro para redireccionar
      auth.sendPasswordResetEmail(inputEmail, actionCodeSettings)
         .then(() => {
            alert(`Se ha enviado un correo ${inputEmail} para reestablecer la contraseña.`);
         }).catch((error) => {
            console.log("Error al solicitar reestablecer la contraseña: ", error.message);
         });
   }


   //* Componente Login
   return (
      <div>
         <form onSubmit={loginUser} >
            <h2>Login</h2>
               <br/>
            <label>Email</label>
            <input type="email" value={inputEmail} name="email" onChange={handleInputEmailChange} required placeholder="My email"/>
               <br/>
            <label>Password</label>
            <input type="password" value={inputPassword} name="password" onChange={handleInputPasswordChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Password"/>
               <br/>
            <button type="submit">Login</button>
         </form>
               <br />
            <button onClick={showGooglePopup}>Login with Google</button>
               <br />
            <button onClick={resetPassword}>Reset Password</button>
               <br />
            <Link to="/register">
               <button>Register</button>
            </Link>
      </div>
   );
}

export default Login;
