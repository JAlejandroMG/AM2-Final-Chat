import { GET_CONTACTS } from '../actionTypes';

export const getContacts = (contacts) => {
   return {
      type: GET_CONTACTS,
      payload: contacts
   }
};


//{ Llamada desde Sidebar.js=>useEffect()
//*----------- Obtiene los contactos para posibles conversaciones -----------*//
export const fetchContacts = (baseURL, uid) => {
   return (dispatch, state) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("contactsActions: fetchContacts");
            const response = await fetch(baseURL);
            const contactsArray = await response.json();
            // Del arreglo de contactos(users) eliminamos al usuario conectado (signin)
            const contacts = contactsArray.filter(contact => contact.uid !== uid)
            dispatch(getContacts(contacts));
            resolve(true);
         } catch (error) {
            alert(`contactsActions: fetchContacts er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};
