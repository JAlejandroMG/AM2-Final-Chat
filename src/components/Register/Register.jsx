import React, { useState } from "react";
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';



function Register() {
   //* Estado local para captura de datos en componente Register
   const [inputName, setInputName] = useState("");
   //{ Estados que se comparten entre los componentes Register y Login
   const [inputEmail, setInputEmail] = useState("");
   const [inputPassword, setInputPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   //! Estado global pendiente de mandar a store con redux
   const [user, setUser] = useState({});


   //* Registro de usuario en Firebase con email y password
   const registerUser = (event) => {
      if(confirmPassword === inputPassword) {
         event.preventDefault();
         auth.createUserWithEmailAndPassword(inputEmail, inputPassword)
            .then(
               userInfo => {
                  // console.log(userInfo); // Pendiente en este paso
                  console.log(userInfo.user.email);
                  setUser(userInfo);
                  updateUser();
               }
            ).catch( error => console.log(error));
      } else {
            event.preventDefault();
            alert(`Lo siento ${inputName}, la confirmación de tu password no coincide con tu password`);
         }
   };

   //* Actualización del perfil de usuario en Firebase
   // https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
   //* Imagen de perfil por defecto
   // https://picsum.photos/seed/picsum/200/200

   //* Actualización de nombre completo y perfil de usuario
   const updateUser = () => {
      var user = firebase.auth().currentUser;
      const photoURL = "https://picsum.photos/seed/picsum/200/200"

      user.updateProfile({
         displayName: inputName,
         photoURL
         }).then(() => {
            // console.log(userInfo);
            const user = firebase.auth().currentUser;
            console.log(user);
            console.log(user.displayName);
         }).catch(error => {
            console.log (`Ha ocurrido un error: ${error.message}`);
         });
   };


   //* Se guarda la captura de datos del usuario
   const handleInputNameChange = (e) => {
      setInputName(e.target.value);
   };
   const handleInputEmailChange = (e) => {
      setInputEmail(e.target.value);
   };
   const handleInputPasswordChange = (e) => {
      setInputPassword(e.target.value);
   };

   //* Confirmación del password
   const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
   };


   //* Componente Register
   return (
      <div>
         <form onSubmit={registerUser} >
            <h2>Register</h2>
               <br/>
            <label>Name</label>
            <input type="text" name="name" onChange={(e) => handleInputNameChange(e)}/>
               <br/>
            <label>Email</label>
            <input type="email" name="email" onChange={(e) => handleInputEmailChange(e)}/>
               <br/>
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => handleInputPasswordChange(e)}/>
               <br/>
            <label>Confirm password</label>
            <input type="password" name="confirmPassword" onChange={(e) => handleConfirmPasswordChange(e)}/>
               <br/>
            <button type="submit">Register</button>
         </form>
      </div>
   );
}

export default Register;
