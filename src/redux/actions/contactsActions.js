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



//{ Called from Sidebar.js => useEffect()
//*------------- All users (contacts) for possible conversations ------------*//
export const fetchContacts = (baseURL, uid) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("contactsActions: fetchContacts");
            const response = await fetch(baseURL);
            const contactsArray = await response.json();
            // From contactsArray (users), the user connected to the App is taken off
            const contacts = contactsArray.filter(contact => contact.uid !== uid)
            dispatch(getContacts(contacts));
            // From contactsArray (users), the user connected to the App is the only one left
            const userApp = contactsArray.filter(contact => contact.uid === uid)
            dispatch(getUserApp(userApp));
            resolve("Se han recibido los contactos correctamente.");
         } catch (error) {
            alert(`contactsActions: fetchContacts er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};
