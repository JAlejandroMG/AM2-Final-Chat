import * as actions from '../actionTypes';
import firebase from '../../firebase/config';
import {auth} from '../../firebase/config';


//* Asignación de un objeto como valor a user
const setUser = (user) => {
   return {
      type: actions.SET_USER,
      payload: user
   }
}


//* Registro de usuario en Firebase
export const register = (email, password, firstName, lastName) => {
   return (dispatch, state) => {

      return new Promise (async(resolve, reject) => {
         try{
            await auth.createUserWithEmailAndPassword(email, password);
            const message = await dispatch(update(firstName, lastName, email));
            resolve(message);
         }catch(error){
            alert(error.message);
            reject(error.message);
         }
      });

   };
};
//* Actualización de displayName y photoURL en Firebase
const update = (firstName, lastName, email) => {
   return (dispatch, state) => {

      return new Promise (async(resolve,reject) => {
         try{
            let user = await firebase.auth().currentUser;
            const photoURL = "https://i.picsum.photos/id/738/200/200.webp?hmac=AaUZJdpXCcpULfGEoQqubLm8Kd0evV4VjwUnuM8BUqI"
            //Thomas Anderson
            await user.updateProfile({
               displayName: `${firstName} ${lastName}`,
               photoURL
               });
            user = await firebase.auth().currentUser;
            dispatch(setUser(user));
            const message = await dispatch(appRegister(user, firstName, lastName, email))
            resolve(message);
         }catch(error){
            alert(error.message);
            reject(error.message);
         }
      });

   };
};
//* Registro del usuario en la aplicación
const appRegister = (user, firstName, lastName, email) => {
   return (dispatch, state) => {
   
      return new Promise (async(resolve, reject) => {
         try{
            const urlRegister = `https://academlo-whats.herokuapp.com/api/v1/users`;
            const headers = {'Content-Type': 'application/json'};
            const body = {
               "firstName": firstName,
               "lastName": lastName,
               "email": email,
               "username": user.displayName,
               "photoUrl": user.photoURL,
               "uid": user.uid
            }   
            await fetch(urlRegister, {
               method: `POST`,
               headers,
               body: JSON.stringify(body)
            })
            const message = "Bienvenido a la aplicación de Chat"
            resolve(message);
         }catch(error){
            alert(error.message);
            reject(error.message);
         }
      });

   };
};
