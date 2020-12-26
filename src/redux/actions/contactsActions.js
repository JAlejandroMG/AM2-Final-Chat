import * as actions from '../actionTypes';

export const getUserApp = (userApp) => {
   return {
      type: actions.GET_USERAPP,
      payload: userApp
   };
};

export const getContacts = (contacts) => {
   return {
      type: actions.GET_CONTACTS,
      payload: contacts
   };
};


//{ Llamada desde Sidebar.js=>useEffect()
//*----------- Obtiene los contactos para posibles conversaciones -----------*//
export const fetchContacts = (baseURL, uid) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("contactsActions: fetchContacts");
            const response = await fetch(baseURL);
            const contactsArray = await response.json();
            // Del arreglo de contactsArray (users) eliminamos al usuario conectado
            const contacts = contactsArray.filter(contact => contact.uid !== uid)
            dispatch(getContacts(contacts));
            // Del arreglo de contactsArray (users) seleccionamos al usuario conectado
            const userApp = contactsArray.filter(contact => contact.uid === uid)
            dispatch(getUserApp(userApp));
            resolve(true);
         } catch (error) {
            alert(`contactsActions: fetchContacts er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};
