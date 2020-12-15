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
   const registerUser = (e) => {
      if(confirmPassword === inputPassword) {
         e.preventDefault();
            auth.createUserWithEmailAndPassword(inputEmail, inputPassword)
               .then(
                  userInfo => {
                     // console.log(userInfo); // Pendiente en este paso
                     console.log(userInfo.user.email);
                     // setUser(userInfo);
                     updateUser();
                     setInputName("");
                     setInputEmail("");
                     setInputPassword("");
                     setConfirmPassword("");
                     
                  }
               ).catch( error => {
                  setInputPassword("");
                  setConfirmPassword("");
                  console.log(error);
               });

         // if((confirmPassword.length > 5) && (inputPassword.length > 5)) {
         //    e.preventDefault();
         //    auth.createUserWithEmailAndPassword(inputEmail, inputPassword)
         //       .then(
         //          userInfo => {
         //             // console.log(userInfo); // Pendiente en este paso
         //             console.log(userInfo.user.email);
         //             // setUser(userInfo);
         //             updateUser();
         //             setInputName("");
         //             setInputEmail("");
         //             setInputPassword("");
         //             setConfirmPassword("");
         //          }
         //       ).catch( error => console.log(error));
         // } else {
         //    e.preventDefault();
         //    setInputPassword("");
         //    setConfirmPassword("");
         //    alert(`Sorry ${inputName}, your password has less than 6 characters`);
         // };

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
            const userInfo = firebase.auth().currentUser;
            setUser(userInfo);
            console.log(userInfo);
            console.log(userInfo.displayName);
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
