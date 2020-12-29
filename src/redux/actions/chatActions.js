import * as actions from '../actionTypes';

export const getConversations = (conversations) => {
   return {
      type: actions.GET_CONVERSATIONS,
      payload: conversations
   }
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
   }
};

export const chatUser = (user) => {
   return {
      type: actions.CHAT_USER,
      payload: user
   };
};



//{ Called from Chat.js => sendMessage()
//* Add message to the conversation
// Fetch para agregar mensajes
// Mandar llamar a fetchMessages
export const addMessage = (newMessage) => {
   return(dispatch, getState) => {

      return new Promise (async(resolve, reject) => {
         try {
            console.log("chatActions: addMessage");
            const urlRegister = `https://academlo-whats.herokuapp.com/api/v1/messages`;
            const headers = {'Content-Type': 'application/json'};
            const body = {
               "userId": getState().contacts.userApp[0]._id,
               "conversationId": getState().chat.conversationId,
               "message": newMessage,
               "timestamp": Date.now(),
               "received": false
            };
            alert("Entrando a fetch");
            await fetch(urlRegister, {
               method: `POST`,
               headers,
               body: JSON.stringify(body)
            });
            alert("Saliendo de crear mensaje");
            // const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${getState().chat.conversationId}/messages`;
            const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/5fe15a225901e80017f682d3/messages`;
            alert("Llamando a fetchMessages");
            dispatch(fetchMessages(baseURL, getState().chat.conversationId));
            alert("Saliendo de hacer fetchMessages");
            resolve("Se ha agregado un nuevo mensaje");
         }catch(error){
            alert(`chatActions: addMessage er => ${error.message}`);
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
            console.log(conversations);
            alert("Aquí andamos");
            dispatch(getConversations(conversations));
            resolve("Se han recibido las conversaciones.");
         } catch (error) {
            alert(`chatActions: fetchConversations er => ${error.message}`);
            reject(error.message);
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
            console.log("chatActions: fetchMessages");
            dispatch(conversationId(id));
            const response = await fetch(baseURL);
            const messages = await response.json();
            const userId = messages[0].members.filter( member => member !== getState().contacts.userApp[0]._id)
            const user = getState().contacts.contacts.filter(contact => contact._id === userId[0]);
            dispatch(chatUser(user));
            dispatch(getMessages(messages));
            resolve("Se han recibido los mensajes.");
         } catch (error) {
            alert(`chatActions: fetchMessages er => ${error.message}`);
            reject(error.message);
         }
      });

   };
};
