import React, { useEffect, useRef } from "react";
//* React Router
import {useHistory} from 'react-router-dom';
//* React-Redux
import { useDispatch } from 'react-redux';
//* Actions
import { register} from '../../redux/actions/authActions';


function Register({ setUser }) {
   //* Uso de referencias para captura de datos locales que mejoran rendimiento al no renderizar
   const refContador = useRef(1); //! SOLO PARA PRUEBAS
   const firstNameRef = useRef("");
   const lastNameRef = useRef("");
   const emailRef = useRef("");
   const passwordRef = useRef("");
   const confirmPasswordRef = useRef("");
   //{ Posible mejora
   // const wellcomeRef = useRef("Esto es una prueba");
   // const showWellcomeRef = useRef(true);
   //* React-Redux
   const dispatch = useDispatch();
   //* Hooks
   const history = useHistory();

   //! SOLO PARA PRUEBAS
   useEffect(() => {
      console.log(`Register render: ${refContador.current}`);
      refContador.current++;
   })


   //* Registro de usuario en Firebase y en la aplicación con email y password
   const registerUser = async (e) => {
      if(confirmPasswordRef.current.value === passwordRef.current.value) {
         e.preventDefault();
         try{
            const message = await dispatch(register(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value));
            firstNameRef.current.value = "";
            lastNameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            alert(message);
            history.push("/chat");
         }catch(error){
            alert(error.message);
         };
      } else {
         e.preventDefault();
         passwordRef.current.value = "";
         confirmPasswordRef.current.value = "";
         alert(`The confirmation of your password doesn't match your password`);
      }
   };


   //* Componente Register
   return (
      <div>
         <form onSubmit={registerUser} >
            <h2>Register</h2>
               <br/>
            <label>First Name</label>
            <input type="text" name="firstName" ref={firstNameRef} required placeholder="My first name"/>
               <br/>
            <label>Last Name</label>
            <input type="text" name="lastName" ref={lastNameRef} required placeholder="My last name"/>
               <br/>
            <label>Email</label>
            <input type="email" name="email" ref={emailRef} required placeholder="My email"/>
               <br/>
            <label>Password</label>
            <input type="password" name="password" ref={passwordRef} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Password"/>
               <br/>
            <label>Confirm password</label>
            <input type="password" name="confirmPassword" ref={confirmPasswordRef} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Password must have 6 or more characters with at least 1 lowercase, 1 uppercase and 1 number." placeholder="Confirm password"/>
               <br/>
            <button type="submit">Register</button>
         </form>
      </div>
   );
}

export default Register;
