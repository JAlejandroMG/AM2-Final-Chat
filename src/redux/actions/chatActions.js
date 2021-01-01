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

/* {
	"userId": "5fdd9238774450001755805d",
  "conversationId": "5fe15a225901e80017f682d3",
  "message": "What's up dude!!",
  "timestamp": "1608338000",
  "received": false
} */



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
            const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/${getState().chat.conversationId}/messages`;
            // const baseURL = `https://academlo-whats.herokuapp.com/api/v1/conversations/5fed3094794c290017d822b0/messages`;
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

//{ Called from Chat.js => sendMessage()
//* Add conversation
// Fetch para agregar conversaciones
// Mandar llamar a fetchConversations

export const  addConversation = (id) =>{
   return (dispatch, getState) => {
      return new Promise (async(resolve, reject) => {
         try {
            console.log("chatActions: addConversation");
            const urlRegister = `https://academlo-whats.herokuapp.com/api/v1/conversations`;
            const headers = {'Content-Type': 'application/json'};
            const body = {
               "members": [getState().contacts.userApp[0]._id, id]
            };
            alert("Entrando a fetch");
            await fetch(urlRegister, {
               method: `POST`,
               headers,
               body: JSON.stringify(body)
            });
            alert("Saliendo de crear conversación");
            const baseURL = `https://academlo-whats.herokuapp.com/api/v1/users/5fed3094794c290017d822b0/conversations`;
            alert("Llamando a fetchConversations");
            dispatch(fetchConversations(baseURL));
            alert("Saliendo de hacer fetchConversations");
            resolve("Se ha agregado una nueva conversación");
         }catch(error) {
            alert(`chatActions: addConversation er => ${error.conversation}`);
            reject(error.conversation);
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
            console.log(messages);
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
