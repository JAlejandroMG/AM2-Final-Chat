import * as actions from '../actionTypes';

export const getConversations = (conversations) => {
   return {
      type: actions.GET_CONVERSATIONS,
      payload: conversations
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

export const conversationId = (id) => {
   return {
      type: actions.CONVERSATION_ID,
      payload: id
   };
};

export const resetChatReducer = () => {
   return {
      type: actions.RESET_CHAT_REDUCER
   };
};

export const scrollToLastMessage = () => {
   return {
      type: actions.SCROLL_TO_LAST_MESSAGE
   };
};

export const selectMessage = (id) => {
   return {
      type: actions.SELECT_MESSAGE,
      payload: id
   };
};

export const isAtLeastOneMessageSelected = () => {
   return {
      type: actions.IS_AT_LEAST_ONE_MESSAGE_SELECTED
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

//{ Called from Chat.js => removeMessage()
//* Delete message(s) from the conversation
export const deleteMessage = (idMessagesSelected) => {
   return(dispatch, getState) =>{
      return new Promise (async(resolve, reject) =>{
         try {
            console.log("chatActions: deleteMessage"); //! SOLO PARA PRUEBAS
            await idMessagesSelected.forEach( async (id) =>{
               try{
                  console.log(id);
                  const urlDelete = `https://academlo-whats.herokuapp.com/api/v1/messages/${id}`;
                  // console.log("INICIO DELETE DE MENSAJES!!!"); //! SOLO PARA PRUEBAS
                  await fetch(urlDelete, {
                     method: `DELETE`,
                  });
                  // console.log("TERMINO DELETE DE MENSAJES!!!"); //! SOLO PARA PRUEBAS
                  // alert("chatActions=>deleteMessage: Mandó eliminar mensaje")
                  return true;
               }catch(error){
                  alert(`chatActions: fetch(urlDelete) er => ${error.message}`);
                  return error;
               }
            });

            // console.log(getState().chat.conversationId);

            /* const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${getState().chat.conversationId}/messages`;
            await dispatch(fetchMessages(baseURL, getState().chat.conversationId)); */
            resolve("Se ha(n) eliminado el(los) mensaje(s)");
         }catch(error){
            reject(error);
         }  
      });
   }
}

//{ Called from SidebarDropdown.js => sendConversation()
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
            await dispatch(fetchConversations(baseURL));
            resolve("Se ha agregado una conversación");
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
            console.log(conversations);
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
