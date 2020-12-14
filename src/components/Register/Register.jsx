import React, { useState } from "react";
import {auth} from '../../firebase/config';


function Register() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleNameFieldChange = (e) => {
      setName(e.target.value);
   };

   const handleEmailFieldChange = (e) => {
      setEmail(e.target.value);
   };

   const handlePasswordFieldChange = (e) => {
      setPassword(e.target.value);
   };

   const confirmPassword = (e) => {

   };

   const register = (event) => {
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email, password).then(
            response => {
               console.log(response);
            }
      ).catch( error => console.log(error));
   }

   return (
      <div>
         <form onSubmit={register} >
            <h2>Register</h2>
               <br/>
            <label>Name</label>
            <input type="text" name="name" onChange={(e) => handleNameFieldChange(e)}/>
               <br/>
            <label>Email</label>
            <input type="email" name="email" onChange={(e) => handleEmailFieldChange(e)}/>
               <br/>
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => handlePasswordFieldChange(e)}/>
               <br/>
            <label>Confirm password</label>
            <input type="password" name="passwordConfirmation" onChange={(e) => confirmPassword(e)}/>
               <br/>
            <button type="submit">Register</button>
         </form>
      </div>
   );
}


export default Register;
