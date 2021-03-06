import * as actions from '../actionTypes';



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

export const getOwnConversations = (ownConversations, userAppId) => {
   return {
      type: actions.GET_OWN_CONVERSATIONS,
      payload: {
         ownConversations,
         userAppId
      }
   };
};

export const isAtLeastOneConversationSelected = () => {
   return {
      type: actions.IS_AT_LEAST_ONE_CONVERSATION_SELECTED
   };
};

export const isAtLeastOneMessageSelected = () => {
   return {
      type: actions.IS_AT_LEAST_ONE_MESSAGE_SELECTED
   };
};

/* export const messageReceived = (userApp) => {
   return {
      type: actions.MESSAGE_RECEIVED,
      payload: userApp
   };
}; */

export const resetChatReducer = () => {
   return {
      type: actions.RESET_CHAT_REDUCER
   };
};

export const resetConversations = () => {
   return {
      type: actions.RESET_CONVERSATIONS
   };
};

export const scrollToLastMessage = () => {
   return {
      type: actions.SCROLL_TO_LAST_MESSAGE
   };
};

export const selectConversation = (id) => {
   return {
      type: actions.SELECT_CONVERSATION,
      payload: id
   }
};

export const selectMessage = (position) => {
   return {
      type: actions.SELECT_MESSAGE,
      payload: position
   };
};

// export const showMessageReceived = () => {
//    return {
//       type: actions.SHOW_MESSAGE_RECEIVED
//    };
// };



//{ Called from SidebarDropdown.js => sendConversation()
//* Add conversation
export const  addConversation = (id) =>{
   return (dispatch, getState) => {
      return new Promise (async(resolve, reject) => {
         try {
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
            const baseURL = `https://academlo-whats.herokuapp.com/api/v1/users/${getState().contacts.userApp[0].uid}/conversations`;
            await dispatch(fetchConversations(baseURL));
            resolve("Se ha agregado una conversación");
         }catch(error) {
            reject(error);
         }
      });

   }
}

//{ Called from Chat.js => sendMessage()
//* Add message to the conversation
export const addMessage = (newMessage) => {
   return(dispatch, getState) => {

      return new Promise (async(resolve, reject) => {
         try {
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
            await dispatch(fetchMessages(baseURL, getState().chat.conversationId));
            resolve("Se ha agregado un nuevo mensaje");
         }catch(error){
            reject(error);
         }
      });

   };
};

//{ Called from Sidebar.js => removeConversation()
//* Delete conversation(s)
export const deleteConversation = (id) => {
   return() =>{
      return new Promise ((resolve, reject) =>{
         const urlDelete = `https://academlo-whats.herokuapp.com/api/v1/conversations/${id}`;
            fetch(urlDelete, {
               method: `DELETE`,
            })
            .then(response => resolve(response))
            .catch(error => reject(error))
      });
   }
}

//{ Called from Chat.js => removeMessage()
//* Delete message(s) from the conversation
export const deleteMessage = (id) => {
   return() =>{
      return new Promise ((resolve, reject) =>{
            const urlDelete = `https://academlo-whats.herokuapp.com/api/v1/messages/${id}`;
            fetch(urlDelete, {
               method: `DELETE`,
            })
            .then(response => resolve(response))
            .catch(error => reject(error))
      });
   }
}

//{ Called from Sidebar.js => useEffect(), removeConversation
//*-------- All the conversations from the user connected to the App --------*//
export const fetchConversations = (baseURL) => {
   return (dispatch, getState) => {

      return new Promise (async(resolve, reject) => {
         try{
            const userAppId = getState().contacts.userApp[0]._id;
            const response = await fetch(baseURL);
            const conversations = await response.json();
            dispatch(getConversations(conversations));
            dispatch(getOwnConversations(conversations, userAppId));
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
            dispatch(conversationId(id));
            const response = await fetch(baseURL);
            const messages = await response.json();
            const userId = await messages[0].members.filter( member => member !== getState().contacts.userApp[0]._id)
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

//{ Called from SidebarChat.js => messageReceived()
//*------------------------ Mark message as received ------------------------*//
/* export const showMessageReceived = () => {
   return (dispatch, getState) => {
      dispatch(messageReceived(getState().contacts.userApp[0]._id))
   };
}; */
