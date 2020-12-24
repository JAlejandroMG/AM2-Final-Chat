import * as actions from '../actionTypes';
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';



//{ Llamada desde login(),update(),checkActiveSession()
//*---------- Asignación del objeto user con los datos del usuario ----------*//
const setUser = (user) => {
   return {
      type: actions.SET_USER,
      payload: user
   }
}



//{ Llamada desde Chat.js=>logoutUser()
//*----------------- Actualización de contraseña en Firebase ----------------*//
export const logout = () => {
   return(dispatch) => {

      return new Promise(async(resolve, reject) => {
         try{
            console.log("authActions: logout");
            await firebase.auth().signOut();
            dispatch(setUser(false));
            resolve(true);
         }catch(error){
            alert(`authActions: logout er => ${error.message}`);
            reject(error.message);
         }
      });
      
   }
};

//{ Llamada desde Login.jsx=>resetUserPassword()
//*----------------- Actualización de contraseña en Firebase ----------------*//
export const resetPassword = (email, actionCodeSettings) => {
   return() => {

      return new Promise (async(resolve, reject) => {
         console.log("authActions: resetPassword");
         await auth.sendPasswordResetEmail(email, actionCodeSettings)
         .then(() => {
            resolve(true);
         }).catch((error) => {
            alert(`authActions: resetPassword er => ${error.message}`);
            reject(error.message);
         });
      });

   };
};

//{ Llamada desde Login.jsx=>useEffect()
//*------------ Verificación de usuario ya conectado en Firebase ------------*//
export const checkActiveSession = () => {
   return (dispatch) => {
      
      return new Promise (async(resolve, reject) => {
         console.log("authActions: checkActiveSession");
         await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               dispatch(setUser(user));
               resolve(true);
            } else {
               alert(`authActions: checkActiveSession er => No hay usuario conectado`);
               reject(false);
            }
         });
      });

   };
};

//{ Llamada desde Login.jsx=>loginUser()
//*--------------- Acceso a la aplicación a través de Firebase --------------*//
export const login = (provider, email, password) => {
   return (dispatch, getState) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("authActions: login(email and password)");
            if(!provider){
               let {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
               dispatch(setUser(user));
            }else{
               console.log("authActions: login(google)");
               let googleProvider = new firebase.auth.GoogleAuthProvider();
               let {user} = await firebase.auth().signInWithPopup(googleProvider);
               // console.log(user);
               dispatch(setUser(user));
            }
            console.log("authActions: login(last part)");
            const { user } = getState().auth;
            console.log(user);
            // Aunque user.displayName puede ser accesado desde appRegister() se pasa como argumento para poder reutilizar esa función desde aquí y desde update()
            // const message = await dispatch(appRegister(user.displayName, "Firebase"));
            const message = "Bienvenido a la aplicación de Chat";
            resolve(message);
         }catch(error){
            alert(`authActions: login er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};

//{ Llamada desde Register.jsx=>registerUser()
//*--------------------- Registro de usuario en Firebase --------------------*//
export const register = (email, password, firstName, lastName) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("authActions: register");
            await auth.createUserWithEmailAndPassword(email, password);
            const message = await dispatch(update(firstName, lastName));
            resolve(message);
         }catch(error){
            alert(`authActions: register er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};

//{ Llamada desde register()
//*----------- Actualización de displayName y photoURL en Firebase ----------*//
const update = (firstName, lastName) => {
   return (dispatch) => {

      return new Promise (async(resolve,reject) => {
         try{
            console.log("authActions: update");
            let user = await firebase.auth().currentUser;
            const photoURL = "https://i.picsum.photos/id/564/200/200.jpg?hmac=uExb18W9rplmCwAJ9SS5NVsLaurpaCTCBuHZdhsW25I";
            await user.updateProfile({
               displayName: `${firstName} ${lastName}`,
               photoURL
               });
            user = await firebase.auth().currentUser;
            dispatch(setUser(user));
            // const message = await dispatch(appRegister(firstName, lastName));
            const message = "Bienvenido a la aplicación de Chat";
            resolve(message);
         }catch(error){
            alert(`authActions: update er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};

//{ Llamada desde login(),update()
//*------------------ Registro del usuario en la aplicación -----------------*//
const appRegister = (firstName, lastName) => {
   return (dispatch, getState) => {
   
      return new Promise (async(resolve, reject) => {
         try{
            console.log("authActions: appRegister");
            const { user } = await getState().auth;
            const urlRegister = `https://academlo-whats.herokuapp.com/api/v1/users`;
            const headers = {'Content-Type': 'application/json'};
            const body = {
               "firstName": firstName,
               "lastName": lastName,
               "email": user.email,
               "username": user.displayName,
               "photoUrl": user.photoURL,
               "uid": user.uid
            };
            await fetch(urlRegister, {
               method: `POST`,
               headers,
               body: JSON.stringify(body)
            });
            const message = "Bienvenido a la aplicación de Chat";
            resolve(message);
         }catch(error){
            alert(`authActions: appRegister er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};
