import * as actions from '../actionTypes';
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';
import { resetChatReducer } from './chatActions';
import { resetContactsReducer } from './contactsActions';



const setUser = (user) => {
   return {
      type: actions.SET_USER,
      payload: user
   };
};



//{ Called from login(),update()
//*------------------------ Registers user in the App -----------------------*//
const appRegister = (firstName, lastName) => {
   return (dispatch, getState) => {
   
      return new Promise (async(resolve, reject) => {
         try{
            console.log("authActions: appRegister"); //! SOLO PARA PRUEBAS
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
            resolve("Bienvenido a la aplicación de Chat");
         }catch(error){
            reject(error);
         }
      });

   };
};

//{ Called from Login.jsx => useEffect()
//*------------------- Checks user connection on Firebase -------------------*//
export const checkActiveSession = () => {
   return (dispatch) => {
      
      return new Promise (async(resolve, reject) => {
         console.log("authActions: checkActiveSession"); //! SOLO PARA PRUEBAS
         await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               dispatch(setUser(user));
               resolve("Bienvenido a la aplicación de Chat");
            } else {
               reject("El usuario no esta conectado.");
            }
         });
      });

   };
};

//{ Called from Login.jsx => loginUser()
//*----------------------- App login through Firebase -----------------------*//
export const login = (provider, email, password) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            if(!provider){
               console.log("authActions: login(email and password)"); //! SOLO PARA PRUEBAS
               let {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
               dispatch(setUser(user));
               resolve("Bienvenido a la aplicación de Chat");
            }else{
               console.log("authActions: login(google)"); //! SOLO PARA PRUEBAS
               let googleProvider = new firebase.auth.GoogleAuthProvider();
               let {user} = await firebase.auth().signInWithPopup(googleProvider);
               dispatch(setUser(user));
               // Aunque user.displayName puede ser accesado desde appRegister() se pasa como argumento para poder reutilizar esa función desde aquí y desde update()
               //const message = await dispatch(appRegister(user.displayName, "Firebase")); //! CAMBIAR PARA PRODUCCION
               const message = "Bienvenido a la aplicación de Chat"; //! CAMBIAR PARA PRODUCCION
               resolve(message);
            }
         }catch(error){
            reject(error);
         }
      });

   };
};

//{ Called from Sidebar.js => logoutUser()
//*------- Disconnects user from Firebase and updates status to false -------*//
export const logout = () => {
   return(dispatch) => {

      return new Promise(async(resolve, reject) => {
         try{
            console.log("authActions: logout"); //! SOLO PARA PRUEBAS
            await firebase.auth().signOut();
            dispatch(setUser(false));
            dispatch(resetChatReducer());
            dispatch(resetContactsReducer());
            resolve("Esperamos verte pronto de vuelta");
         }catch(error){
            reject(error);
         }
      });
      
   }
};

//{ Called from Register.jsx => registerUser()
//*----------- Registers user in Firebase with email and password -----------*//
export const register = (email, password, firstName, lastName) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("authActions: register");
            await auth.createUserWithEmailAndPassword(email, password);
            const message = await dispatch(update(firstName, lastName));
            resolve(message);
         }catch(error){
            reject(error);
         }
      });

   };
};

//{ Called from Login.jsx => resetUserPassword()
//*------------------------ Updates Firebase password -----------------------*//
export const resetPassword = (email, actionCodeSettings) => {
   return() => {

      return new Promise (async(resolve, reject) => {
         console.log("authActions: resetPassword"); //! SOLO PARA PRUEBAS
         await auth.sendPasswordResetEmail(email, actionCodeSettings)
         .then(() => {
            resolve("Se ha enviado un correo para reestablecer la contraseña.");
         }).catch((error) => {
            reject(error);
         });
      });

   };
};

//{ Called from register()
//*-------------- Updates displayName and photoURL in Firebase --------------*//
const update = (firstName, lastName) => {
   return (dispatch) => {

      return new Promise (async(resolve,reject) => {
         try{
            console.log("authActions: update"); //! SOLO PARA PRUEBAS
            let user = await firebase.auth().currentUser;
            const photoURL = "https://i.picsum.photos/id/564/200/200.jpg?hmac=uExb18W9rplmCwAJ9SS5NVsLaurpaCTCBuHZdhsW25I";
            await user.updateProfile({
               displayName: `${firstName} ${lastName}`,
               photoURL
               });
            user = await firebase.auth().currentUser;
            dispatch(setUser(user));
            const message = await dispatch(appRegister(firstName, lastName)); //! CAMBIAR PARA PRODUCCION
            // const message = "Bienvenido a la aplicación de Chat"; //! CAMBIAR PARA PRODUCCION
            resolve(message);
         }catch(error){
            reject(error);
         }
      });

   };
};
