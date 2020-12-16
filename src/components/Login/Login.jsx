import React, { useState, useEffect } from "react";
//* React Router
import {useHistory} from 'react-router-dom';
//* Firebase
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';



function Login({ setUser }) {
   //{ Estados que se comparten entre los componentes Register y Login
   const [inputEmail, setInputEmail] = useState("");
   const [inputPassword, setInputPassword] = useState("");
   //* Poveedor
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   //* Hooks
   const history = useHistory();


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
   
   const loginUser = async (e) => {
      try {
         e.preventDefault();
         const { user } = await auth.signInWithEmailAndPassword(inputEmail, inputPassword)
         //Para actualizar el estado y redireccionar al usuario a otra pagina
         await setUser(user);
         history.push("/chat");
      } catch (error) {
         e.preventDefault();
         setInputPassword("");
         //En caso de que las credenciales de acceso sean incorrectas
         console.log("Error en la autenticacion: ", error.message);
         alert(error.message);
      }
   };

   
   const showGooglePopup = async () => {
      try {
         let { user } = await firebase.auth().signInWithPopup(googleProvider);
         //Para actualizar el estado y redireccionar al usuario a otra pagina
         await setUser(user);
         history.push("/chat");
      } catch (error) {
         //En caso de que las credenciales de acceso sean incorrectas
         console.log("Error en la autenticacion: ", error.message);
         alert(error.message);
      }
      };



   //* Componente Login
   return (
      <div>
         <form onSubmit={loginUser} >
            <h2>Login</h2>
               <br/>
            <label>Email</label>
            <input type="email" value={inputEmail} name="email" onChange={(e) => handleInputEmailChange(e)} required placeholder="My email"/>
               <br/>
            <label>Password</label>
            <input type="password" value={inputPassword} name="password" onChange={(e) => handleInputPasswordChange(e)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Password"/>
               <br/>
            <button type="submit">Login</button>
               <br />
            <button type="submit" onClick={showGooglePopup}>Login with Google</button>
         </form>
      </div>
   );
}

export default Login;
