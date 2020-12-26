import React, { useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';


//{ Called from App.js
function Register() {
   const firstNameRef = useRef("");
   const lastNameRef = useRef("");
   const emailRef = useRef("");
   const passwordRef = useRef("");
   const confirmPasswordRef = useRef("");
   const history = useHistory();
   const dispatch = useDispatch();
   //[Pendiente...
   // const wellcomeRef = useRef("Esto es una prueba");
   // const showWellcomeRef = useRef(true);

   //! SOLO PARA PRUEBAS
   const refContador = useRef(1);
   useEffect(() => {
      console.log(`Register: render => ${refContador.current}`);
      refContador.current++;
   })


//*---------------- Registers user in Firebas and in the App ----------------*//
   const registerUser = async (e) => {
      if(confirmPasswordRef.current.value === passwordRef.current.value) {
         e.preventDefault();
         try{
            console.log("Register: registerUser");
            const message = await dispatch(register(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value));
            firstNameRef.current.value = "";
            lastNameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            alert(`Register: registerUser => ${message}`);
            history.push("/chat");
         }catch(error){
            // passwordRef.current.value = ""; //!Cannot set property 'value' of null
            // confirmPasswordRef.current.value = ""; //!Cannot set property 'value' of null
            alert(`Register: registerUser er1 => ${error.message}`);
         };
      } else {
         e.preventDefault();
         passwordRef.current.value = "";
         confirmPasswordRef.current.value = "";
         alert(`Register: registerUser er2 => The confirmation of your password doesn't match your password`);
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
