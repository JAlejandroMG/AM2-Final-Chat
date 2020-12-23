import React, { useState, useEffect, useRef } from "react";
//* React Router
import {useHistory} from 'react-router-dom';
//* Firebase
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';



function Register({ setUser }) {
   // Estado local para captura de datos en componente Register
   // const [inputFirstName, setInputFirstName] = useState("");
   // const [inputLastName, setInputLastName] = useState("");
   // const [confirmPassword, setConfirmPassword] = useState("");
   // Estados que se comparten entre los componentes Register y Login
   // const [inputEmail, setInputEmail] = useState("");
   // const [inputPassword, setInputPassword] = useState("");
   //* Hooks
   const history = useHistory();
   //* Uso de referencias para captura de datos locales que mejoran rendimiento al no renderizar
   const refContador = useRef(1); //! SOLO PARA PRUEBAS
   const firstNameRef = useRef("");
   const lastNameRef = useRef("");
   const emailRef = useRef("");
   const passwordRef = useRef("");
   const confirmPasswordRef = useRef("");

   //! SOLO PARA PRUEBAS
   useEffect(() => {
      console.log(`Register render: ${refContador.current}`);
      refContador.current++;
   })
   /* const showRef = (e) => {
      e.preventDefault();
      console.log(firstNameRef.current.value); //Valor en el input
      console.log(firstNameRef); //Objeto current, propiedad input, con propiedades
   } */


   //* Registro de usuario en Firebase con email y password
   const registerUser = (e) => {
      if(confirmPasswordRef.current.value === passwordRef.current.value) {
         e.preventDefault();
            auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
               .then(
                  userInfo => {
                     updateUser();
                     firstNameRef.current.value = "";
                     lastNameRef.current.value = "";
                     emailRef.current.value = "";
                     passwordRef.current.value = "";
                     confirmPasswordRef.current.value = "";
                     history.push("/chat");          
                  }
               ).catch(error => {
                  passwordRef.current.value = "";
                  confirmPasswordRef.current.value = "";
                  alert(`We've not been able to register you as user due to the following: ${error.message}`);
               });
      } else {
         e.preventDefault();
         passwordRef.current.value = "";
         confirmPasswordRef.current.value = "";
         alert(`The confirmation of your password doesn't match your password`);
      }
   };

   //* Actualización de nombre completo y perfil de usuario en Firebase
   const updateUser = () => {
      const user = firebase.auth().currentUser;
      const photoURL = "https://i.picsum.photos/id/491/200/200.jpg?hmac=Zi1sOp0NH_d3eOa3qUg8-oDQJWvIkH8UkrAJZ7l-4wg"
      //https://i.picsum.photos/id/738/200/200.webp?hmac=AaUZJdpXCcpULfGEoQqubLm8Kd0evV4VjwUnuM8BUqI
      //Thomas Anderson
      user.updateProfile({
         displayName: `${firstNameRef} ${lastNameRef}`,
         photoURL
         }).then(() => {
            const user = firebase.auth().currentUser;
            setUser(user); //! USER ES ESTADO GLOBAL
            appRegister(user);
         }).catch(error => {
            alert(`There's been an error: ${error.message}`);
         });
   };

   //* Registro del usuario en la aplicación
   const appRegister = (user) => {
      const urlRegister = `https://academlo-whats.herokuapp.com/api/v1/users`;
      // const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
      const headers = {'Content-Type': 'application/json'};
      const body = {
         "firstName": firstNameRef,
         "lastName": lastNameRef,
         "email": emailRef,
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
   /* const handleInputFirstNameChange = (e) => {
      setInputFirstName(e.target.value);
   }; */
   /* const handleInputLastNameChange = (e) => {
      setInputLastName(e.target.value);
   }; */
   /* const handleInputEmailChange = (e) => {
      setInputEmail(e.target.value);
   }; */
   /* const handleInputPasswordChange = (e) => {
      setInputPassword(e.target.value);
   }; */

   //* Confirmación del password
   /* const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
   }; */


   //* Componente Register
   return (
      <div>
         <form onSubmit={registerUser} >
         {/* <form onSubmit={showRef}> */}
            <h2>Register</h2>
               <br/>
            <label>First Name</label>
            <input type="text" /* value={refFirstName.current} */ name="firstName" ref={firstNameRef} /* onChange={handleInputFirstNameChange} */ required placeholder="My first name"/>
               <br/>
            <label>Last Name</label>
            <input type="text" /* value={inputLastName} */ name="lastName" ref={lastNameRef} /* onChange={handleInputLastNameChange} */ required placeholder="My last name"/>
               <br/>
            <label>Email</label>
            <input type="email" /* value={inputEmail} */ name="email" ref={emailRef} /* onChange={handleInputEmailChange} */ required placeholder="My email"/>
               <br/>
            <label>Password</label>
            <input type="password" /* value={inputPassword} */ name="password" ref={passwordRef} /* onChange={handleInputPasswordChange} */ pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Password"/>
               <br/>
            <label>Confirm password</label>
            <input type="password" /* value={confirmPassword} */ name="confirmPassword" ref={confirmPasswordRef} /* onChange={handleConfirmPasswordChange} */ pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Confirm password"/>
               <br/>
            <button type="submit">Register</button>
         </form>
      </div>
   );
}

export default Register;
