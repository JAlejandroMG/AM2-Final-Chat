import { GET_CONTACTS } from '../actionTypes';

export const getContacts = (contactsArray) => {
   return {
      type: GET_CONTACTS,
      payload: contactsArray
   }
};

// API asíncrona
export const fetchContacts = (baseURL) => {
   return async (dispatch, state) => {
      try{
         const response = await fetch(baseURL);
         const contactsArray = await response.json();
         dispatch(getContacts(contactsArray));
         return 1;
      } catch (error) {
         return 0;
      }
   };
};
