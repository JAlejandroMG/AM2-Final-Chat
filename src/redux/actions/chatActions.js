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



//{ Called from SidebarChat.js => getMessages()
//*------------------ Messages from a specific conversation -----------------*//
export const fetchMessages = (baseURL) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("chatActions: fetchMessages");
            const response = await fetch(baseURL);
            const messages = await response.json();
            console.log(messages);
            dispatch(getMessages(messages));
            resolve("Se han recibido los mensajes.");
         } catch (error) {
            alert(`chatActions: fetchMessages er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};

//{ Called from Sidebar.js => useEffect()
//*-------- All the conversations from the user connected to the App --------*//
export const fetchConversations = (baseURL) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("chatActions: fetchConversations");
            const response = await fetch(baseURL);
            const conversations = await response.json();
            dispatch(getConversations(conversations));
            resolve("Se han recibido las conversaciones.");
         } catch (error) {
            alert(`chatActions: fetchConversations er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};
