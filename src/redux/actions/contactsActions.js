import { GET_CONTACTS } from '../actionTypes';

export const getContacts = (contactsArray) => {
   return {
      type: GET_CONTACTS,
      payload: contactsArray
   }
};

// API asíncrona
export const fetchContacts = (baseURL) => {
   return (dispatch, state) => {

      return new Promise (async(resolve, reject) => {
         try{
            const response = await fetch(baseURL);
            const contactsArray = await response.json();
            dispatch(getContacts(contactsArray));
            resolve(true);
         } catch (error) {
            alert(`contactsActions: fetchContacts er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};
