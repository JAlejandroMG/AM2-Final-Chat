import * as actions from '../actionTypes';

export const getConversations = (conversations) => {
   return {
      type: actions.GET_CONVERSATIONS,
      payload: conversations
   }
};

export const getMessages = (messages) => {
   return {
      type: actions.GET_MESSAGES,
      payload: messages
   }
};


//{ Llamada desde SidebarChat.js=>getMessages()
//*-------------------------- Obtiene los mensajes --------------------------*//
export const fetchMessages = (baseURL) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("chatActions: fetchMessages");
            const response = await fetch(baseURL);
            const messages = await response.json();
            console.log(messages);
            dispatch(getMessages(messages));
            resolve(true);
         } catch (error) {
            alert(`chatActions: fetchMessages er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};


//{ Llamada desde Sidebar.js=>useEffect()
//*----------------------- Obtiene las conversaciones -----------------------*//
export const fetchConversations = (baseURL) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("chatActions: fetchConversations");
            const response = await fetch(baseURL);
            const conversations = await response.json();
            // const contacts = contactsArray.filter(contact => contact.uid !== uid)
            dispatch(getConversations(conversations));
            resolve(true);
         } catch (error) {
            alert(`chatActions: fetchConversations er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};
