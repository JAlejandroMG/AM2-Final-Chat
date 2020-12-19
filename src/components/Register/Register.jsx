import React, { useState } from "react";
//* React Router
import {useHistory} from 'react-router-dom';
//* Firebase
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';



function Register({ setUser }) {
   //* Estado local para captura de datos en componente Register
   const [inputFirstName, setInputFirstName] = useState("");
   const [inputLastName, setInputLastName] = useState("");
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
                     setInputFirstName("");
                     setInputLastName("");
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
         alert(`Sorry ${inputFirstName}, the confirmation of your password doesn't match your password`);
      }
   };

   //* Actualización de nombre completo y perfil de usuario en Firebase
   const updateUser = () => {
      const user = firebase.auth().currentUser;
      const photoURL = "https://i.picsum.photos/id/491/200/200.jpg?hmac=Zi1sOp0NH_d3eOa3qUg8-oDQJWvIkH8UkrAJZ7l-4wg"
      //https://i.picsum.photos/id/738/200/200.webp?hmac=AaUZJdpXCcpULfGEoQqubLm8Kd0evV4VjwUnuM8BUqI
      //Thomas Anderson
      user.updateProfile({
         displayName: `${inputFirstName} ${inputLastName}`,
         photoURL
         }).then(() => {
            // console.log(userInfo);
            const user = firebase.auth().currentUser;
            setUser(user);
            console.log(user);
            console.log("Register: ", user.displayName);
            appRegister(user);
         }).catch(error => {
            console.log (`Register: ha ocurrido un error: ${error.message}`);
         });
   };

   //* Registro del usuario en la aplicación
   const appRegister = (user) => {
      const urlRegister = `https://academlo-whats.herokuapp.com/api/v1/users`;
      // const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
      const headers = {'Content-Type': 'application/json'};
      const body = {
         "firstName": inputFirstName,
         "lastName": inputLastName,
         "email": inputEmail,
         "username": user.displayName,
         "photoUrl": user.photoURL,
         "uid": user.uid
      }
   
      fetch(urlRegister, {
      method: `POST`,
      headers,
      body: JSON.stringify(body)
   })


   };


   //* Se guarda la captura de datos del usuario
   const handleInputFirstNameChange = (e) => {
      setInputFirstName(e.target.value);
   };
   const handleInputLastNameChange = (e) => {
      setInputLastName(e.target.value);
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
            <label>First Name</label>
            <input type="text" value={inputFirstName} name="firstName" onChange={(e) => handleInputFirstNameChange(e)} required placeholder="My first name"/>
               <br/>
            <label>Last Name</label>
            <input type="text" value={inputLastName} name="lastName" onChange={(e) => handleInputLastNameChange(e)} required placeholder="My last name"/>
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
