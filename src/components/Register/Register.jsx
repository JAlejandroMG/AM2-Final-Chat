import React, { useState } from "react";
//* React Router
import {useHistory} from 'react-router-dom';
//* Firebase
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';



function Register({ setUser }) {
   //* Estado local para captura de datos en componente Register
   const [inputName, setInputName] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   //{ Estados que se comparten entre los componentes Register y Login
   const [inputEmail, setInputEmail] = useState("");
   const [inputPassword, setInputPassword] = useState("");
   //* Hooks
   const history = useHistory();


   //* Registro de usuario en Firebase con email y password
   const registerUser = (e) => {
      if(confirmPassword === inputPassword) {
         e.preventDefault();
            auth.createUserWithEmailAndPassword(inputEmail, inputPassword)
               .then(
                  userInfo => {
                     updateUser();
                     setInputName("");
                     setInputEmail("");
                     setInputPassword("");
                     setConfirmPassword("");
                     history.push("/chat");          
                  }
               ).catch( error => {
                  setInputPassword("");
                  setConfirmPassword("");
               });
      } else {
         e.preventDefault();
         setInputPassword("");
         setConfirmPassword("");
         alert(`Sorry ${inputName}, the confirmation of your password doesn't match your password`);
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
            setUser(user);
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
            <input type="text" value={inputName} name="name" onChange={(e) => handleInputNameChange(e)} required placeholder="My name"/>
               <br/>
            <label>Email</label>
            <input type="email" value={inputEmail} name="email" onChange={(e) => handleInputEmailChange(e)} required placeholder="My email"/>
               <br/>
            <label>Password</label>
            <input type="password" value={inputPassword} name="password" onChange={(e) => handleInputPasswordChange(e)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Password"/>
               <br/>
            <label>Confirm password</label>
            <input type="password" value={confirmPassword} name="confirmPassword" onChange={(e) => handleConfirmPasswordChange(e)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Confirm password"/>
               <br/>
            <button type="submit">Register</button>
         </form>
      </div>
   );
}

export default Register;
