import * as actions from '../actionTypes';

export const resetChatReducer = () => {
   return {
      type: actions.RESET_CHAT_REDUCER
   };
};

export const getConversations = (conversations) => {
   return {
      type: actions.GET_CONVERSATIONS,
      payload: conversations
   };
};

export const conversationId = (id) => {
   return {
      type: actions.CONVERSATION_ID,
      payload: id
   };
};

export const getMessages = (messages) => {
   return {
      type: actions.GET_MESSAGES,
      payload: messages
   };
};

export const chatUser = (user) => {
   return {
      type: actions.CHAT_USER,
      payload: user
   };
};



//{ Called from Chat.js => sendMessage()
//* Add message to the conversation
export const addMessage = (newMessage) => {
   return(dispatch, getState) => {

      return new Promise (async(resolve, reject) => {
         try {
            console.log("chatActions: addMessage"); //! SOLO PARA PRUEBAS
            const urlRegister = `https://academlo-whats.herokuapp.com/api/v1/messages`;
            const headers = {'Content-Type': 'application/json'};
            const body = {
               "userId": getState().contacts.userApp[0]._id,
               "conversationId": getState().chat.conversationId,
               "message": newMessage,
               "timestamp": Date.now(),
               "received": false
            };
            await fetch(urlRegister, {
               method: `POST`,
               headers,
               body: JSON.stringify(body)
            });
            const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${getState().chat.conversationId}/messages`;
            // const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/5fed3094794c290017d822b0/messages`;
            await dispatch(fetchMessages(baseURL, getState().chat.conversationId));
            resolve("Se ha agregado un nuevo mensaje");
         }catch(error){
            reject(error);
         }
      });

   };
};

//{ Called from Chat.js => sendMessage()
//* Add conversation
export const  addConversation = (id) =>{
   return (dispatch, getState) => {
      return new Promise (async(resolve, reject) => {
         try {
            console.log("chatActions: addConversation"); //! SOLO PARA PRUEBAS
            const urlRegister = `https://academlo-whats.herokuapp.com/api/v1/conversations`;
            const headers = {'Content-Type': 'application/json'};
            const body = {
               "members": [getState().contacts.userApp[0]._id, id]
            };
            await fetch(urlRegister, {
               method: `POST`,
               headers,
               body: JSON.stringify(body)
            });
            const baseURL = `https://academlo-whats.herokuapp.com/api/v1/users/5fed3094794c290017d822b0/conversations`;
            const message = await dispatch(fetchConversations(baseURL));
            resolve(message);
         }catch(error) {
            reject(error);
         }
      });

   }
}


//{ Called from Sidebar.js => useEffect()
//*-------- All the conversations from the user connected to the App --------*//
export const fetchConversations = (baseURL) => {
   return (dispatch) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("chatActions: fetchConversations"); //! SOLO PARA PRUEBAS
            const response = await fetch(baseURL);
            const conversations = await response.json();
            dispatch(getConversations(conversations));
            resolve("Se han recibido las conversaciones.");
         } catch (error) {
            reject(error);
         }
      });

   };
};

//{ Called from SidebarChat.js => getMessages(), addMessage
//*------------------ Messages from a specific conversation -----------------*//
export const fetchMessages = (baseURL, id) => {
   return (dispatch, getState) => {

      return new Promise (async(resolve, reject) => {
         try{
            console.log("chatActions: fetchMessages"); //! SOLO PARA PRUEBAS
            dispatch(conversationId(id));
            const response = await fetch(baseURL);
            const messages = await response.json();
            console.log(messages);
            const userId = messages[0].members.filter( member => member !== getState().contacts.userApp[0]._id)
            const user = getState().contacts.contacts.filter(contact => contact._id === userId[0]);
            dispatch(chatUser(user));
            dispatch(getMessages(messages));
            resolve("Se han recibido los mensajes.");
         } catch (error) {
            reject(error);
         }
      });

   };
};
